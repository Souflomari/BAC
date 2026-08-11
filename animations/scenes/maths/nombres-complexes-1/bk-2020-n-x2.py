"""Explication animée v4 — Bac 2020 SN (SExp), Exercice 2 : nombres complexes.

Source de vérité : content/maths/nombres-complexes-1/bank.yaml,
entrée bk-2020-n-x2 (vérifiée contre le scan officiel, NS 22F, 5 points,
9 questions). Toutes les valeurs (a, b, c, d = a**4, Delta, angles) sont
copiées telles quelles depuis l'entrée vérifiée.

Note de sourcing (authoring-side, non affichée) : le scan porte un
glyphe ℂ cassé (tofu) à la question 1, résolu par le contexte « des
nombres complexes » — cf. sourcing.note de l'entrée et
docs/sujets/maths/nombres-complexes-1.md. On écrit ℂ normalement ici ;
rien à reproduire de la panne d'affichage du scan.

Standard v4 (DESIGN.md) : règle du zéro implicite + signaling dans la
formule (entourer/flécher) + couche de sens (« que signifie… ? ») avant
chaque calcul + zones d'écran dures et ardoise gérée (jamais de
chevauchement) + rythme calme (pose 2.4–4.0).

Piège de nommage propre à ce sujet : les nombres a, b, c de la question
2) NE SONT PAS les coefficients de l'équation (E) de la question 1) —
même lettres, objets différents. Signalé une fois, en rouge, à leur
introduction (DESIGN.md §2 : rouge réservé aux pièges).

Rendu : ../../render.sh scenes/maths/nombres-complexes-1/bk-2020-n-x2.py
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
    BAC_ERROR,
    BAC_INK,
    BAC_INK_MUTED,
    BAC_INK_SOFT,
    BAC_SUCCESS,
    BAC_WARNING,
)

# Code couleur sémantique (DESIGN.md §2), stable d'un trio de coefficients
# à l'autre : objet n°1 sarcelle forte, n°2 or, n°3 vert. Réutilisé TEL
# QUEL pour le second trio a, b, c (question 2) — le rouge, plus bas,
# signale que ce sont des nombres différents malgré les mêmes lettres.
COL_A, COL_B, COL_C = BAC_ACCENT_STRONG, BAC_WARNING, BAC_SUCCESS

NARRATION = {
    "titre": "Exercice deux du bac deux mille vingt, session normale, "
    "sciences expérimentales : nombres complexes, sur cinq points. Neuf "
    "questions, une seule idée à la fois — rien n'est supposé connu.",
    "q1": "Question un a. On ne cherche pas Delta seul : on nous en donne "
    "une valeur, sous forme d'un carré, et on doit la VÉRIFIER. On "
    "identifie les coefficients, on remarque que la forme même du "
    "résultat annonce un signe négatif, puis on calcule Delta pour comparer.",
    "q2": "Question un b. Delta est négatif : on écrit sa racine avec i, "
    "on applique la formule des racines, et on obtient deux solutions "
    "conjuguées. L'une d'elles réapparaît, sous un autre nom, juste après.",
    "plan": "On découvre trois nouveaux nombres complexes, aussi appelés "
    "a, b et c — attention, ce ne sont plus les coefficients de "
    "l'équation. On les place dans le plan, et on revoit ce que signifie "
    "le conjugué : le reflet dans l'axe réel.",
    "q3": "Question deux a. On vérifie que b fois c conjugué égale a, en "
    "développant le produit. Puis, sans nouveau calcul lourd, on "
    "multiplie les deux membres par c et on utilise que c fois c "
    "conjugué est le module de c au carré, pour en déduire que a c "
    "égale quatre b.",
    "q4": "Question deux b. Le module, c'est la distance à O ; "
    "l'argument, c'est l'angle depuis l'axe réel positif. On calcule "
    "les deux pour b, puis pour c, et on écrit leurs formes "
    "trigonométriques.",
    "q5": "Question deux c. Le module d'un quotient est le quotient des "
    "modules ; l'argument d'un quotient est la différence des "
    "arguments. En repartant de a c égale quatre b, on obtient le "
    "module et l'argument de a, puis sa forme trigonométrique.",
    "q6": "Question trois a. Le plan se complète : B, C et D sont "
    "maintenant des points, D d'affixe a puissance quatre. Une rotation "
    "de centre O et d'angle thêta multiplie l'affixe par e puissance i "
    "thêta. On vérifie qu'un quart de a joue exactement ce rôle pour "
    "l'angle pi sur douze.",
    "q7": "Question trois b. On applique la formule au point C : son "
    "image a pour affixe un quart de a c. Or a c égale quatre b, déjà "
    "démontré : l'image de C est donc B. On regarde la rotation se "
    "faire, à l'écran.",
    "q8": "Question trois c. La rotation conserve les distances à O et "
    "l'angle : OB égale OC, et l'angle en O vaut pi sur douze. Le "
    "triangle OBC est isocèle en O — l'angle n'est pas droit, donc pas "
    "rectangle.",
    "q9": "Question trois d. On élève a à la puissance quatre : le "
    "module se met à la puissance quatre, l'argument se multiplie par "
    "quatre. On retombe sur cent vingt-huit b. Comme d égale a "
    "puissance quatre, le vecteur OD est cent vingt-huit fois le "
    "vecteur OB : un coefficient réel entre deux vecteurs issus de O, "
    "cela force O, B et D à être alignés.",
}

SQRT2 = float(np.sqrt(2))
SQRT3 = float(np.sqrt(3))
SQRT6 = float(np.sqrt(6))
A_AFF = complex(SQRT6 + SQRT2, SQRT6 - SQRT2)
B_AFF = complex(1.0, SQRT3)
C_AFF = complex(SQRT2, SQRT2)
D_AFF = complex(128.0, 0.0) * B_AFF  # = a**4 (voir q9) ; tracé hors échelle


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_q1()
        self.chapitre_q2()
        self.chapitre_plan()
        self.chapitre_q3()
        self.chapitre_q4()
        self.chapitre_q5()
        self.chapitre_q6()
        self.chapitre_q7()
        self.chapitre_q8()
        self.chapitre_q9()
        self.chapitre_fin()

    # ── Ouverture ──────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("titre")
        self.carte_titre(
            "BAC 2020 · SESSION NORMALE · SCIENCES EXP.",
            "Nombres complexes",
            "Exercice 2 — 5 points · sujet officiel NS 22F",
        )

    # ── Q1 a) : vérifier Delta (pas de figure — pleine largeur) ─────
    def chapitre_q1(self):
        badge = self.bandeau_question("1) a)", "0,5 pt")

        self.etape("q1-enonce")
        eq = MathTex(
            "(E)\\,:\\ ", "z^2", "-2(\\sqrt2+\\sqrt6)\\,", "z", "+", "16",
            "=0", font_size=42,
        ).shift(2.5 * UP)
        self.play(Write(eq), run_time=1.6)
        self.legende(
            "Dans ℂ, l'ensemble des nombres complexes, on considère (E).",
            "On ne nous demande pas de calculer Delta seul : on nous en",
            "donne une valeur — il faut la VÉRIFIER, pas la deviner.",
        )
        self.pose(3.0)

        self.etape("q1-cible-signe")
        cible = MathTex(
            r"\Delta = -4\,", r"\left(\sqrt6-\sqrt2\right)^2", font_size=44,
        ).next_to(eq, DOWN, buff=0.6)
        self.play(FadeIn(cible, shift=0.2 * DOWN))
        carre_box = SurroundingRectangle(
            cible[1], color=BAC_WARNING, buff=0.06, corner_radius=0.08
        )
        signe_note = Text(
            "un carré : toujours ≥ 0", font_size=22, color=BAC_INK_SOFT
        ).next_to(carre_box, DOWN, buff=0.3)
        self.play(Create(carre_box), FadeIn(signe_note, shift=0.1 * DOWN))
        self.legende(
            "Lis la FORME du résultat annoncé : un carré, fois moins",
            "quatre. Un carré est toujours positif ou nul, donc Delta est",
            "négatif ou nul — et racine de 6 ≠ racine de 2, donc Delta < 0.",
        )
        self.pose(3.6)
        self.play(FadeOut(carre_box), FadeOut(signe_note), cible.animate.shift(0.1 * UP))

        self.etape("q1-coefficients")
        forme = MathTex(
            "a", "z^2", "+", "b", "z", "+", "c", "= 0", font_size=32,
        ).next_to(cible, DOWN, buff=0.55)
        forme.set_color(BAC_INK_SOFT)
        forme[0].set_color(COL_A)
        forme[3].set_color(COL_B)
        forme[6].set_color(COL_C)
        self.play(FadeIn(forme, shift=0.15 * DOWN))
        # On entoure d'abord DANS (E) elle-même (contiguïté avec le terme
        # réel), puis on relie, par une flèche courte, la lettre générique
        # juste au-dessus à sa valeur — jamais une flèche qui traverserait
        # les rangées intermédiaires.
        cadres_eq = VGroup()
        for part, col in ((eq[1], COL_A), (eq[2], COL_B), (eq[5], COL_C)):
            part.set_color(col)
            cadres_eq.add(self.entoure(part, col))
        lab_a = MathTex("a = 1", font_size=36, color=COL_A)
        lab_b = MathTex(r"b = -2(\sqrt2+\sqrt6)", font_size=36, color=COL_B)
        lab_c = MathTex("c = 16", font_size=36, color=COL_C)
        labels = VGroup(lab_a, lab_b, lab_c).arrange(RIGHT, buff=1.0).next_to(
            forme, DOWN, buff=0.5
        )
        cadres, fleches = VGroup(), VGroup()
        for letra, lab, col in (
            (forme[0], lab_a, COL_A), (forme[3], lab_b, COL_B), (forme[6], lab_c, COL_C)
        ):
            cadres.add(self.entoure(letra, col))
            self.play(FadeIn(lab, shift=0.15 * UP), run_time=0.5)
            fleches.add(self.fleche_vers(letra, lab, col))
        self.legende(
            "z² est écrit SEUL : son coefficient est 1, même s'il n'est",
            "pas noté — c'est a. Devant z il y a −2(√2+√6) : c'est b.",
            "Tout seul, 16 : c'est c. Rien n'est laissé implicite.",
        )
        self.pose(3.6)
        self.play(FadeOut(forme), FadeOut(cadres), FadeOut(fleches), FadeOut(cadres_eq))

        self.etape("q1-outil-delta")
        delta_def = MathTex(
            r"\Delta = ", "b", r"^2 - 4\,", "a", r"\,", "c", font_size=42,
        ).next_to(labels, DOWN, buff=0.6)
        delta_def[1].set_color(COL_B)
        delta_def[3].set_color(COL_A)
        delta_def[5].set_color(COL_C)
        cadre_outil = SurroundingRectangle(
            delta_def, color=BAC_ACCENT, buff=0.2, corner_radius=0.1
        )
        self.play(Write(delta_def), Create(cadre_outil))
        self.legende(
            "L'outil du second degré : le discriminant. Sa formule",
            "réutilise nos trois coefficients — mêmes couleurs qu'au-dessus.",
        )
        self.pose(2.8)
        self.play(FadeOut(VGroup(eq, cible, labels, delta_def, cadre_outil)))

        self.etape("q1-substituer")
        c1 = MathTex(
            r"\Delta = \left[-2(\sqrt2+\sqrt6)\right]^2 - 4\times 1\times 16",
            font_size=38,
        ).to_edge(LEFT, buff=0.7).to_edge(UP, buff=1.35)
        c2 = MathTex(
            r"= 4(\sqrt2+\sqrt6)^2 - 64", font_size=38,
        ).next_to(c1, DOWN, aligned_edge=LEFT, buff=0.4)
        self.play(Write(c1))
        self.legende(
            "On substitue b et a. Le carré efface le signe : (−2X)² = 4X².",
            "Et 4 fois 1 fois 16 = 64.",
        )
        self.pose(3.0)
        self.play(Write(c2))
        self.pose(2.4)

        self.etape("q1-developper-carre")
        c3 = MathTex(
            r"(\sqrt2+\sqrt6)^2 = 2 + 2\sqrt{12} + 6", font_size=36,
        ).next_to(c2, DOWN, aligned_edge=LEFT, buff=0.45)
        aside = MathTex(
            r"\sqrt{12} = \sqrt{4\times3} = 2\sqrt3", font_size=30, color=BAC_INK_SOFT,
        ).next_to(c3, RIGHT, buff=0.8)
        cadre_aside = SurroundingRectangle(aside, color=BAC_BORDER, buff=0.15, corner_radius=0.08)
        self.play(Write(c3))
        self.legende(
            "On développe le carré : (√2)² = 2, (√6)² = 6, et le double",
            "produit 2×√2×√6 = 2√12. Or √12 = √(4×3) = 2√3.",
        )
        self.pose(3.4)
        self.play(FadeIn(aside), Create(cadre_aside))
        c4 = MathTex(
            r"= 8+4\sqrt3", font_size=36, color=BAC_ACCENT_STRONG,
        ).next_to(c3, DOWN, aligned_edge=LEFT, buff=0.4)
        self.play(Write(c4))
        self.legende("2√12 = 2×2√3 = 4√3. En tout : 2 + 6 + 4√3 = 8 + 4√3.")
        self.pose(3.0)
        self.play(FadeOut(aside), FadeOut(cadre_aside))

        self.etape("q1-calcul-delta")
        c5 = MathTex(
            r"\Delta = 4(8+4\sqrt3) - 64 = 32+16\sqrt3-64 = ", r"16\sqrt3-32",
            font_size=36,
        ).next_to(c4, DOWN, aligned_edge=LEFT, buff=0.45)
        self.play(Write(c5))
        self.legende(
            "On distribue le 4 : 4×8 = 32, 4×4√3 = 16√3. Puis 32 − 64 = −32.",
            "Delta = 16√3 − 32 — c'est notre calcul, indépendant de l'énoncé.",
        )
        self.pose(3.4)
        self.play(FadeOut(VGroup(c1, c2, c3, c4)), c5.animate.to_edge(LEFT, buff=0.7).to_edge(UP, buff=1.35))

        self.etape("q1-carre-cible")
        c6 = MathTex(
            r"(\sqrt6-\sqrt2)^2 = 6-2\sqrt{12}+2 = 8-4\sqrt3", font_size=36,
        ).next_to(c5, DOWN, aligned_edge=LEFT, buff=0.5)
        c7 = MathTex(
            r"-4(\sqrt6-\sqrt2)^2 = -4(8-4\sqrt3) = ", r"-32+16\sqrt3", font_size=36,
        ).next_to(c6, DOWN, aligned_edge=LEFT, buff=0.4)
        self.play(Write(c6))
        self.legende(
            "Pour comparer, on développe AUSSI l'expression cible : même",
            "principe, mais le double produit devient négatif : −2√12 = −4√3.",
        )
        self.pose(3.2)
        self.play(Write(c7))
        self.legende("On multiplie par −4 : −4×8 = −32, −4×(−4√3) = 16√3.")
        self.pose(2.8)

        self.etape("q1-comparaison")
        box1 = self.entoure(c5[1], BAC_SUCCESS)
        box2 = self.entoure(c7[1], BAC_SUCCESS)
        concl = MathTex(
            r"\Delta = -4(\sqrt6-\sqrt2)^2\ \checkmark", font_size=40, color=BAC_SUCCESS,
        ).next_to(c7, DOWN, aligned_edge=LEFT, buff=0.55)
        self.play(Write(concl))
        self.legende(
            "16√3 − 32 et −32 + 16√3 : la MÊME valeur, juste réordonnée.",
            "L'égalité annoncée est vérifiée — 0,5 point.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.play(FadeOut(VGroup(badge, c5, c6, c7, box1, box2, concl)))

    # ── Q1 b) : en déduire les solutions ────────────────────────────
    def chapitre_q2(self):
        badge = self.bandeau_question("1) b)", "1 pt")

        self.etape("q2-enonce")
        rappel = MathTex(
            r"\Delta = -4(\sqrt6-\sqrt2)^2 < 0", font_size=42,
        ).shift(2.4 * UP)
        self.play(Write(rappel))
        self.legende(
            "Delta est négatif : on quitte les réels, les solutions sont",
            "deux complexes conjugués. On écrit la racine de Delta avec i.",
        )
        self.pose(2.8)

        self.etape("q2-racine-delta")
        r1 = MathTex(
            r"\sqrt{\Delta} = \sqrt{-4(\sqrt6-\sqrt2)^2}"
            r" = i\sqrt{4(\sqrt6-\sqrt2)^2} = 2i(\sqrt6-\sqrt2)",
            font_size=34,
        ).next_to(rappel, DOWN, buff=0.6)
        self.play(Write(r1))
        self.legende(
            "On sort le signe moins avec i (i² = −1), puis on sort le carré :",
            "racine de 4X² = 2X, car X = √6 − √2 est POSITIF (6 > 2).",
        )
        self.pose(3.4)

        self.etape("q2-substituer")
        self.play(FadeOut(rappel), r1.animate.to_edge(LEFT, buff=0.7).to_edge(UP, buff=1.35))
        r2 = MathTex(
            r"z = \dfrac{-b \pm \sqrt\Delta}{2a}"
            r" = \dfrac{2(\sqrt2+\sqrt6) \pm 2i(\sqrt6-\sqrt2)}{2}",
            font_size=34,
        ).next_to(r1, DOWN, aligned_edge=LEFT, buff=0.5)
        self.play(Write(r2))
        self.legende(
            "La formule des racines : (−b ± racine de Delta) sur 2a. Ici",
            "−b = 2(√2+√6) (b était négatif), et 2a = 2×1 = 2.",
        )
        self.pose(3.4)

        self.etape("q2-simplifier")
        r3 = MathTex(
            r"z = (\sqrt2+\sqrt6) \pm i(\sqrt6-\sqrt2)", font_size=38,
            color=BAC_ACCENT_STRONG,
        ).next_to(r2, DOWN, aligned_edge=LEFT, buff=0.5)
        self.play(Write(r3))
        self.legende("On simplifie : chaque terme du numérateur se divise par 2.")
        self.pose(2.8)

        self.etape("q2-solutions")
        self.play(FadeOut(r1), FadeOut(r2), FadeOut(r3))
        sols = MathTex(
            r"S = \left\{\, (\sqrt2+\sqrt6) - i(\sqrt6-\sqrt2)\ ;\ ",
            r"(\sqrt2+\sqrt6) + i(\sqrt6-\sqrt2)",
            r"\,\right\}",
            font_size=36, color=BAC_ACCENT,
        ).to_edge(LEFT, buff=0.7).shift(0.3 * UP)
        self.play(Write(sols, run_time=1.8))
        self.legende(
            "Deux solutions conjuguées : même partie réelle √2+√6, parties",
            "imaginaires opposées. Question 1 terminée — 1 point.",
        )
        self.pose(3.0)

        self.etape("q2-retenir")
        sol_box = SurroundingRectangle(
            sols[1], color=BAC_WARNING, buff=0.1, corner_radius=0.08
        )
        self.play(Create(sol_box))
        self.legende(
            "Retiens la racine à partie imaginaire POSITIVE. Elle va",
            "réapparaître, sous le nom a, à la question suivante.",
        )
        self.pose(3.2)
        self.efface_legende()
        # sols[1] (la racine retenue) reste VIVANTE à l'écran — elle se
        # transformera en la définition de a au chapitre suivant (continuité,
        # même procédé que z1 → A dans le pilote bk-2018-n-x2).
        self.play(FadeOut(VGroup(badge, sols[0], sols[2], sol_box)))
        self.play(sols[1].animate.set_color(BAC_INK).to_edge(UP, buff=1.3))
        self._sol_retenue = sols[1]

    # ── Transition : trois nouveaux nombres + le plan complexe ─────
    def chapitre_plan(self):
        self.etape("plan-abc")
        piege = Text(
            "Attention : nouveaux a, b, c — pas les coefficients de (E) !",
            font_size=24, color=BAC_ERROR,
        ).to_edge(UP, buff=1.9)
        self.play(FadeIn(piege, shift=0.1 * DOWN))
        a_def = MathTex(
            r"a = (\sqrt6+\sqrt2)+i(\sqrt6-\sqrt2)", font_size=38, color=COL_A,
        ).next_to(piege, DOWN, buff=0.5)
        self.play(ReplacementTransform(self._sol_retenue, a_def))
        b_def = MathTex(r"b = 1+i\sqrt3", font_size=38, color=COL_B).next_to(
            a_def, DOWN, aligned_edge=LEFT, buff=0.4
        )
        c_def = MathTex(r"c = \sqrt2+i\sqrt2", font_size=38, color=COL_C).next_to(
            b_def, DOWN, aligned_edge=LEFT, buff=0.4
        )
        self.play(Write(b_def), Write(c_def))
        self.legende(
            "Trois NOUVEAUX nombres, aussi nommés a, b, c — même lettres que",
            "les coefficients de (E), objets différents. Et a est EXACTEMENT",
            "la racine gardée à la question précédente : rien n'est perdu.",
        )
        self.pose(3.8)
        # Carte de référence : réduite, posée SOUS le bandeau de question,
        # et déclarée à l'ardoise (epingle) pour que rien ne s'écrive dessus.
        self.play(FadeOut(piege), VGroup(a_def, b_def, c_def).animate.scale(0.62)
                  .to_edge(LEFT, buff=0.55).to_edge(UP, buff=1.05))
        self._abc_defs = VGroup(a_def, b_def, c_def)
        self.epingle(self._abc_defs)

        self.etape("plan-axes")
        plan = ComplexPlane(
            x_range=[-1, 4.8, 1],
            y_range=[-1, 2.8, 1],
            x_length=5.8,
            y_length=3.8,
            background_line_style={
                "stroke_color": BAC_BORDER, "stroke_width": 1, "stroke_opacity": 0.8,
            },
            axis_config={
                "stroke_color": BAC_INK_MUTED, "stroke_width": 2,
                "include_ticks": False, "include_tip": False,
            },
        ).shift(2.0 * RIGHT + 0.1 * UP)
        o_lbl = MathTex("O", font_size=28, color=BAC_INK_SOFT).next_to(
            plan.n2p(0), DOWN + LEFT, buff=0.1
        )
        self.play(Create(plan, run_time=2.0), FadeIn(o_lbl))
        self.legende(
            "Le plan complexe : axe horizontal = partie réelle, axe",
            "vertical = partie imaginaire. Chaque nombre devient un point.",
        )
        self.pose(2.8)
        self._plan = plan

        self.etape("plan-points-bc")
        b_dot = Dot(plan.n2p(B_AFF), color=COL_B, radius=0.07)
        b_lbl = MathTex("b", font_size=30, color=COL_B).next_to(b_dot, UP, buff=0.12)
        c_dot = Dot(plan.n2p(C_AFF), color=COL_C, radius=0.07)
        c_lbl = MathTex("c", font_size=30, color=COL_C).next_to(c_dot, UP + RIGHT, buff=0.1)
        self.play(FadeIn(b_dot, scale=1.6), Write(b_lbl))
        self.play(FadeIn(c_dot, scale=1.6), Write(c_lbl))
        self.legende("Voici b et c, placés à leurs coordonnées exactes.")
        self.pose(2.6)
        self._b_dot, self._b_lbl, self._c_dot, self._c_lbl = b_dot, b_lbl, c_dot, c_lbl

        self.etape("plan-conjugue")
        cbar_dot = Dot(plan.n2p(C_AFF.conjugate()), color=BAC_INK_MUTED, radius=0.06)
        # c̄ est le point le plus BAS de la figure : étiquette LATÉRALE
        # (jamais en dessous, pour ne pas sortir de la région figure).
        cbar_lbl = MathTex(r"\bar c", font_size=28, color=BAC_INK_MUTED).next_to(
            cbar_dot, RIGHT, buff=0.12
        )
        miroir = DashedLine(
            plan.n2p(C_AFF), plan.n2p(C_AFF.conjugate()), color=BAC_INK_MUTED, stroke_width=2
        )
        self.play(FadeIn(cbar_dot), Write(cbar_lbl), Create(miroir))
        self.legende(
            "Que SIGNIFIE le conjugué ? Le REFLET dans l'axe réel : même",
            "partie réelle, partie imaginaire opposée. c̄ est le miroir de c.",
        )
        self.pose(3.4)
        self.play(FadeOut(miroir))
        self._cbar_dot, self._cbar_lbl = cbar_dot, cbar_lbl
        self.efface_legende()

    # ── Q2 a) : vérifier b·c̄ = a, en déduire ac = 4b ────────────────
    def chapitre_q3(self):
        badge = self.bandeau_question("2) a)", "0,75 pt")
        self.ardoise()
        plan = self._plan

        self.etape("q3-conjugue-calcul")
        m1 = MathTex(r"\bar c = \sqrt2 - i\sqrt2", font_size=40)
        self.ecrit(m1)
        self.legende(
            "c̄, le conjugué : on garde la partie réelle, on change le",
            "signe de la partie imaginaire — le point c̄, déjà tracé.",
        )
        self.pose(2.8)

        self.etape("q3-produit")
        m2 = MathTex(
            r"b\bar c = (1+i\sqrt3)(\sqrt2-i\sqrt2)"
            r" = \sqrt2 - i\sqrt2 + i\sqrt6 - i^2\sqrt6",
            font_size=32,
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "On développe le produit terme à terme : 1×√2, 1×(−i√2),",
            "i√3×√2 = i√6, i√3×(−i√2) = −i²√6.",
        )
        self.pose(3.4)

        self.etape("q3-reduire")
        m3 = MathTex(
            r"b\bar c = (\sqrt2+\sqrt6) + i(\sqrt6-\sqrt2) = ", "a",
            font_size=36,
        )
        m3[1].set_color(COL_A)
        self.ecrit(m3, buff=0.5)
        box_a = self.entoure(m3[1], COL_A)
        self.legende(
            "−i² = +1 : le dernier terme redevient réel, √6. On regroupe :",
            "on retrouve EXACTEMENT a. La vérification est faite.",
        )
        self.pose(3.4)
        a_dot = Dot(plan.n2p(A_AFF), color=COL_A, radius=0.075)
        a_lbl = MathTex("a", font_size=30, color=COL_A).next_to(a_dot, UP, buff=0.12)
        self.play(FadeIn(a_dot, scale=1.6), Write(a_lbl))
        self.pose(2.2)
        self.nettoie(garder=1)
        self.play(FadeOut(box_a))
        self._a_dot, self._a_lbl = a_dot, a_lbl

        self.etape("q3-sens-module")
        seg = Line(plan.n2p(0), plan.n2p(C_AFF), color=BAC_WARNING, stroke_width=4)
        seg_lbl = MathTex("|c|", font_size=28, color=BAC_WARNING).next_to(
            seg.get_center(), UP + LEFT, buff=0.1
        )
        self.play(Create(seg), Write(seg_lbl))
        self.legende(
            "Que SIGNIFIE le module ? La DISTANCE de O au point — la",
            "longueur du segment doré, ici de O à c.",
        )
        self.pose(3.2)

        self.etape("q3-outil-zzbar")
        outil = MathTex(r"z\,\bar z = |z|^2", font_size=40).next_to(
            m3, DOWN, buff=0.6, aligned_edge=LEFT
        )
        cadre_outil = SurroundingRectangle(outil, color=BAC_ACCENT, buff=0.2, corner_radius=0.1)
        self.play(Write(outil), Create(cadre_outil))
        self.legende(
            "L'outil : un nombre fois son conjugué vaut son module au",
            "carré. On va l'utiliser pour c, dont on vient de tracer |c|.",
        )
        self.pose(3.2)

        self.etape("q3-deduire")
        self.play(FadeOut(VGroup(outil, cadre_outil)))
        m4 = MathTex(r"b\bar c = a \Longrightarrow b\bar c\,c = ac", font_size=36)
        self.ecrit(m4, buff=0.6)
        m5 = MathTex(
            r"\bar c\,c = |c|^2 = (\sqrt2)^2+(\sqrt2)^2 = 4"
            r"\ \Longrightarrow\ ", "ac = 4b",
            font_size=36,
        )
        m5[1].set_color(BAC_SUCCESS)
        self.ecrit(m5, buff=0.5)
        box_ac = self.entoure(m5[1], BAC_SUCCESS)
        self.legende(
            "On multiplie les deux membres par c. Et c̄c = |c|² = 2+2 = 4,",
            "donc 4b = ac. Résultat démontré, sans nouveau calcul lourd.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.play(FadeOut(box_ac))
        self.nettoie()
        self.play(FadeOut(VGroup(badge, seg, seg_lbl)))

    # ── Q2 b) : formes trigonométriques de b et c ───────────────────
    def chapitre_q4(self):
        badge = self.bandeau_question("2) b)", "0,5 pt")
        self.ardoise()
        plan = self._plan

        self.etape("q4-module-b")
        seg_b = Line(plan.n2p(0), plan.n2p(B_AFF), color=BAC_WARNING, stroke_width=4)
        m1 = MathTex(
            r"|b| = \sqrt{1^2+(\sqrt3)^2} = \sqrt{1+3} = \sqrt4 = 2", font_size=36,
        )
        self.play(Create(seg_b))
        self.ecrit(m1)
        self.legende(
            "Même geste que pour c : la distance de O à b. Racine de la",
            "somme des carrés : 1 + 3 = 4, racine 4 = 2.",
        )
        self.pose(3.2)

        self.etape("q4-sens-argument")
        axe = Line(plan.n2p(0), plan.n2p(2.2))
        ob = Line(plan.n2p(0), plan.n2p(B_AFF))
        ang_b = Angle(axe, ob, radius=0.55, color=BAC_ACCENT, stroke_width=3)
        ang_b_lbl = MathTex(r"\theta_b", font_size=26, color=BAC_ACCENT).next_to(
            ang_b, UP + RIGHT, buff=0.06
        )
        self.play(Create(ang_b), FadeIn(ang_b_lbl))
        self.legende(
            "Que SIGNIFIE l'argument ? L'ANGLE θ mesuré depuis l'axe réel",
            "positif, en tournant vers le point — ici vers b.",
        )
        self.pose(3.4)

        self.etape("q4-calcul-argument-b")
        m2 = MathTex(
            r"\cos\theta_b=\tfrac12,\ \sin\theta_b=\tfrac{\sqrt3}{2}"
            r"\ \Longrightarrow\ \theta_b=\dfrac{\pi}{3}",
            font_size=34,
        )
        self.ecrit(m2, buff=0.5)
        ang_b_lbl2 = MathTex(r"\tfrac{\pi}{3}", font_size=24, color=BAC_ACCENT).move_to(ang_b_lbl)
        self.play(ReplacementTransform(ang_b_lbl, ang_b_lbl2))
        self.legende(
            "cos θ_b = partie réelle / module = 1/2 ; sin θ_b = √3/2 /... ",
            "= √3/2. Valeur remarquable : θ_b = π/3.",
        )
        self.pose(3.4)

        self.etape("q4-trig-b")
        m3 = MathTex(
            r"b = 2\left(\cos\dfrac{\pi}{3}+i\sin\dfrac{\pi}{3}\right)",
            font_size=38, color=COL_B,
        )
        self.ecrit(m3, buff=0.5)
        self.legende("Forme trigonométrique de b : module 2, argument π/3.")
        self.pose(3.0)
        self.nettoie()
        self.play(FadeOut(VGroup(seg_b, ang_b, ang_b_lbl2)))

        self.etape("q4-calcul-c")
        seg_c = Line(plan.n2p(0), plan.n2p(C_AFF), color=BAC_WARNING, stroke_width=4)
        oc = Line(plan.n2p(0), plan.n2p(C_AFF))
        ang_c = Angle(axe, oc, radius=0.5, color=BAC_ACCENT, stroke_width=3)
        ang_c_lbl = MathTex(r"\tfrac{\pi}{4}", font_size=24, color=BAC_ACCENT).next_to(
            ang_c, UP + RIGHT, buff=0.06
        )
        m4 = MathTex(
            r"|c| = 2\ \text{(déjà trouvé)},\quad"
            r"\cos\theta_c=\tfrac{\sqrt2}{2},\ \sin\theta_c=\tfrac{\sqrt2}{2}"
            r"\ \Longrightarrow\ \theta_c=\dfrac{\pi}{4}",
            font_size=30,
        )
        self.play(Create(seg_c), Create(ang_c), FadeIn(ang_c_lbl))
        self.ecrit(m4, buff=0.55)
        self.legende(
            "|c| = 2, déjà calculé en 2)a). Parties réelle et imaginaire",
            "égales et positives : argument remarquable π/4.",
        )
        self.pose(3.6)

        self.etape("q4-trig-c")
        m5 = MathTex(
            r"c = 2\left(\cos\dfrac{\pi}{4}+i\sin\dfrac{\pi}{4}\right)",
            font_size=38, color=COL_C,
        )
        self.ecrit(m5, buff=0.5)
        self.legende(
            "Forme trigonométrique de c : module 2, argument π/4.",
            "0,5 point pour les deux formes.",
        )
        self.pose(3.4)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, seg_c, ang_c, ang_c_lbl)))

    # ── Q2 c) : en déduire la forme trigonométrique de a ────────────
    def chapitre_q5(self):
        badge = self.bandeau_question("2) c)", "0,5 pt")
        self.ardoise()
        plan = self._plan

        self.etape("q5-outil-quotient")
        depart = MathTex(r"ac=4b\ \Longrightarrow\ a = \dfrac{4b}{c}", font_size=38)
        self.ecrit(depart)
        outil = MathTex(
            r"\left|\dfrac{Z_1}{Z_2}\right| = \dfrac{|Z_1|}{|Z_2|}"
            r"\qquad \arg\dfrac{Z_1}{Z_2} = \arg Z_1 - \arg Z_2",
            font_size=32,
        ).next_to(depart, DOWN, buff=0.55)
        cadre = SurroundingRectangle(outil, color=BAC_ACCENT, buff=0.18, corner_radius=0.1)
        self.play(Write(outil), Create(cadre))
        self.legende(
            "Nouvel outil : le module d'un quotient est le quotient des",
            "modules ; son argument est la DIFFÉRENCE des arguments.",
        )
        self.pose(3.6)
        self.play(FadeOut(VGroup(outil, cadre)))

        self.etape("q5-module")
        m1 = MathTex(
            r"|a| = \dfrac{4\,|b|}{|c|} = \dfrac{4\times2}{2} = 4", font_size=38,
        )
        self.ecrit(m1, buff=0.55)
        self.legende(
            "Le facteur réel positif 4 devant b ne change rien au module :",
            "4×2 = 8, puis 8/2 = 4. Le module de a vaut 4.",
        )
        self.pose(3.2)

        self.etape("q5-argument")
        m2 = MathTex(
            r"\arg(a) = \arg(4b)-\arg(c) = \dfrac{\pi}{3}-\dfrac{\pi}{4}"
            r" = \dfrac{4\pi-3\pi}{12} = \dfrac{\pi}{12}",
            font_size=32,
        )
        self.ecrit(m2, buff=0.55)
        self.legende(
            "Ni l'argument : arg(4b) = arg(b) = π/3. On met au même",
            "dénominateur 12 : 4π − 3π = π, d'où π/12.",
        )
        self.pose(3.6)

        self.etape("q5-trig-a")
        m3 = MathTex(
            r"a = 4\left(\cos\dfrac{\pi}{12}+i\sin\dfrac{\pi}{12}\right)",
            font_size=40, color=COL_A,
        )
        self.ecrit(m3, buff=0.6)
        seg_a = Line(plan.n2p(0), plan.n2p(A_AFF), color=BAC_WARNING, stroke_width=4)
        axe = Line(plan.n2p(0), plan.n2p(2.2))
        oa = Line(plan.n2p(0), plan.n2p(A_AFF))
        ang_a = Angle(axe, oa, radius=0.4, color=BAC_ACCENT, stroke_width=3)
        self.play(Create(seg_a), Create(ang_a))
        self.legende(
            "Module 4, argument π/12 — on retrouve, sur le point a déjà",
            "placé, un segment plus long et un angle plus petit qu'avant.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, seg_a, ang_a)))

    # ── Q3 a) : le plan se peuple, puis vérifier z' = ¼ a z ─────────
    def chapitre_q6(self):
        self.ardoise()
        plan = self._plan

        self.etape("q6-points-BCD")
        stem = Text(
            "Le plan se complète : B, C, D d'affixes b, c, d.",
            font_size=24, color=BAC_INK_SOFT,
        ).to_edge(UP, buff=1.3).to_edge(LEFT, buff=0.7)
        self.play(FadeIn(stem, shift=0.1 * DOWN))
        B_lbl = MathTex("B(b)", font_size=30, color=COL_B).move_to(self._b_lbl)
        C_lbl = MathTex("C(c)", font_size=30, color=COL_C).move_to(self._c_lbl)
        self.play(
            ReplacementTransform(self._b_lbl, B_lbl),
            ReplacementTransform(self._c_lbl, C_lbl),
        )
        self.legende(
            "b et c deviennent officiellement les points B et C. D, lui,",
            "a pour affixe a puissance 4 — on le calculera à la question d).",
        )
        self.pose(3.4)
        self._B_lbl, self._C_lbl = B_lbl, C_lbl
        self.play(FadeOut(stem))

        badge = self.bandeau_question("3) a)", "0,5 pt")
        self.etape("q6-outil-rotation")
        outil = MathTex(
            r"R(O,\theta):\ z \longmapsto z' = e^{i\theta}z,\qquad \theta=\dfrac{\pi}{12}",
            font_size=36,
        )
        self.ecrit(outil, buff=0.6)
        cadre = SurroundingRectangle(outil, color=BAC_ACCENT, buff=0.2, corner_radius=0.1)
        self.play(Create(cadre))
        self.legende(
            "L'outil : une rotation de centre O et d'angle θ MULTIPLIE",
            "l'affixe par e^{iθ}. Distance à O conservée, angle augmenté de θ.",
        )
        self.pose(3.6)

        self.etape("q6-verifier-quart-a")
        m1 = MathTex(
            r"\dfrac14\,a = \dfrac14\times4\left(\cos\dfrac{\pi}{12}+i\sin\dfrac{\pi}{12}\right)"
            r" = \cos\dfrac{\pi}{12}+i\sin\dfrac{\pi}{12} = e^{i\pi/12}",
            font_size=30,
        )
        self.ecrit(m1, buff=0.55)
        self.legende(
            "Un quart de a : le module 4 devient 1, l'argument π/12 ne",
            "bouge pas. Exactement e^{iπ/12} — module 1, même argument.",
        )
        self.pose(3.8)

        self.etape("q6-conclusion")
        m2 = MathTex(
            r"\dfrac14\,a = e^{i\pi/12}\ \Longrightarrow\ z' = e^{i\pi/12}z = \dfrac14\,az",
            font_size=36, color=BAC_SUCCESS,
        )
        self.ecrit(m2, buff=0.55)
        self.legende(
            "¼a joue le rôle de e^{iθ} : la rotation s'écrit bien",
            "z' = ¼ a z — 0,5 point.",
        )
        self.pose(3.4)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, cadre)))

    # ── Q3 b) : l'image de C par R — la rotation, à l'écran ─────────
    def chapitre_q7(self):
        badge = self.bandeau_question("3) b)", "0,25 pt")
        self.ardoise()
        plan = self._plan
        origine = plan.n2p(0)

        self.etape("q7-formule")
        m1 = MathTex(
            r"\text{affixe de } R(C) = \dfrac14\,a\,c", font_size=38,
        )
        self.ecrit(m1)
        self.legende(
            "On applique la formule de 3)a) au point C : z devient c.",
        )
        self.pose(2.8)

        self.etape("q7-reutiliser")
        m2 = MathTex(
            r"\dfrac14\,(ac) = \dfrac14\,(4b) = b", font_size=36,
        )
        self.ecrit(m2, buff=0.55)
        self.legende(
            "On relit un résultat déjà acquis, sans nouveau calcul :",
            "a c = 4 b, démontré en 2)a). Donc l'image de C a pour affixe b.",
        )
        self.pose(3.6)

        self.etape("q7-animer-rotation")
        rayon = float(np.linalg.norm(plan.n2p(C_AFF) - origine))
        angle_c = float(np.angle(C_AFF))
        arc = Arc(
            radius=rayon, start_angle=angle_c, angle=PI / 12,
            arc_center=origine, color=BAC_ACCENT_LIGHT, stroke_width=3,
        )
        mover = Dot(plan.n2p(C_AFF), color=BAC_ACCENT_LIGHT, radius=0.08)
        self.play(Create(arc, run_time=2.6), MoveAlongPath(mover, arc, run_time=2.6))
        self.legende(
            "Le rôle de l'animation : VOIR tourner C, d'un angle π/12,",
            "à distance constante de O. Il arrive exactement sur B.",
        )
        self.pose(3.0)
        self.play(FadeOut(mover))

        self.etape("q7-angle-visuel")
        oc = Line(origine, plan.n2p(C_AFF), color=BAC_WARNING, stroke_width=3)
        ob = Line(origine, plan.n2p(B_AFF), color=BAC_WARNING, stroke_width=3)
        ang = Angle(oc, ob, radius=0.55, other_angle=False, color=BAC_ACCENT, stroke_width=3)
        milieu = ang.point_from_proportion(0.5)
        direction = (milieu - origine) / np.linalg.norm(milieu - origine)
        ang_lbl = MathTex(r"\tfrac{\pi}{12}", font_size=24, color=BAC_ACCENT).move_to(
            milieu + 0.4 * direction
        )
        self.play(Create(oc), Create(ob))
        self.play(Create(ang), FadeIn(ang_lbl))
        self.legende(
            "L'angle de la rotation, entre OC et OB : π/12, exactement.",
            "Et OC = OB (même longueur dorée) — la rotation conserve",
            "la distance à O.",
        )
        self.pose(3.6)
        self.play(FadeOut(arc))

        self.etape("q7-conclusion")
        self.nettoie(garder=1)
        m3 = MathTex(r"R(C) = B", font_size=44, color=BAC_SUCCESS).move_to(m2)
        self.play(FadeOut(m2), FadeIn(m3))
        self.legende("L'image de C par la rotation R est le point B — 0,25 point.")
        self.pose(3.2)
        self.efface_legende()
        self.play(FadeOut(m3), FadeOut(badge))
        self._oc, self._ob, self._ang, self._ang_lbl = oc, ob, ang, ang_lbl

    # ── Q3 c) : nature du triangle OBC ──────────────────────────────
    def chapitre_q8(self):
        badge = self.bandeau_question("3) c)", "0,25 pt")
        self.ardoise()
        plan = self._plan
        oc, ob = self._oc, self._ob

        self.etape("q8-rappel")
        m1 = MathTex(
            r"R(C)=B,\ R\ \text{rotation de centre } O"
            r"\ \Longrightarrow\ OC = OB\ \text{et}\ (\overrightarrow{OC},\overrightarrow{OB})\equiv\dfrac{\pi}{12}",
            font_size=28,
        )
        self.ecrit(m1, buff=0.55)
        self.play(VGroup(oc, ob).animate.set_stroke(width=5))
        self.legende(
            "Rien à recalculer : une rotation de centre O conserve les",
            "distances à O (OC = OB, les deux segments dorés) et les",
            "angles (l'angle en O reste π/12, déjà tracé).",
        )
        self.pose(3.8)
        self.play(VGroup(oc, ob).animate.set_stroke(width=3))

        self.etape("q8-triangle")
        bc = Line(plan.n2p(B_AFF), plan.n2p(C_AFF), color=BAC_INK, stroke_width=3)
        self.play(Create(bc))
        m2 = MathTex(
            r"OC=OB\ \text{et}\ \dfrac{\pi}{12}\neq\dfrac{\pi}{2}"
            r"\ \Longrightarrow\ OBC\ \text{isocèle en } O,\ \text{non rectangle}",
            font_size=28, color=BAC_SUCCESS,
        )
        self.ecrit(m2, buff=0.55)
        self.play(VGroup(oc, ob, bc).animate.set_color(BAC_SUCCESS), run_time=1.0)
        self.legende(
            "Deux côtés issus de O égaux : isocèle en O. L'angle au sommet,",
            "π/12, n'est pas droit — pas rectangle. 0,25 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, self._ang, self._ang_lbl)))
        self._bc = bc

    # ── Q3 d) : a⁴ = 128 b, et l'alignement de O, B, D ──────────────
    def chapitre_q9(self):
        badge = self.bandeau_question("3) d)", "0,75 pt")
        self.ardoise()
        plan = self._plan
        self.play(FadeOut(VGroup(self._oc, self._ob, self._bc)))

        self.etape("q9-outil-puissance")
        outil = MathTex(
            r"|z^n| = |z|^n \qquad \arg(z^n) = n\arg(z)", font_size=36,
        )
        self.ecrit(outil)
        cadre = SurroundingRectangle(outil, color=BAC_ACCENT, buff=0.2, corner_radius=0.1)
        self.play(Create(cadre))
        self.legende(
            "Nouvel outil : élever à la puissance n élève le module à la",
            "puissance n, et multiplie l'argument par n.",
        )
        self.pose(3.4)
        self.play(FadeOut(cadre))

        self.etape("q9-calcul-module-arg")
        m1 = MathTex(
            r"|a^4| = |a|^4 = 4^4 = 256, \qquad"
            r"\arg(a^4) = 4\arg(a) = 4\times\dfrac{\pi}{12} = \dfrac{\pi}{3}",
            font_size=28,
        )
        self.ecrit(m1, buff=0.55)
        self.legende(
            "4 au carré = 16, 16 au carré = 256 : module 256. Et",
            "4π/12 se simplifie en π/3 : argument π/3.",
        )
        self.pose(3.6)

        self.etape("q9-forme-algebrique")
        m2 = MathTex(
            r"a^4 = 256\left(\cos\dfrac{\pi}{3}+i\sin\dfrac{\pi}{3}\right)"
            r" = 256\left(\dfrac12+i\dfrac{\sqrt3}{2}\right) = 128+128i\sqrt3",
            font_size=26,
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "Angle remarquable π/3 : cos = 1/2, sin = √3/2. Puis",
            "256×1/2 = 128, et 256×√3/2 = 128√3.",
        )
        self.pose(3.6)

        self.etape("q9-facteur-b")
        m3 = MathTex(
            r"a^4 = 128\left(1+i\sqrt3\right) = 128\,", "b", font_size=34,
        )
        m3[1].set_color(COL_B)
        self.ecrit(m3, buff=0.5)
        box_b = self.entoure(m3[1], COL_B)
        self.legende(
            "128 en facteur commun : on reconnaît 1 + i√3, exactement b.",
        )
        self.pose(3.2)
        self.nettoie(garder=1)
        self.play(FadeOut(box_b))

        self.etape("q9-vecteurs")
        m4 = MathTex(
            r"d = a^4 = 128b\ \Longrightarrow\ \overrightarrow{OD} = 128\,\overrightarrow{OB}",
            font_size=32,
        )
        self.ecrit(m4, buff=0.6)
        self.legende(
            "d = a puissance 4, donné dans l'énoncé. 128 est un",
            "coefficient RÉEL entre les deux vecteurs issus de O : ils",
            "pointent dans la même direction.",
        )
        self.pose(3.8)

        self.etape("q9-alignement-visuel")
        origine = plan.n2p(0)
        direction = B_AFF / abs(B_AFF)
        rayon_ray = DashedLine(
            origine, plan.n2p(3.1 * direction), color=BAC_INK_MUTED, stroke_width=2
        )
        d_pt = plan.n2p(3.05 * direction)
        d_dot = Dot(d_pt, color=BAC_SUCCESS, radius=0.07)
        d_lbl = MathTex("D", font_size=28, color=BAC_SUCCESS).next_to(d_dot, RIGHT, buff=0.1)
        schema_note = Text(
            "(schéma, hors échelle : OD = 128 × OB en réalité)",
            font_size=18, color=BAC_INK_MUTED,
        ).next_to(plan, DOWN, buff=0.25)
        self.play(Create(rayon_ray))
        self.play(FadeIn(d_dot, scale=1.6), Write(d_lbl), FadeIn(schema_note))
        self.legende(
            "O, B et D sont sur LA MÊME DEMI-DROITE — D est schématisé",
            "près du bord pour rester visible ; la vraie distance est 128 fois OB.",
        )
        self.pose(4.0)

        self.etape("q9-conclusion")
        m5 = MathTex(
            r"O,\ B,\ D\ \text{alignés}", font_size=42, color=BAC_SUCCESS,
        )
        self.ecrit(m5, buff=0.6)
        self.legende(
            "Deux vecteurs colinéaires issus de O : les trois points sont",
            "alignés. Démonstration terminée — 0,75 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.play(*[FadeOut(m) for m in self.mobjects])

    # ── Fermeture ─────────────────────────────────────────────────
    def chapitre_fin(self):
        self.etape("bilan")
        bilan = VGroup(
            Text("Ce qu'il faut retenir", font_size=34, color=BAC_INK),
            Text("• Vérifier une égalité : on calcule chaque membre, on compare.",
                 font_size=25, color=BAC_INK_SOFT),
            Text("• Module = distance à O · argument = angle depuis l'axe réel.",
                 font_size=25, color=BAC_INK_SOFT),
            Text("• Conjugué = reflet dans l'axe réel · z z̄ = |z|².",
                 font_size=25, color=BAC_INK_SOFT),
            Text("• Quotient et puissance : les modules se divisent / se puissancent,",
                 font_size=25, color=BAC_INK_SOFT),
            Text("  les arguments se soustraient / se multiplient.",
                 font_size=25, color=BAC_INK_SOFT),
            Text("• Rotation de centre O : on MULTIPLIE l'affixe par e^(iθ).",
                 font_size=25, color=BAC_INK_SOFT),
            Text("• Coefficient réel entre deux vecteurs issus du même point ⇒ alignement.",
                 font_size=25, color=BAC_INK_SOFT),
            Text("5 points — sujet réel, valeurs exactes du scan officiel.",
                 font_size=23, color=BAC_INK_MUTED),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.32)
        self.play(FadeIn(bilan, shift=0.2 * UP))
        self.pose(5.0)
        self.play(FadeOut(bilan))
        if self._badge_etape is not None:
            self.remove(self._badge_etape)
