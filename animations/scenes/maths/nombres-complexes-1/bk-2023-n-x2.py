"""Explication animée v4 — Bac 2023 SN (SExp), Exercice 2 : nombres complexes.

Source de vérité : content/maths/nombres-complexes-1/bank.yaml,
entrée bk-2023-n-x2 (vérifiée, AlloSchool NS22F, Exercice 2, 3 points).
a = √2 + i√2, b = 1+√2 + i, c = b̄ (conjugué de b), d = 2i.

Huit questions, quatre points donnés d'emblée : 1) forme trigonométrique
de a (module = distance, argument = angle depuis l'axe réel) ; 2) vérifier
b - d = c, via le conjugué déjà tracé comme un reflet ; 3) une identité à
facteur réel, puis l'alignement de A, D, B (vecteurs colinéaires) ; 4)
vérifier ac = 2b ; 5) en déduire 2 arg(b) ≡ π/4 [2π] par les arguments
d'un produit ; 6) la rotation de centre O et d'angle π/4, montrer que
z' = (1/2)az ; 7) en déduire R(C) = B et R(A) = D, avec les arcs de
trajectoire réels de la figure ; 8) un quotient d'affixes-vecteurs réduit
à une forme réelle fois a, puis l'angle (AC, AB) — avec le piège classique
de l'ordre des vecteurs dans le quotient, signalé en rouge.

Standard v4 = DESIGN.md : règle du zéro implicite (chaque geste
algébrique = une étape), couche de sens avant chaque calcul (segment +
arc pour module/argument, miroir pour le conjugué, point-témoin qui
tourne pour la rotation générale, arcs de trajectoire réels pour R(C) et
R(A), vecteurs tracés pour l'angle final), signaling dans la formule,
zones d'écran dures, carte de référence épinglée (a, b, c, d).

Rendu : ../../render.sh scenes/maths/nombres-complexes-1/bk-2023-n-x2.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))

import numpy as np
from manim import (
    Angle,
    Arc,
    ComplexPlane,
    Create,
    DashedLine,
    Dot,
    FadeIn,
    FadeOut,
    Line,
    MathTex,
    MoveAlongPath,
    ReplacementTransform,
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
    BAC_ERROR,
    BAC_INK,
    BAC_INK_MUTED,
    BAC_INK_SOFT,
    BAC_SUCCESS,
    BAC_WARNING,
)

# Identité visuelle stable des QUATRE points de la figure (DESIGN.md §2) :
# A sarcelle, B or, C gris (conjugué de B = reflet), D vert.
COL_PT_A, COL_PT_B = BAC_ACCENT, BAC_WARNING
COL_PT_C, COL_PT_D = BAC_INK_MUTED, BAC_SUCCESS

NARRATION = {
    "titre": "Exercice deux du bac deux mille vingt-trois, session normale, "
    "sciences expérimentales : nombres complexes, sur trois points. Forme "
    "trigonométrique, un alignement, un produit, une rotation d'angle pi "
    "sur quatre, et un angle orienté.",
    "intro": "On donne quatre points, A, B, C et D, et leurs affixes : a, "
    "b, c — qui est le conjugué de b — et d. On les retrouve à chaque "
    "question.",
    "plan": "On place les quatre points dans le plan complexe : C est le "
    "reflet de B dans l'axe réel, puisque son affixe en est le conjugué.",
    "q1": "Question un. On écrit a sous forme trigonométrique : d'abord "
    "son module, la distance à l'origine, puis son argument, l'angle "
    "depuis l'axe réel.",
    "q2": "Question deux. On vérifie que b moins d est égal à c, en "
    "comparant au conjugué de b, déjà tracé comme un reflet.",
    "q3": "Question trois. On vérifie une égalité avec un facteur réel, "
    "puis on en déduit que les vecteurs AB et DB sont colinéaires : les "
    "points A, D et B sont alignés.",
    "q4": "Question quatre. On vérifie que le produit a fois c est égal "
    "à deux fois b, par un calcul direct.",
    "q5": "Question cinq. On passe aux arguments dans l'égalité "
    "précédente pour en déduire que deux fois l'argument de b vaut pi "
    "sur quatre, modulo deux pi.",
    "q6": "Question six. Une rotation de centre O et d'angle pi sur "
    "quatre multiplie l'affixe par e puissance i pi sur quatre : on "
    "montre que ce facteur vaut exactement un demi a.",
    "q7": "Question sept. On applique la formule de la rotation aux "
    "points C et A pour montrer que leurs images sont exactement B et D.",
    "q8": "Question huit. On calcule un quotient d'affixes-vecteurs, on "
    "le réduit à une forme réelle fois a, et on en déduit une mesure de "
    "l'angle entre les vecteurs AC et AB.",
}

A_AFF = complex(np.sqrt(2), np.sqrt(2))          # a = √2 + i√2
B_AFF = complex(1 + np.sqrt(2), 1)                # b = 1 + √2 + i
C_AFF = B_AFF.conjugate()                         # c = b̄ = (1+√2) - i
D_AFF = complex(0, 2)                             # d = 2i

# Point-témoin de la question 6 (rotation générale, AVANT application aux
# points de l'énoncé) : illustration, pas une donnée — voir légende.
M_DEMO = complex(0.3, -1.3)


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        plan, a_dot, b_dot, c_dot, d_dot = self.chapitre_plan()
        self.chapitre_q1(plan, a_dot)
        self.chapitre_q2(plan, b_dot, c_dot, d_dot)
        self.chapitre_q3(plan, a_dot, b_dot, d_dot)
        self.chapitre_q4()
        self.chapitre_q5()
        self.chapitre_q6(plan)
        self.chapitre_q7(plan, a_dot, b_dot, c_dot, d_dot)
        self.chapitre_q8(plan, a_dot, b_dot, c_dot)
        self.chapitre_fin()

    # ── Ouverture ──────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("titre")
        self.carte_titre(
            "BAC 2023 · SESSION NORMALE · SCIENCES EXP.",
            "Nombres complexes",
            "Exercice 2 — 3 points · sujet officiel NS22F",
        )

    # ── Les données de l'énoncé : quatre points, quatre affixes ─────
    def chapitre_intro(self):
        self.etape("intro-donnees")
        entete = Text(
            "On considère les points A, B, C et D d'affixes respectives :",
            font_size=27,
        ).shift(2.5 * UP)
        aff_a = MathTex(r"a = \sqrt2+i\sqrt2", font_size=38, color=COL_PT_A)
        aff_b = MathTex(r"b = 1+\sqrt2+i", font_size=38, color=COL_PT_B)
        aff_c = MathTex(r"c = \bar{b}", font_size=38, color=COL_PT_C)
        aff_d = MathTex(r"d = 2i", font_size=38, color=COL_PT_D)
        ligne = VGroup(aff_a, aff_b, aff_c, aff_d).arrange(
            DOWN, aligned_edge=LEFT, buff=0.38
        ).next_to(entete, DOWN, buff=0.65)
        self.play(Write(entete), run_time=1.2)
        self.play(FadeIn(ligne, shift=0.2 * UP), run_time=1.4)
        self.legende(
            "Quatre points, quatre affixes — on les retient : elles",
            "reviennent à CHAQUE question de cet exercice.",
        )
        self.pose(3.2)
        self.efface_legende()
        # La carte ne s'efface pas : elle RÉTRÉCIT en carte de référence
        # épinglée (continuité, même procédé que ailleurs dans la banque).
        self.play(FadeOut(entete))
        self.play(
            ligne.animate.scale(0.62).to_edge(LEFT, buff=0.55).to_edge(UP, buff=1.05)
        )
        self._abcd_defs = ligne
        self.epingle(ligne)
        return ligne

    # ── Le plan complexe : quatre points, un miroir ──────────────────
    def chapitre_plan(self):
        self.etape("plan-axes")
        plan = ComplexPlane(
            x_range=[-1, 3, 1],
            y_range=[-1.5, 2.5, 1],
            x_length=4.6,
            y_length=4.6,
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
        ).shift(3.2 * RIGHT + 0.2 * UP)
        o_lbl = MathTex("O", font_size=30, color=BAC_INK_SOFT).next_to(
            plan.n2p(0), DOWN + LEFT, buff=0.12
        )
        # "axe réel" sous l'axe, au bout DROIT (à gauche il collait au
        # label O — défaut d'audit) ; "axe imaginaire" à DROITE de l'axe,
        # sous O (jamais à gauche — règle d'audit).
        re_lbl = Text("axe réel", font_size=20, color=BAC_INK_MUTED).next_to(
            plan.n2p(2.45), DOWN, buff=0.18
        )
        im_lbl = Text("axe imaginaire", font_size=20, color=BAC_INK_MUTED).next_to(
            plan.n2p(-1.3j), RIGHT, buff=0.18
        )
        self.play(Create(plan, run_time=2.2), FadeIn(o_lbl))
        self.play(FadeIn(re_lbl), FadeIn(im_lbl))
        self.legende(
            "Le plan complexe : horizontal = partie réelle,",
            "vertical = partie imaginaire. Chaque affixe, un point.",
        )
        self.pose(3.0)

        self.etape("plan-A")
        guide_x = DashedLine(
            plan.n2p(0), plan.n2p(np.sqrt(2)), color=COL_PT_A, stroke_width=3
        )
        guide_y = DashedLine(
            plan.n2p(np.sqrt(2)), plan.n2p(A_AFF), color=COL_PT_A, stroke_width=3
        )
        a_dot = Dot(plan.n2p(A_AFF), color=COL_PT_A, radius=0.08)
        a_lbl = MathTex("A(a)", font_size=32, color=COL_PT_A).next_to(
            a_dot, LEFT, buff=0.14
        )
        self.play(Create(guide_x))
        self.play(Create(guide_y))
        self.play(FadeIn(a_dot, scale=1.6), Write(a_lbl))
        self.legende(
            "Pour a = √2 + i√2 : un pas vers la DROITE, puis le MÊME",
            "pas vers le HAUT (√2 ≈ 1,41). Parties réelle et imaginaire",
            "égales — on le retrouvera à la question 1.",
        )
        self.pose(3.6)
        self.play(FadeOut(guide_x), FadeOut(guide_y))

        self.etape("plan-B")
        b_dot = Dot(plan.n2p(B_AFF), color=COL_PT_B, radius=0.08)
        b_lbl = MathTex("B(b)", font_size=32, color=COL_PT_B).next_to(
            b_dot, RIGHT, buff=0.14
        )
        self.play(FadeIn(b_dot, scale=1.6), Write(b_lbl))
        self.legende(
            "b = 1+√2+i : à sa place exacte, donnée par l'énoncé.",
        )
        self.pose(2.8)

        self.etape("plan-C")
        c_dot = Dot(plan.n2p(C_AFF), color=COL_PT_C, radius=0.08)
        c_lbl = MathTex("C(c)", font_size=32, color=COL_PT_C).next_to(
            c_dot, RIGHT, buff=0.14
        )
        sym = DashedLine(
            plan.n2p(B_AFF), plan.n2p(C_AFF), color=BAC_INK_MUTED, stroke_width=2
        )
        self.play(Create(sym))
        self.play(FadeIn(c_dot, scale=1.6), Write(c_lbl))
        self.legende(
            "c = b̄, le conjugué de b : que SIGNIFIE un conjugué ? Le",
            "REFLET dans l'axe réel — même partie réelle, partie",
            "imaginaire opposée. C'est exactement ce que montre ce trait.",
        )
        self.pose(3.8)

        self.etape("plan-D")
        d_dot = Dot(plan.n2p(D_AFF), color=COL_PT_D, radius=0.08)
        # UP+LEFT : D est SUR l'axe imaginaire, qui continue au-dessus du
        # point — un label plein UP serait traversé par l'axe (défaut
        # d'audit). Le côté gauche est libre.
        d_lbl = MathTex("D(d)", font_size=32, color=COL_PT_D).next_to(
            d_dot, UP + LEFT, buff=0.12
        )
        self.play(FadeIn(d_dot, scale=1.6), Write(d_lbl))
        self.legende(
            "d = 2i : partie réelle NULLE. D vit exactement SUR l'axe",
            "imaginaire.",
        )
        self.pose(3.0)
        self.efface_legende()
        self.play(FadeOut(VGroup(re_lbl, im_lbl, sym)))
        return plan, a_dot, b_dot, c_dot, d_dot

    # ── Q1 : forme trigonométrique de a ──────────────────────────────
    def chapitre_q1(self, plan, a_dot):
        badge = self.bandeau_question("1)", "0,25 pt")
        self.ardoise()
        origine = plan.n2p(0)

        self.etape("q1-enonce")
        but = MathTex(r"\text{Écrire } a \text{ sous forme trigonométrique}", font_size=36)
        self.ecrit(but)
        self.legende(
            "Deux informations décrivent un point : sa distance à O,",
            "et son angle depuis l'axe réel. On les calcule pour a.",
        )
        self.pose(3.2)

        self.etape("q1-sens-module-argument")
        oa = Line(origine, plan.n2p(A_AFF), color=BAC_ACCENT_LIGHT, stroke_width=3)
        # UP+LEFT : le segment monte à 45°, un label plein UP depuis son
        # centre reste traversé par le trait (défaut d'audit) ; on décale
        # perpendiculairement, côté libre.
        mod_lbl = MathTex("|a|", font_size=26, color=BAC_ACCENT_LIGHT).next_to(
            oa.get_center(), UP + LEFT, buff=0.12
        )
        axe_ref = Line(origine, plan.n2p(1.8), color=BAC_INK_MUTED, stroke_width=2)
        ang = Angle(
            axe_ref, oa, radius=0.55, other_angle=False, color=BAC_ACCENT, stroke_width=3
        )
        milieu = ang.point_from_proportion(0.5)
        direction = (milieu - origine) / np.linalg.norm(milieu - origine)
        ang_lbl = MathTex(r"\theta", font_size=26, color=BAC_ACCENT).move_to(
            milieu + 0.36 * direction
        )
        self.play(Create(oa), FadeIn(mod_lbl))
        self.play(Create(axe_ref), Create(ang), FadeIn(ang_lbl))
        self.legende(
            "Que SIGNIFIENT module et argument ? |a| est la DISTANCE de",
            "O à A ; θ est l'ANGLE, depuis l'axe réel, jusqu'à OA.",
        )
        self.pose(3.8)

        self.etape("q1-calcul-module")
        m1 = MathTex(
            r"|a| = \sqrt{(\sqrt{2})^2+(\sqrt{2})^2} = \sqrt{4} = 2", font_size=34
        )
        self.ecrit(m1, buff=0.55)
        self.legende("On additionne les carrés des deux parties, sous la racine.")
        self.pose(2.8)

        self.etape("q1-calcul-argument")
        m2 = MathTex(
            r"\cos\theta = \dfrac{\sqrt2}{2}, \quad \sin\theta = \dfrac{\sqrt2}{2}"
            r" \implies \theta = \dfrac{\pi}{4}",
            font_size=32,
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "Parties réelle et imaginaire égales et positives :",
            "angle remarquable, pi sur quatre.",
        )
        self.pose(3.2)

        self.etape("q1-conclusion")
        concl = MathTex(
            r"a = 2\left(\cos\dfrac{\pi}{4} + i\sin\dfrac{\pi}{4}\right)",
            font_size=42, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(concl, buff=0.55)
        ang_lbl2 = MathTex(r"\tfrac{\pi}{4}", font_size=24, color=BAC_ACCENT_STRONG).move_to(
            ang_lbl
        )
        self.play(
            ReplacementTransform(ang_lbl, ang_lbl2), ang.animate.set_color(BAC_ACCENT_STRONG)
        )
        self.legende(
            "Forme trigonométrique de a — module 2, argument π/4.",
            "0,25 point.",
        )
        self.pose(3.4)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, oa, mod_lbl, axe_ref, ang, ang_lbl2)))

    # ── Q2 : vérifier b - d = c ───────────────────────────────────────
    def chapitre_q2(self, plan, b_dot, c_dot, d_dot):
        badge = self.bandeau_question("2)", "0,25 pt")
        self.ardoise()

        self.etape("q2-enonce")
        but = MathTex(r"\text{Vérifier que } b-d=c", font_size=38)
        self.ecrit(but)
        self.legende(
            "On compare deux expressions : b moins d, et c — déjà",
            "tracé comme le reflet de b.",
        )
        self.pose(3.0)

        self.etape("q2-calcul-b-moins-d")
        m1 = MathTex(r"b-d = (1+\sqrt2+i) - 2i = (1+\sqrt2) - i", font_size=32)
        self.ecrit(m1, buff=0.5)
        self.legende("On soustrait d = 2i à b.")
        self.pose(2.8)

        self.etape("q2-calcul-b-barre")
        m2 = MathTex(
            r"\bar{b} = \overline{(1+\sqrt2)+i} = (1+\sqrt2) - i", font_size=32
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "Conjuguer, c'est changer le signe de la partie imaginaire —",
            "le reflet déjà tracé sur la figure.",
        )
        self.pose(3.2)

        self.etape("q2-conclusion")
        concl = MathTex(
            r"b-d = (1+\sqrt2)-i = \bar{b} = c", font_size=36, color=BAC_ACCENT_STRONG
        )
        self.ecrit(concl, buff=0.55)
        self.legende("Les deux expressions coïncident : vérifié. 0,25 point.")
        self.pose(3.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q3 : identité à facteur réel, puis alignement A, D, B ────────
    def chapitre_q3(self, plan, a_dot, b_dot, d_dot):
        badge = self.bandeau_question("3)", "0,5 pt")
        self.ardoise()

        self.etape("q3-enonce")
        but = MathTex(
            r"(\sqrt2+1)(b-a) \overset{?}{=} b-d, \ \ \text{puis}\ A,B,D\ \text{alignés ?}",
            font_size=28,
        )
        self.ecrit(but)
        self.legende(
            "On vérifie une égalité à facteur réel, puis on en déduit",
            "que A, B et D sont alignés.",
        )
        self.pose(3.4)

        self.etape("q3-calcul-b-moins-a")
        m1 = MathTex(
            r"b-a = (1+\sqrt2+i) - (\sqrt2+i\sqrt2) = 1+i(1-\sqrt2)", font_size=28
        )
        self.ecrit(m1, buff=0.5)
        self.legende("On calcule d'abord b moins a.")
        self.pose(2.8)

        self.etape("q3-developper")
        m2 = MathTex(
            r"(\sqrt2+1)(b-a) = (\sqrt2+1)\left[1+i(1-\sqrt2)\right]"
            r" = (\sqrt2+1) + i(\sqrt2+1)(1-\sqrt2)",
            font_size=24,
        )
        self.ecrit(m2, buff=0.5)
        self.legende("On distribue le facteur racine de deux plus un.")
        self.pose(3.2)

        self.etape("q3-reduire-facteur")
        m3 = MathTex(r"(\sqrt2+1)(1-\sqrt2) = \sqrt2-2+1-\sqrt2 = -1", font_size=30)
        self.ecrit(m3, buff=0.5)
        self.legende(
            "Ce facteur se réduit à −1 : une identité remarquable",
            "déployée terme à terme.",
        )
        self.pose(3.2)

        self.etape("q3-conclusion-egalite")
        m4 = MathTex(
            r"(\sqrt2+1)(b-a) = (\sqrt2+1) - i = (1+\sqrt2) - i = b-d",
            font_size=28, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(m4, buff=0.55)
        self.legende(
            "On retrouve EXACTEMENT b moins d, calculé à la question 2 :",
            "l'égalité est vérifiée.",
        )
        self.pose(3.4)

        self.etape("q3-sens-alignement")
        seg_da = Line(plan.n2p(D_AFF), plan.n2p(A_AFF), color=COL_PT_D, stroke_width=3)
        seg_ab = Line(plan.n2p(A_AFF), plan.n2p(B_AFF), color=COL_PT_A, stroke_width=3)
        seg_ab.add_tip(tip_width=0.14, tip_length=0.14)
        lbl_ab = MathTex(r"\overrightarrow{AB}", font_size=24, color=COL_PT_A).next_to(
            seg_ab.get_center(), DOWN, buff=0.14
        )
        self.play(Create(seg_da), Create(seg_ab))
        self.play(FadeIn(lbl_ab))
        concl2 = MathTex(
            r"\overrightarrow{DB} = (\sqrt2+1)\,\overrightarrow{AB} \implies"
            r" A,\ D,\ B\ \text{alignés}",
            font_size=28, color=BAC_SUCCESS,
        )
        self.ecrit(concl2, buff=0.55)
        self.legende(
            "Un coefficient RÉEL relie les deux vecteurs : ils sont",
            "colinéaires. Une SEULE droite passe par D, A et B —",
            "ils sont alignés. 0,5 point.",
        )
        self.pose(4.2)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, seg_da, seg_ab, lbl_ab)))

    # ── Q4 : vérifier ac = 2b ─────────────────────────────────────────
    def chapitre_q4(self):
        badge = self.bandeau_question("4)", "0,25 pt")
        self.ardoise()

        self.etape("q4-enonce")
        but = MathTex(r"\text{Vérifier que } ac = 2b", font_size=38)
        self.ecrit(but)
        self.legende("Un produit à calculer, à comparer au double de b.")
        self.pose(2.8)

        self.etape("q4-factoriser-a")
        m1 = MathTex(r"ac = \sqrt2(1+i)\left[(1+\sqrt2)-i\right]", font_size=32)
        self.ecrit(m1, buff=0.5)
        self.legende(
            "a se factorise en racine de deux fois (1+i) ; c est déjà",
            "connu depuis la question 2.",
        )
        self.pose(3.2)

        self.etape("q4-developper")
        m2 = MathTex(
            r"(1+i)\left[(1+\sqrt2)-i\right] = (1+\sqrt2) - i + i(1+\sqrt2) - i^2"
            r" = (2+\sqrt2) + i\sqrt2",
            font_size=22,
        )
        self.ecrit(m2, buff=0.5)
        self.legende("On développe, puis on remplace i au carré par −1.")
        self.pose(3.2)

        self.etape("q4-distribuer")
        m3 = MathTex(
            r"ac = \sqrt2\left[(2+\sqrt2)+i\sqrt2\right] = (2\sqrt2+2) + 2i", font_size=30
        )
        self.ecrit(m3, buff=0.5)
        self.legende("On distribue le facteur racine de deux.")
        self.pose(2.8)

        self.etape("q4-conclusion")
        m4 = MathTex(
            r"2b = 2(1+\sqrt2+i) = (2+2\sqrt2) + 2i = ac",
            font_size=30, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(m4, buff=0.55)
        self.legende("Les deux expressions coïncident : vérifié. 0,25 point.")
        self.pose(3.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q5 : en déduire 2 arg(b) ≡ π/4 [2π] ──────────────────────────
    def chapitre_q5(self):
        badge = self.bandeau_question("5)", "0,5 pt")
        self.ardoise()

        self.etape("q5-enonce")
        but = MathTex(
            r"\text{En déduire que } 2\arg(b) \equiv \dfrac{\pi}{4}\ [2\pi]",
            font_size=34,
        )
        self.ecrit(but)
        self.legende(
            "On ne recalcule rien : on passe aux arguments dans",
            "l'égalité ac = 2b, déjà établie.",
        )
        self.pose(3.4)

        self.etape("q5-outil-argument-produit")
        outil = MathTex(
            r"\arg(zz') = \arg z + \arg z'\ [2\pi]", font_size=32, color=BAC_INK_SOFT
        )
        self.ecrit(outil)
        self.encadre(couleur=BAC_ACCENT)
        m1 = MathTex(
            r"ac = 2b \implies \arg(a) + \arg(c) \equiv \arg(b)\ [2\pi]", font_size=28
        )
        self.ecrit(m1, buff=0.55)
        self.legende(
            "L'outil : l'argument d'un produit est la SOMME des arguments.",
            "Le facteur réel positif 2 ne change rien à l'argument de b.",
        )
        self.pose(3.8)

        self.etape("q5-argument-c")
        m2 = MathTex(r"c = \bar{b} \implies \arg(c) = -\arg(b)\ [2\pi]", font_size=32)
        self.ecrit(m2, buff=0.5)
        self.legende(
            "Le conjugué a pour argument l'OPPOSÉ : c'est le reflet",
            "déjà tracé sur la figure.",
        )
        self.pose(3.2)

        self.etape("q5-conclusion")
        m3 = MathTex(
            r"\arg(a) - \arg(b) \equiv \arg(b)\ [2\pi] \implies"
            r" \arg(a) \equiv 2\arg(b)\ [2\pi]",
            font_size=24,
        )
        self.ecrit(m3, buff=0.5)
        concl = MathTex(
            r"\arg(a) = \dfrac{\pi}{4} \implies 2\arg(b) \equiv \dfrac{\pi}{4}\ [2\pi]",
            font_size=30, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(concl, buff=0.5)
        self.legende(
            "On reporte l'argument de c, puis celui de a — π/4, question 1.",
            "0,5 point.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q6 : la rotation de centre O, d'angle π/4 ────────────────────
    def chapitre_q6(self, plan):
        badge = self.bandeau_question("6)", "0,25 pt")
        self.ardoise()
        origine = plan.n2p(0)

        self.etape("q6-enonce")
        txt = Text(
            "R : rotation de centre O et d'angle π/4, transforme M(z)",
            font_size=24,
        )
        txt2 = Text("en M'(z').", font_size=24)
        intro_grp = VGroup(txt, txt2).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        self.ecrit(intro_grp)
        but = MathTex(r"\text{Montrer que } z' = \dfrac12\,a\,z", font_size=36)
        self.ecrit(but, buff=0.5)
        self.legende(
            "R fait tourner tout point autour de O, d'un angle π/4.",
            "On veut écrire cette rotation avec le nombre a.",
        )
        self.pose(3.6)

        self.etape("q6-sens-rotation")
        m_pt = plan.n2p(M_DEMO)
        m_img_val = M_DEMO * np.exp(1j * np.pi / 4)
        m_img_pt = plan.n2p(m_img_val)
        rayon = float(np.linalg.norm(m_pt - origine))
        angle_m = float(np.angle(M_DEMO))
        arc = Arc(
            radius=rayon, start_angle=angle_m, angle=PI / 4,
            arc_center=origine, color=BAC_ACCENT_LIGHT, stroke_width=3,
        )
        m_dot = Dot(m_pt, color=BAC_INK_SOFT, radius=0.07)
        m_lbl = MathTex("M", font_size=26, color=BAC_INK_SOFT).next_to(
            m_dot, LEFT, buff=0.12
        )
        self.play(FadeIn(m_dot, scale=1.6), Write(m_lbl))
        self.legende(
            "Prenons un point M quelconque, pour VOIR ce que fait la",
            "rotation — illustration, pas une donnée de l'énoncé.",
        )
        self.pose(3.2)

        m_img_dot = Dot(m_pt, color=BAC_ACCENT_STRONG, radius=0.07)
        self.play(Create(arc, run_time=2.6), MoveAlongPath(m_img_dot, arc, run_time=2.6))
        m_img_lbl = MathTex("M'", font_size=26, color=BAC_ACCENT_STRONG).next_to(
            m_img_dot, UP, buff=0.1
        )
        om = Line(origine, m_pt, color=BAC_INK_MUTED, stroke_width=2)
        om2 = Line(origine, m_img_pt, color=BAC_INK_MUTED, stroke_width=2)
        ang = Angle(om, om2, radius=0.5, other_angle=False, color=BAC_ACCENT, stroke_width=3)
        milieu = ang.point_from_proportion(0.5)
        direction = (milieu - origine) / np.linalg.norm(milieu - origine)
        ang_lbl = MathTex(r"\tfrac{\pi}{4}", font_size=22, color=BAC_ACCENT).move_to(
            milieu + 0.32 * direction
        )
        self.play(Write(m_img_lbl), Create(om), Create(om2))
        self.play(Create(ang), FadeIn(ang_lbl))
        self.legende(
            "Que SIGNIFIE une rotation ? Le rayon OM = OM' ne change",
            "PAS ; seul l'angle π/4 tourne le point autour de O.",
        )
        self.pose(3.8)
        self.play(
            FadeOut(VGroup(m_dot, m_lbl, m_img_dot, m_img_lbl, arc, om, om2, ang, ang_lbl))
        )

        self.etape("q6-formule")
        f1 = MathTex(r"z' = e^{i\theta}\,z = e^{i\pi/4}\,z", font_size=38)
        self.ecrit(f1)
        self.legende(
            "La rotation de centre O et d'angle θ s'écrit toujours ainsi.",
            "Ici θ = π/4, l'angle donné.",
        )
        self.pose(3.2)

        self.etape("q6-calculs-algebriques")
        f2 = MathTex(
            r"e^{i\pi/4} = \cos\dfrac{\pi}{4} + i\sin\dfrac{\pi}{4}"
            r" = \dfrac{\sqrt2}{2} + \dfrac{\sqrt2}{2}\,i",
            font_size=28,
        )
        self.ecrit(f2, buff=0.5)
        f3 = MathTex(
            r"\dfrac{1}{2}\,a = \dfrac{1}{2}(\sqrt2+i\sqrt2)"
            r" = \dfrac{\sqrt2}{2} + \dfrac{\sqrt2}{2}\,i",
            font_size=28,
        )
        self.ecrit(f3, buff=0.4)
        self.legende(
            "Deux écritures, côte à côte : la valeur de e^(iπ/4), et",
            "celle de un demi a — EXACTEMENT les mêmes parties.",
        )
        self.pose(3.8)

        self.etape("q6-conclusion")
        concl = MathTex(
            r"\dfrac{1}{2}\,a = e^{i\pi/4} \implies z' = \dfrac{1}{2}\,a\,z",
            font_size=38, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(concl, buff=0.55)
        self.legende(
            "Les deux nombres coïncident : la rotation s'écrit bien",
            "z' = un demi a fois z. 0,25 point.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q7 : en déduire R(C) = B et R(A) = D ─────────────────────────
    def chapitre_q7(self, plan, a_dot, b_dot, c_dot, d_dot):
        badge = self.bandeau_question("7)", "0,5 pt")
        self.ardoise()
        origine = plan.n2p(0)

        self.etape("q7-enonce")
        but = MathTex(
            r"\text{En déduire que } R(C)=B \ \text{et}\ R(A)=D", font_size=32
        )
        self.ecrit(but)
        self.legende(
            "La formule z' = un demi a z donne l'image de N'IMPORTE",
            "QUEL point : on l'applique à C, puis à A.",
        )
        self.pose(3.4)

        self.etape("q7-calcul-R-C")
        m1 = MathTex(
            r"R(C):\quad \dfrac{1}{2}ac = \dfrac{1}{2}(2b) = b \implies R(C) = B",
            font_size=28,
        )
        self.ecrit(m1)
        self.legende(
            "On réutilise ac = 2b, établi à la question 4 — pas de",
            "nouveau calcul.",
        )
        self.pose(3.4)

        self.etape("q7-visuel-R-C")
        c_pt, b_pt = plan.n2p(C_AFF), plan.n2p(B_AFF)
        rayon_c = float(np.linalg.norm(c_pt - origine))
        angle_c = float(np.angle(C_AFF))
        arc_cb = Arc(
            radius=rayon_c, start_angle=angle_c, angle=PI / 4,
            arc_center=origine, color=COL_PT_C, stroke_width=3,
        )
        marker_cb = Dot(c_pt, color=BAC_ACCENT_STRONG, radius=0.07)
        self.play(
            Create(arc_cb, run_time=2.4), MoveAlongPath(marker_cb, arc_cb, run_time=2.4)
        )
        self.play(FadeOut(marker_cb))
        self.legende(
            "Le même angle π/4, tracé cette fois entre C et B — la",
            "rotation appliquée à un point réel de la figure.",
        )
        self.pose(3.6)

        self.etape("q7-calcul-a-carre")
        m2 = MathTex(
            r"a^2:\quad |a^2| = |a|^2 = 4, \quad \arg(a^2) = 2\arg(a) = \dfrac{\pi}{2}"
            r" \implies a^2 = 4i",
            font_size=22,
        )
        self.ecrit(m2, buff=0.55)
        self.legende(
            "Module au carré, argument doublé : a a pour module 2 et",
            "pour argument π/4 — question 1.",
        )
        self.pose(3.6)

        self.etape("q7-calcul-R-A")
        m3 = MathTex(
            r"R(A):\quad \dfrac{1}{2}a^2 = \dfrac{1}{2}(4i) = 2i = d \implies R(A) = D",
            font_size=28, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(m3, buff=0.55)
        self.legende("d = 2i est exactement l'affixe donnée pour D — vérifié.")
        self.pose(3.2)

        self.etape("q7-visuel-R-A")
        a_pt, d_pt = plan.n2p(A_AFF), plan.n2p(D_AFF)
        rayon_a = float(np.linalg.norm(a_pt - origine))
        angle_a = float(np.angle(A_AFF))
        arc_ad = Arc(
            radius=rayon_a, start_angle=angle_a, angle=PI / 4,
            arc_center=origine, color=COL_PT_A, stroke_width=3,
        )
        marker_ad = Dot(a_pt, color=BAC_ACCENT_STRONG, radius=0.07)
        self.play(
            Create(arc_ad, run_time=2.4), MoveAlongPath(marker_ad, arc_ad, run_time=2.4)
        )
        self.play(FadeOut(marker_ad))
        self.legende(
            "La MÊME rotation envoie C sur B, et A sur D — un seul",
            "angle π/4 explique les deux images. 0,5 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, arc_cb, arc_ad)))

    # ── Q8 : quotient d'affixes-vecteurs, puis l'angle (AC, AB) ──────
    def chapitre_q8(self, plan, a_dot, b_dot, c_dot):
        badge = self.bandeau_question("8)", "0,5 pt")
        self.ardoise()
        a_pt = plan.n2p(A_AFF)

        self.etape("q8-enonce")
        but = MathTex(
            r"\dfrac{b-a}{c-a} \overset{?}{=} \left(\dfrac{\sqrt2-1}{2}\right)a,"
            r"\ \ \text{puis l'angle } \left(\overrightarrow{AC},\overrightarrow{AB}\right)",
            font_size=24,
        )
        self.ecrit(but)
        self.legende(
            "On réduit un quotient d'affixes-vecteurs à une forme",
            "réelle fois a, pour en tirer un angle.",
        )
        self.pose(3.6)

        self.etape("q8-calcul-c-moins-a")
        m1 = MathTex(
            r"c-a = \left[(1+\sqrt2)-i\right] - (\sqrt2+i\sqrt2) = 1 - i(1+\sqrt2)",
            font_size=28,
        )
        self.ecrit(m1, buff=0.5)
        self.legende(
            "Différence c moins a (b moins a est déjà connu, question 3).",
        )
        self.pose(3.0)

        self.etape("q8-former-quotient")
        m2 = MathTex(
            r"\dfrac{b-a}{c-a} = \dfrac{1+i(1-\sqrt2)}{1-i(1+\sqrt2)}", font_size=32
        )
        self.ecrit(m2, buff=0.5)
        self.legende("On forme le quotient avec b moins a de la question 3.")
        self.pose(2.8)

        self.etape("q8-rationaliser")
        m3 = MathTex(
            r"\dfrac{b-a}{c-a} = \dfrac{\left[1+i(1-\sqrt2)\right]\left[1+i(1+\sqrt2)\right]}"
            r"{\left[1-i(1+\sqrt2)\right]\left[1+i(1+\sqrt2)\right]} = \dfrac{2+2i}{4+2\sqrt2}",
            font_size=20,
        )
        self.ecrit(m3, buff=0.5)
        self.legende(
            "On multiplie haut et bas par le conjugué du dénominateur.",
        )
        self.pose(3.4)

        self.etape("q8-simplifier")
        m4 = MathTex(
            r"\dfrac{b-a}{c-a} = \dfrac{1+i}{2+\sqrt2} = \dfrac{(1+i)(2-\sqrt2)}{2}"
            r" = \dfrac{2-\sqrt2}{2}\,(1+i)",
            font_size=24,
        )
        self.ecrit(m4, buff=0.5)
        self.legende(
            "On simplifie, puis on rationalise par deux moins racine",
            "de deux.",
        )
        self.pose(3.4)

        self.etape("q8-rhs")
        m5 = MathTex(
            r"\left(\dfrac{\sqrt2-1}{2}\right)a = \left(\dfrac{\sqrt2-1}{2}\right)\sqrt2(1+i)"
            r" = \dfrac{2-\sqrt2}{2}\,(1+i)",
            font_size=24,
        )
        self.ecrit(m5, buff=0.5)
        self.legende(
            "On développe le membre de droite en factorisant a.",
        )
        self.pose(3.2)

        self.etape("q8-conclusion-egalite")
        m6 = MathTex(
            r"\dfrac{b-a}{c-a} = \left(\dfrac{\sqrt2-1}{2}\right)a",
            font_size=36, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(m6, buff=0.55)
        self.legende("Les deux expressions coïncident : l'égalité est vérifiée.")
        self.pose(3.2)

        self.etape("q8-sens-angle")
        vec_ac = Line(a_pt, plan.n2p(C_AFF), color=COL_PT_C, stroke_width=3)
        vec_ac.add_tip(tip_width=0.14, tip_length=0.14)
        vec_ab2 = Line(a_pt, plan.n2p(B_AFF), color=COL_PT_B, stroke_width=3)
        vec_ab2.add_tip(tip_width=0.14, tip_length=0.14)
        # Point d'appui à 70 % vers C (pas le centre) : le milieu du
        # vecteur est exactement à hauteur de l'axe réel et le label le
        # chevauchait (défaut d'audit) ; à 0,7 on est net sous l'axe.
        lbl_ac = MathTex(r"\overrightarrow{AC}", font_size=22, color=COL_PT_C).next_to(
            vec_ac.point_from_proportion(0.7), DOWN, buff=0.12
        )
        lbl_ab2 = MathTex(r"\overrightarrow{AB}", font_size=22, color=COL_PT_B).next_to(
            vec_ab2.get_center(), UP, buff=0.12
        )
        self.play(Create(vec_ac), Create(vec_ab2))
        self.play(FadeIn(lbl_ac), FadeIn(lbl_ab2))
        ang2 = Angle(
            vec_ac, vec_ab2, radius=0.45, other_angle=False, color=BAC_ACCENT, stroke_width=3
        )
        milieu2 = ang2.point_from_proportion(0.5)
        direction2 = (milieu2 - a_pt) / np.linalg.norm(milieu2 - a_pt)
        ang_lbl2 = MathTex("?", font_size=22, color=BAC_ACCENT).move_to(
            milieu2 + 0.32 * direction2
        )
        self.play(Create(ang2), FadeIn(ang_lbl2))
        self.legende(
            "Que SIGNIFIE l'argument d'un quotient d'affixes-vecteurs ?",
            "L'ANGLE entre les deux vecteurs — ici entre AC et AB.",
        )
        self.pose(3.8)

        self.etape("q8-piege-ordre")
        piege = VGroup(
            Text("ATTENTION : b−a (vecteur AB) est au NUMÉRATEUR,", font_size=19, color=BAC_ERROR),
            Text("c−a (vecteur AC) au DÉNOMINATEUR — l'ordre fixe", font_size=19, color=BAC_ERROR),
            Text("le SIGNE de l'angle. Ne jamais l'inverser.", font_size=19, color=BAC_ERROR),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(piege, buff=0.5)
        self.legende(
            "Un piège classique du bac : l'ORDRE des vecteurs dans le",
            "quotient fixe le signe de l'angle — à ne jamais inverser.",
        )
        self.pose(4.0)

        self.etape("q8-argument-et-conclusion")
        self.nettoie(garder=0)
        arg_calc = MathTex(
            r"\arg\!\left(\dfrac{b-a}{c-a}\right) = \arg(a) = \dfrac{\pi}{4}"
            r" \quad \text{car}\ \dfrac{\sqrt2-1}{2} > 0",
            font_size=24,
        )
        self.ecrit(arg_calc, buff=0.5)
        self.legende(
            "Un coefficient réel POSITIF ne change pas l'argument :",
            "il vaut celui de a, connu depuis la question 1.",
        )
        self.pose(3.6)

        concl_final = MathTex(
            r"\left(\overrightarrow{AC},\ \overrightarrow{AB}\right) \equiv \dfrac{\pi}{4}\ [2\pi]",
            font_size=38, color=BAC_SUCCESS,
        )
        self.ecrit(concl_final, buff=0.55)
        ang_lbl3 = MathTex(r"\tfrac{\pi}{4}", font_size=22, color=BAC_SUCCESS).move_to(
            ang_lbl2
        )
        self.play(
            ReplacementTransform(ang_lbl2, ang_lbl3), ang2.animate.set_color(BAC_SUCCESS)
        )
        self.legende(
            "L'argument du quotient est une mesure de l'angle (AC, AB)",
            "— 0,5 point. Exercice terminé, trois points au total.",
        )
        self.pose(4.4)
        self.efface_legende()
        self.play(*[FadeOut(m) for m in self.mobjects])

    # ── Fermeture ─────────────────────────────────────────────────
    def chapitre_fin(self):
        self.etape("bilan")
        bilan = VGroup(
            Text("Ce qu'il faut retenir", font_size=34, color=BAC_INK),
            Text("• Module |a| : la DISTANCE de O au point. Argument θ :",
                 font_size=23, color=BAC_INK_SOFT),
            Text("  l'ANGLE depuis l'axe réel.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• Conjugué = reflet dans l'axe réel ; argument opposé.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• Coefficient réel entre deux vecteurs qui partagent un",
                 font_size=23, color=BAC_INK_SOFT),
            Text("  point : ils sont colinéaires, les points sont alignés.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• arg(produit) = somme des arguments ; rotation de centre O",
                 font_size=23, color=BAC_INK_SOFT),
            Text("  et d'angle θ : z' = e^(iθ) z.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• arg(quotient d'affixes-vecteurs) = angle entre les",
                 font_size=23, color=BAC_INK_SOFT),
            Text("  deux vecteurs — ATTENTION à l'ordre numérateur/dénominateur.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("3 points — sujet réel, valeurs exactes du scan officiel.",
                 font_size=21, color=BAC_INK_MUTED),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.28)
        self.play(FadeIn(bilan, shift=0.2 * UP))
        self.pose(5.0)
        self.play(FadeOut(bilan))
        if self._badge_etape is not None:
            self.remove(self._badge_etape)
