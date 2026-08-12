"""Explication animée v4 — Bac 2020 SN (SExp), Exercice 1 : suites numériques.

Source de vérité : content/maths/suites-numeriques/bank.yaml, entrée
bk-2020-n-x1 (vérifiée, AlloSchool NS22F, element/109797, Exercice 1,
4 points). Suite homographique : u0 = 3/2, u_{n+1} = 2u_n/(2u_n+5).

Première scène du chantier « suites numériques » (après le chantier
« nombres complexes ») : elle fixe la convention visuelle du chantier —
la MÊME droite graduée (NumberLine) sert de fil rouge tout du long, en
région figure (droite), pendant que la colonne de travail (gauche) porte
l'algèbre. Six temps : 1) calcul direct de u1 ; 2) positivité par
récurrence — la droite gagne sa première barrière, en x=0, un minorant
qu'aucun terme ne franchit jamais ; 3a) majoration géométrique par une
suite auxiliaire de raison 2/5, avec des repères creux qui matérialisent
la borne qui se resserre ; 3b) la limite, par le théorème des gendarmes —
les termes s'accumulent contre la même barrière, qui devient le marqueur
de limite ; 4a) une suite auxiliaire v_n = 4u_n/(2u_n+3), géométrique de
raison 2/5 elle aussi, sur SA PROPRE droite graduée, avec le saut
multiplicatif ×2/5 entre termes consécutifs ; 4b) le terme général de
v_n, puis de u_n, par inversion algébrique.

Standard v4 = DESIGN.md : règle du zéro implicite (chaque geste
algébrique = une étape, un pas de la banque = une étape), couche de sens
AVANT chaque calcul (les termes vus comme des points qui avancent avant
d'être prouvés), signaling dans la formule, zones d'écran dures, carte
de référence épinglée (u0 et la récurrence), un piège classique du bac
signalé en rouge (raison |q|<1 nécessaire pour qu'une suite géométrique
tende vers 0).

Rendu : ../../render.sh scenes/maths/suites-numeriques/bk-2020-n-x1.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))

from manim import (
    Arrow,
    Create,
    Dot,
    DashedLine,
    FadeIn,
    FadeOut,
    MathTex,
    NumberLine,
    ReplacementTransform,
    Text,
    VGroup,
    Write,
    DOWN,
    LEFT,
    RIGHT,
    UP,
)

from bac_scene import BacScene
from bac_style import (
    BAC_ACCENT,
    BAC_ACCENT_LIGHT,
    BAC_ACCENT_STRONG,
    BAC_ERROR,
    BAC_INK,
    BAC_INK_MUTED,
    BAC_INK_SOFT,
    BAC_SUCCESS,
    BAC_WARNING,
)

# Identité visuelle stable du chantier « suites » (DESIGN.md §2) :
# u_n = sarcelle forte (objet principal), borne géométrique = or (outil),
# limite = vert (conclusion), v_n = sarcelle claire (suite auxiliaire,
# même famille que u_n mais une teinte plus douce). Rouge réservé au piège.
COL_U = BAC_ACCENT
COL_MAJ = BAC_WARNING
COL_LIM = BAC_SUCCESS
COL_V = BAC_ACCENT_LIGHT

# ── Valeurs exactes (bank.yaml, vérifiées) ───────────────────────────
# u0 = 3/2 (donné) ; u1 = 3/8 (question 1, calculé ci-dessous).
U0 = 3 / 2
U1 = 3 / 8
# u2 : un terme de plus, calculé par la MÊME récurrence, au-delà de ce
# que l'énoncé demande — sert seulement à FAIRE VOIR la suite avancer
# avant la démonstration (u2 = 2u1/(2u1+5) = (3/4)/(23/4) = 3/23).
U2 = 3 / 23

# Borne géométrique (3/2)(2/5)^n — question 3a. m0 = u0 (égalité au
# rang 0) ; m1, m2 calculés directement depuis la formule.
M1 = 3 / 5      # (3/2)(2/5)^1
M2 = 6 / 25     # (3/2)(2/5)^2

# Suite auxiliaire v_n = 4u_n/(2u_n+3) — question 4a. Valeurs exactes
# obtenues à partir de u0, u1, u2 ci-dessus, AVANT la preuve algébrique
# que (v_n) est géométrique de raison 2/5 (v0=1, v1=2/5, v2=4/25 : le
# motif ×2/5 est déjà visible dans les valeurs, la preuve vient après).
V0 = 1.0
V1 = 2 / 5
V2 = 4 / 25

# ── Disposition de la figure (région droite, DESIGN.md §1) ──────────
# Chaque droite est positionnée en alignant son PROPRE point n2p(0) sur
# un point-cible de la scène (voir `_pose_ligne` ci-dessous) — robuste,
# indépendant de la convention de centrage par défaut de NumberLine.
LINE_U_ZERO_X = 1.8   # scène x où value=0 tombe, droite de (u_n)
LINE_U_Y = 1.0         # scène y de la droite de (u_n)
LINE_V_ZERO_X = 1.5    # scène x où value=0 tombe, droite de (v_n), Q4a
LINE_V_Y = -1.0        # scène y de la droite de (v_n)
DOT_R = 0.075


def _pose_ligne(ligne, zero_x: float, y: float):
    """Aligne le point n2p(0) de la droite sur (zero_x, y) — indépendant
    de la position initiale de construction de la NumberLine."""
    ligne.shift((zero_x * RIGHT + y * UP) - ligne.n2p(0))
    return ligne


NARRATION = {
    "titre": "Exercice un du bac deux mille vingt, session normale, sciences "
    "expérimentales : suites numériques, sur quatre points.",
    "intro": "On considère la suite u, définie par u zéro égale trois demis, "
    "et par la relation de récurrence u indice n plus un égale deux u n sur "
    "deux u n plus cinq, pour tout n.",
    "plan": "Avant tout calcul, on regarde où vivent les premiers termes sur "
    "une droite graduée : u zéro, u un, u deux — un point par terme. On les "
    "voit avancer vers la gauche, vers zéro.",
    "q1": "Question un. On calcule u un en appliquant la relation de "
    "récurrence en n égale zéro.",
    "q2": "Question deux. On montre par récurrence que u n est strictement "
    "positif pour tout n : la droite gagne sa première barrière, en zéro, "
    "qu'aucun terme ne franchit jamais.",
    "q3a": "Question trois a. On majore u n plus un par deux cinquièmes de "
    "u n, puis on en déduit, par récurrence, un encadrement géométrique de "
    "u n. Des repères creux, sur la droite, montrent cette borne qui se "
    "resserre à chaque rang.",
    "q3b": "Question trois b. On calcule la limite de u n, par le théorème "
    "des gendarmes : les termes s'accumulent contre la barrière posée à la "
    "question deux, qui devient le marqueur de la limite.",
    "q4a": "Question quatre a. On introduit une suite auxiliaire, v n, égale "
    "à quatre u n sur deux u n plus trois, et on montre qu'elle est "
    "géométrique de raison deux cinquièmes — sur sa propre droite graduée, "
    "avec le saut multiplicatif entre termes consécutifs.",
    "q4b": "Question quatre b. On détermine v n en fonction de n, puis on en "
    "déduit u n en fonction de n, par inversion algébrique.",
}


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        ligne_u, u_dots = self.chapitre_plan()
        self.chapitre_q1(u_dots)
        barre = self.chapitre_q2(ligne_u, u_dots)
        self.chapitre_q3a(ligne_u, u_dots)
        self.chapitre_q3b(ligne_u, u_dots, barre)
        ligne_v, v_dots = self.chapitre_q4a(ligne_u, u_dots)
        self.chapitre_q4b(ligne_v, v_dots)
        self.chapitre_fin()

    # ── Ouverture ──────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("titre")
        self.carte_titre(
            "BAC 2020 · SESSION NORMALE · SCIENCES EXP.",
            "Suites numériques",
            "Exercice 1 — 4 points · sujet officiel NS22F",
        )

    # ── Les données de l'énoncé : u0 et la récurrence ────────────────
    def chapitre_intro(self):
        self.etape("intro-donnees")
        entete = MathTex(
            r"\text{On considère la suite numérique } (u_n)"
            r" \text{ définie par :}",
            font_size=27,
        ).shift(2.4 * UP)
        def0 = MathTex(r"u_0 = \dfrac{3}{2}", font_size=38, color=COL_U)
        def1 = MathTex(
            r"u_{n+1} = \dfrac{2u_n}{2u_n+5} \quad \text{pour tout } n \in \mathbb{N}",
            font_size=36, color=COL_U,
        )
        ligne = VGroup(def0, def1).arrange(
            DOWN, aligned_edge=LEFT, buff=0.45
        ).next_to(entete, DOWN, buff=0.7)
        self.play(Write(entete), run_time=1.2)
        self.play(FadeIn(ligne, shift=0.2 * UP), run_time=1.4)
        self.legende(
            "Une valeur de départ, et une règle pour passer d'un terme",
            "au suivant — on va les retrouver à CHAQUE question.",
        )
        self.pose(3.2)
        self.efface_legende()
        self.play(FadeOut(entete))
        self.play(
            ligne.animate.scale(0.62).to_edge(LEFT, buff=0.55).to_edge(UP, buff=1.05)
        )
        self.epingle(ligne)
        return ligne

    # ── La couche de sens : les premiers termes, vus AVANT d'être
    # calculés — une droite graduée, un point par terme (DESIGN.md §3).
    def chapitre_plan(self):
        self.etape("plan-ligne")
        ligne = NumberLine(
            x_range=[-0.35, 1.7, 0.5],
            length=6.0,
            color=BAC_INK_MUTED,
            include_numbers=False,
            include_tip=False,
            stroke_width=2,
        )
        _pose_ligne(ligne, LINE_U_ZERO_X, LINE_U_Y)
        self.play(Create(ligne), run_time=1.8)
        self.legende(
            "On place les premiers termes sur une droite graduée — un",
            "point par terme. On regarde d'abord où ils vivent.",
        )
        self.pose(3.0)

        self.etape("plan-u0")
        u0_dot = Dot(ligne.n2p(U0), color=COL_U, radius=DOT_R)
        u0_lbl = MathTex("u_0", font_size=28, color=COL_U).next_to(
            u0_dot, UP, buff=0.16
        )
        self.play(FadeIn(u0_dot, scale=1.6), Write(u0_lbl))
        self.legende("u0 = 3/2 : le point de départ.")
        self.pose(2.6)

        self.etape("plan-u1")
        u1_dot = Dot(ligne.n2p(U1), color=COL_U, radius=DOT_R)
        u1_lbl = MathTex("u_1", font_size=28, color=COL_U).next_to(
            u1_dot, UP, buff=0.16
        )
        self.play(FadeIn(u1_dot, scale=1.6), Write(u1_lbl))
        self.legende(
            "u1 = 3/8 : déjà plus près de zéro — on le calculera dans",
            "un instant (question 1).",
        )
        self.pose(3.0)

        self.etape("plan-u2")
        u2_dot = Dot(ligne.n2p(U2), color=COL_U, radius=DOT_R)
        u2_lbl = MathTex("u_2", font_size=28, color=COL_U).next_to(
            u2_dot, UP, buff=0.16
        )
        self.play(FadeIn(u2_dot, scale=1.6), Write(u2_lbl))
        self.legende(
            "u2 = 3/23 : un pas de plus — les points AVANCENT vers la",
            "gauche, vers zéro. On va le démontrer, pas seulement le voir.",
        )
        self.pose(3.6)
        self.efface_legende()

        return ligne, {"u0": u0_dot, "u1": u1_dot, "u2": u2_dot}

    # ── Q1 : calculer u1 ──────────────────────────────────────────────
    def chapitre_q1(self, u_dots):
        badge = self.bandeau_question("1)", "0,25 pt")
        self.ardoise()

        self.etape("q1-enonce")
        but = MathTex(r"\text{Calculer } u_1", font_size=38)
        self.ecrit(but)
        self.legende(
            "Un seul geste : appliquer la relation de récurrence en",
            "remplaçant n par zéro.",
        )
        self.pose(2.8)

        self.etape("q1-substitution")
        m1 = MathTex(r"u_1 = \dfrac{2u_0}{2u_0+5}", font_size=36)
        self.ecrit(m1, buff=0.55)
        self.legende("On applique la relation de récurrence en n = 0.")
        self.pose(2.8)

        self.etape("q1-calcul")
        m2 = MathTex(
            r"u_1 = \dfrac{2\times\frac{3}{2}}{2\times\frac{3}{2}+5}"
            r" = \dfrac{3}{3+5} = \dfrac{3}{8}",
            font_size=30,
        )
        self.ecrit(m2, buff=0.5)
        self.legende("On remplace u0 par 3/2, puis on simplifie.")
        self.pose(3.2)

        self.etape("q1-conclusion")
        concl = MathTex(r"u_1 = \dfrac{3}{8}", font_size=42, color=BAC_ACCENT_STRONG)
        self.ecrit(concl, buff=0.55)
        cadre = self.entoure(u_dots["u1"], BAC_ACCENT_STRONG, buff=0.14)
        self.legende(
            "u1 = 3/8 : exactement le point déjà placé sur la droite.",
            "0,25 point.",
        )
        self.pose(3.4)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, cadre)))

    # ── Q2 : positivité par récurrence ────────────────────────────────
    def chapitre_q2(self, ligne_u, u_dots):
        badge = self.bandeau_question("2)", "0,5 pt")
        self.ardoise()

        self.etape("q2-enonce")
        but = MathTex(
            r"\text{Montrer par récurrence que, pour tout } n,\ u_n > 0",
            font_size=32,
        )
        self.ecrit(but)
        self.legende(
            "Une propriété vraie pour TOUS les rangs : le bon outil est",
            "le raisonnement par récurrence.",
        )
        self.pose(3.2)

        self.etape("q2-sens-borne")
        bas = ligne_u.n2p(0) + 0.5 * DOWN
        haut = ligne_u.n2p(0) + 1.3 * UP
        barre_ligne = DashedLine(
            bas, haut, color=BAC_INK_MUTED, stroke_width=2.5, dash_length=0.12
        )
        barre_lbl = MathTex("0", font_size=26, color=BAC_INK_MUTED).next_to(
            bas, DOWN, buff=0.12
        )
        self.play(Create(barre_ligne, run_time=1.4))
        self.play(FadeIn(barre_lbl))
        self.legende(
            "Une barrière en zéro : si u_n > 0 pour tout n, aucun point",
            "ne la franchit jamais vers la gauche. C'est ce qu'on démontre.",
        )
        self.pose(3.6)

        self.etape("q2-initialisation")
        m1 = MathTex(r"u_0 = \dfrac{3}{2} > 0", font_size=34)
        self.ecrit(m1)
        self.legende("Initialisation : vrai au rang 0.")
        self.pose(2.6)

        self.etape("q2-hypothese")
        m2 = MathTex(
            r"u_n > 0 \implies 2u_n > 0 \implies 2u_n+5 > 5 > 0", font_size=28
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "Hypothèse de récurrence : le dénominateur du terme suivant",
            "reste strictement positif — le point délicat de l'hérédité.",
        )
        self.pose(3.4)

        self.etape("q2-heredite")
        m3 = MathTex(
            r"u_{n+1} = \dfrac{2u_n}{2u_n+5} > 0", font_size=34, color=BAC_ACCENT_STRONG
        )
        self.ecrit(m3, buff=0.55)
        self.legende(
            "Quotient de deux nombres strictement positifs : le signe",
            "se transmet, de rang en rang.",
        )
        self.pose(3.4)

        self.etape("q2-conclusion")
        self.legende(
            "Par récurrence, u_n > 0 pour tout n : aucun terme ne",
            "franchira jamais cette barrière. 0,5 point.",
        )
        self.pose(3.4)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return {"ligne": barre_ligne, "label": barre_lbl}

    # ── Q3a : majoration géométrique ──────────────────────────────────
    def chapitre_q3a(self, ligne_u, u_dots):
        badge = self.bandeau_question("3a)", "1 pt")
        self.ardoise()

        self.etape("q3a-enonce")
        but1 = MathTex(
            r"\text{Montrer que } 0 < u_{n+1} \le \dfrac{2}{5}u_n", font_size=30
        )
        but2 = MathTex(
            r"\text{puis en déduire } 0 < u_n \le \dfrac{3}{2}\left(\dfrac{2}{5}\right)^n",
            font_size=26,
        )
        self.ecrit(but1)
        self.ecrit(but2, buff=0.4)
        self.legende(
            "Deux gestes : comparer d'abord u n plus un à deux",
            "cinquièmes de u n, puis majorer u n par une suite",
            "géométrique qui se resserre à chaque rang.",
        )
        self.pose(3.8)

        self.etape("q3a-sens-majoration")
        m1_pt = ligne_u.n2p(M1) + 0.75 * UP
        m2_pt = ligne_u.n2p(M2) + 0.75 * UP
        m1_mk = Dot(
            m1_pt, radius=DOT_R, fill_opacity=0, stroke_color=COL_MAJ, stroke_width=2.5
        )
        m2_mk = Dot(
            m2_pt, radius=DOT_R, fill_opacity=0, stroke_color=COL_MAJ, stroke_width=2.5
        )
        maj_lbl = MathTex(
            r"\dfrac32\left(\dfrac25\right)^n", font_size=20, color=COL_MAJ
        ).next_to(m1_mk, UP, buff=0.16)
        self.play(FadeIn(m1_mk, scale=1.5), FadeIn(m2_mk, scale=1.5))
        self.play(FadeIn(maj_lbl))
        self.legende(
            "Ces repères creux marquent (3/2)(2/5)^n à chaque rang : une",
            "borne qui se resserre vers zéro elle aussi. Au rang 0, elle",
            "coïncide exactement avec u0.",
        )
        self.pose(4.0)

        self.etape("q3a-diviser")
        m3a = MathTex(
            r"u_n>0 \implies u_{n+1}\le\dfrac{2}{5}u_n"
            r" \iff \dfrac{2u_n}{2u_n+5}\le\dfrac{2}{5}u_n",
            font_size=23,
        )
        m3b = MathTex(
            r"\iff \dfrac{2}{2u_n+5}\le\dfrac{2}{5}", font_size=23
        )
        m3 = VGroup(m3a, m3b).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        self.ecrit(m3, buff=0.5)
        self.legende(
            "On divise par u_n, strictement positif (question 2) : le",
            "sens de l'inégalité est conservé.",
        )
        self.pose(3.8)

        self.etape("q3a-produit-croix")
        m4 = MathTex(
            r"\dfrac{2}{2u_n+5}\le\dfrac{2}{5} \iff 10\le 2(2u_n+5) \iff 0\le 4u_n",
            font_size=25,
        )
        self.ecrit(m4, buff=0.5)
        self.legende(
            "Même numérateur : on compare en produit en croix — les",
            "deux dénominateurs sont positifs.",
        )
        self.pose(3.4)

        self.etape("q3a-premier-encadrement")
        m5 = MathTex(
            r"0\le 4u_n \implies 0<u_{n+1}\le\dfrac{2}{5}u_n \quad \text{pour tout } n",
            font_size=26, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(m5, buff=0.5)
        self.legende("Vrai car u_n > 0 : le premier encadrement est établi.")
        self.pose(3.2)

        self.etape("q3a-init-deuxieme-recurrence")
        m6 = MathTex(
            r"u_0=\dfrac{3}{2}=\dfrac{3}{2}\left(\dfrac{2}{5}\right)^0", font_size=30
        )
        self.ecrit(m6, buff=0.55)
        self.legende(
            "Deuxième récurrence, sur l'encadrement géométrique :",
            "égalité au rang 0 — repère creux et point plein coïncident.",
        )
        self.pose(3.4)

        self.etape("q3a-heredite-deuxieme")
        m7a = MathTex(
            r"0<u_n\le\dfrac{3}{2}\left(\dfrac{2}{5}\right)^n \implies"
            r" u_{n+1}\le\dfrac{2}{5}u_n",
            font_size=23,
        )
        m7b = MathTex(
            r"\le\dfrac{2}{5}\times\dfrac{3}{2}\left(\dfrac{2}{5}\right)^n"
            r" =\dfrac{3}{2}\left(\dfrac{2}{5}\right)^{n+1}",
            font_size=23,
        )
        m7 = VGroup(m7a, m7b).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        self.ecrit(m7, buff=0.5)
        self.legende(
            "Hérédité : on réinjecte l'inégalité qu'on vient de montrer",
            "dans l'hypothèse de récurrence.",
        )
        self.pose(4.0)

        self.etape("q3a-conclusion")
        concl = MathTex(
            r"0 < u_n \le \dfrac{3}{2}\left(\dfrac{2}{5}\right)^n"
            r" \quad \text{pour tout } n \text{ de } \mathbb{N}",
            font_size=25, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(concl, buff=0.55)
        self.legende(
            "Par récurrence, l'encadrement géométrique est établi.",
            "1 point.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return {"m1": m1_mk, "m2": m2_mk, "label": maj_lbl}

    # ── Q3b : la limite, par le théorème des gendarmes ────────────────
    def chapitre_q3b(self, ligne_u, u_dots, barre):
        badge = self.bandeau_question("3b)", "0,5 pt")
        self.ardoise()

        self.etape("q3b-enonce")
        but = MathTex(r"\text{Calculer } \lim_{n\to+\infty} u_n", font_size=36)
        self.ecrit(but)
        self.legende(
            "On dispose d'un minorant constant, 0, et d'un majorant",
            "explicite — la suite géométrique de la question précédente.",
        )
        self.pose(3.4)

        self.etape("q3b-piege-raison")
        piege = VGroup(
            Text(
                "ATTENTION : une suite géométrique de raison q ne tend",
                font_size=19, color=BAC_ERROR,
            ),
            Text(
                "vers 0 QUE SI |q| < 1. Ici q = 2/5, donc |2/5| < 1 —",
                font_size=19, color=BAC_ERROR,
            ),
            Text(
                "il faut toujours le VÉRIFIER, jamais le supposer.",
                font_size=19, color=BAC_ERROR,
            ),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(piege, buff=0.5)
        self.legende(
            "Un piège classique du bac : une suite géométrique ne tend",
            "PAS vers 0 pour n'importe quelle raison — il faut |q| < 1.",
        )
        self.pose(4.0)

        self.etape("q3b-outil-geometrique")
        m1a = MathTex(
            r"\left|\dfrac{2}{5}\right|<1 \implies"
            r" \lim_{n\to+\infty}\left(\dfrac{2}{5}\right)^n = 0",
            font_size=24,
        )
        m1b = MathTex(
            r"\implies \lim_{n\to+\infty}\dfrac{3}{2}\left(\dfrac{2}{5}\right)^n = 0",
            font_size=24,
        )
        self.ecrit(VGroup(m1a, m1b).arrange(DOWN, aligned_edge=LEFT, buff=0.15), buff=0.5)
        self.legende(
            "Raison entre -1 et 1 — le piège qu'on vient de signaler,",
            "ici vérifié : la suite géométrique tend vers 0, et son",
            "double aussi.",
        )
        self.pose(3.8)

        self.etape("q3b-gendarmes-encadrement")
        m2a = MathTex(
            r"0 < u_n \le \dfrac{3}{2}\left(\dfrac{2}{5}\right)^n", font_size=26
        )
        m2b = MathTex(
            r"\lim_{n\to+\infty}\dfrac{3}{2}\left(\dfrac{2}{5}\right)^n = 0",
            font_size=26,
        )
        self.ecrit(VGroup(m2a, m2b).arrange(DOWN, aligned_edge=LEFT, buff=0.15), buff=0.5)
        self.legende(
            "u n est encadrée par 0 et une suite qui tend vers 0:",
            "exactement le théorème des gendarmes.",
        )
        self.pose(3.6)

        self.etape("q3b-sens-limite")
        # Point à 40 % du trajet barrière → u2 (pas au milieu) : le
        # segment barrière-u2 est court, une marge franche des deux
        # côtés évite tout effleurement du repère u2.
        zero_pt = ligne_u.n2p(0)
        milieu = zero_pt + 0.4 * (u_dots["u2"].get_center() - zero_pt)
        pointilles = MathTex(r"\cdots", font_size=16, color=BAC_INK_MUTED).move_to(
            milieu
        )
        self.play(FadeIn(pointilles))
        self.legende(
            "D'autres termes suivent, toujours plus près de zéro…",
        )
        self.pose(2.6)
        # Le pointillé s'efface AVANT le marqueur de limite : les deux
        # occupent le même espace étroit, entre u2 et la barrière — ils
        # ne coexistent jamais (pas de chevauchement possible).
        self.play(FadeOut(pointilles))

        lim_dot = Dot(zero_pt, color=COL_LIM, radius=DOT_R * 1.3)
        self.play(FadeIn(lim_dot, scale=1.6))
        nouveau_lbl = MathTex("L=0", font_size=26, color=COL_LIM).move_to(
            barre["label"]
        )
        self.play(
            ReplacementTransform(barre["label"], nouveau_lbl),
            barre["ligne"].animate.set_color(COL_LIM),
        )
        barre["label"] = nouveau_lbl
        self.legende(
            "Ils s'accumulent contre la même barrière qu'à la question 2 —",
            "elle devient le marqueur de la limite.",
        )
        self.pose(3.8)

        self.etape("q3b-conclusion")
        concl = MathTex(
            r"\lim_{n\to+\infty} u_n = 0", font_size=40, color=COL_LIM
        )
        self.ecrit(concl, buff=0.55)
        self.legende(
            "lim u_n = 0 : la limite de la suite. 0,5 point.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q4a : la suite auxiliaire (v_n), géométrique de raison 2/5 ────
    def chapitre_q4a(self, ligne_u, u_dots):
        badge = self.bandeau_question("4a)", "0,75 pt")
        self.ardoise()

        self.etape("q4a-enonce")
        defv = MathTex(
            r"v_n = \dfrac{4u_n}{2u_n+3} \quad (n \in \mathbb{N})",
            font_size=32, color=COL_V,
        )
        but = MathTex(
            r"\text{Montrer que } (v_n) \text{ est géométrique de raison } \dfrac{2}{5}",
            font_size=26,
        )
        self.ecrit(defv)
        self.ecrit(but, buff=0.5)
        self.legende(
            "Une nouvelle suite, construite à partir de u n — un rapport",
            "bien choisi. On regarde d'abord ce qu'elle vaut.",
        )
        self.pose(3.6)

        self.etape("q4a-sens-v")
        ligne_v = NumberLine(
            x_range=[-0.15, 1.15, 0.25],
            length=6.0,
            color=BAC_INK_MUTED,
            include_numbers=False,
            include_tip=False,
            stroke_width=2,
        )
        _pose_ligne(ligne_v, LINE_V_ZERO_X, LINE_V_Y)
        self.play(Create(ligne_v), run_time=1.6)
        v0_dot = Dot(ligne_v.n2p(V0), color=COL_V, radius=DOT_R)
        v0_lbl = MathTex("v_0", font_size=26, color=COL_V).next_to(
            v0_dot, DOWN, buff=0.16
        )
        v1_dot = Dot(ligne_v.n2p(V1), color=COL_V, radius=DOT_R)
        v1_lbl = MathTex("v_1", font_size=26, color=COL_V).next_to(
            v1_dot, DOWN, buff=0.16
        )
        v2_dot = Dot(ligne_v.n2p(V2), color=COL_V, radius=DOT_R)
        v2_lbl = MathTex("v_2", font_size=26, color=COL_V).next_to(
            v2_dot, DOWN, buff=0.16
        )
        self.play(FadeIn(v0_dot, scale=1.6), Write(v0_lbl))
        self.play(FadeIn(v1_dot, scale=1.6), Write(v1_lbl))
        self.play(FadeIn(v2_dot, scale=1.6), Write(v2_lbl))
        f1 = Arrow(
            ligne_v.n2p(V0) + 0.35 * UP, ligne_v.n2p(V1) + 0.35 * UP,
            buff=0.1, color=COL_V, stroke_width=2.5,
            max_tip_length_to_length_ratio=0.15,
        )
        lbl_f1 = MathTex(r"\times\tfrac25", font_size=20, color=COL_V).next_to(
            f1, UP, buff=0.08
        )
        f2 = Arrow(
            ligne_v.n2p(V1) + 0.35 * UP, ligne_v.n2p(V2) + 0.35 * UP,
            buff=0.1, color=COL_V, stroke_width=2.5,
            max_tip_length_to_length_ratio=0.15,
        )
        lbl_f2 = MathTex(r"\times\tfrac25", font_size=20, color=COL_V).next_to(
            f2, UP, buff=0.08
        )
        self.play(Create(f1), FadeIn(lbl_f1))
        self.play(Create(f2), FadeIn(lbl_f2))
        self.legende(
            "v0=1, v1=2/5, v2=4/25 : calculés depuis la définition, à",
            "partir de u0, u1, u2. Le même saut, ×2/5, semble relier",
            "chaque terme au suivant — on va le PROUVER.",
        )
        self.pose(4.2)

        self.etape("q4a-injecter-recurrence")
        m1 = MathTex(
            r"v_{n+1} = \dfrac{4u_{n+1}}{2u_{n+1}+3}, \qquad"
            r" u_{n+1}=\dfrac{2u_n}{2u_n+5}",
            font_size=24,
        )
        self.ecrit(m1, buff=0.55)
        self.legende(
            "On part de la définition de v à n+1, et on y injecte la",
            "relation de récurrence de u.",
        )
        self.pose(3.4)

        self.etape("q4a-reduire-denominateur")
        m2a = MathTex(
            r"2u_{n+1}+3 = \dfrac{4u_n}{2u_n+5}+3 = \dfrac{4u_n+3(2u_n+5)}{2u_n+5}",
            font_size=22,
        )
        m2b = MathTex(
            r"= \dfrac{10u_n+15}{2u_n+5} = \dfrac{5(2u_n+3)}{2u_n+5}", font_size=22
        )
        self.ecrit(VGroup(m2a, m2b).arrange(DOWN, aligned_edge=LEFT, buff=0.15), buff=0.5)
        self.legende(
            "On réduit le dénominateur de v à n+1 au même dénominateur,",
            "2u_n+5, puis on factorise.",
        )
        self.pose(3.8)

        self.etape("q4a-reduire-numerateur")
        m3 = MathTex(r"4u_{n+1} = \dfrac{8u_n}{2u_n+5}", font_size=32)
        self.ecrit(m3, buff=0.5)
        self.legende("De même pour le numérateur de v à n+1.")
        self.pose(2.8)

        self.etape("q4a-diviser-grands-quotients")
        m4 = MathTex(
            r"v_{n+1} = \dfrac{\frac{8u_n}{2u_n+5}}{\frac{5(2u_n+3)}{2u_n+5}}"
            r" = \dfrac{8u_n}{5(2u_n+3)}",
            font_size=26,
        )
        self.ecrit(m4, buff=0.5)
        self.legende(
            "Le dénominateur commun, 2u_n+5, se simplifie entre haut",
            "et bas du grand quotient.",
        )
        self.pose(3.4)

        self.etape("q4a-faire-reapparaitre-vn")
        m5 = MathTex(
            r"v_{n+1} = \dfrac{8}{5}\times\dfrac{u_n}{2u_n+3}"
            r" = \dfrac{2}{5}\times\dfrac{4u_n}{2u_n+3} = \dfrac{2}{5}v_n",
            font_size=22, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(m5, buff=0.55)
        self.legende(
            "On fait réapparaître v n : (v n) est bien géométrique, de",
            "raison 2/5 — exactement le saut vu sur la droite. 0,75 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return ligne_v, {"v0": v0_dot, "v1": v1_dot, "v2": v2_dot}

    # ── Q4b : terme général de (v_n), puis de (u_n) ──────────────────
    def chapitre_q4b(self, ligne_v, v_dots):
        badge = self.bandeau_question("4b)", "1 pt")
        self.ardoise()

        self.etape("q4b-enonce")
        but = MathTex(
            r"\text{Déterminer } v_n \text{ en fonction de } n,"
            r"\ \text{puis } u_n \text{ en fonction de } n",
            font_size=25,
        )
        self.ecrit(but)
        self.legende(
            "La formule explicite d'une suite géométrique donne v n",
            "directement. Il reste à inverser la définition pour isoler u n.",
        )
        self.pose(3.6)

        self.etape("q4b-v0")
        m1 = MathTex(
            r"v_0 = \dfrac{4u_0}{2u_0+3} = \dfrac{4\times\frac{3}{2}}{2\times\frac{3}{2}+3}"
            r" = \dfrac{6}{6} = 1",
            font_size=24,
        )
        self.ecrit(m1, buff=0.55)
        cadre = self.entoure(v_dots["v0"], BAC_ACCENT_STRONG, buff=0.12)
        self.legende(
            "Premier terme de la suite géométrique v — exactement le",
            "point v0 déjà placé sur sa droite.",
        )
        self.pose(3.6)
        self.play(FadeOut(cadre))

        self.etape("q4b-formule-explicite")
        m2 = MathTex(
            r"v_n = v_0\left(\dfrac{2}{5}\right)^n = \left(\dfrac{2}{5}\right)^n",
            font_size=32,
        )
        self.ecrit(m2, buff=0.5)
        self.legende("Formule explicite d'une suite géométrique, avec v0 = 1.")
        self.pose(3.0)

        self.etape("q4b-isoler-un")
        m3a = MathTex(
            r"v_n=\dfrac{4u_n}{2u_n+3} \implies v_n(2u_n+3) = 4u_n", font_size=25
        )
        m3b = MathTex(
            r"\implies 2v_nu_n+3v_n = 4u_n \implies u_n(4-2v_n) = 3v_n", font_size=25
        )
        self.ecrit(VGroup(m3a, m3b).arrange(DOWN, aligned_edge=LEFT, buff=0.15), buff=0.5)
        self.legende(
            "On repart de la définition de v n et on isole les termes",
            "en u n.",
        )
        self.pose(3.8)

        self.etape("q4b-conclusion-un")
        m4 = MathTex(
            r"u_n = \dfrac{3v_n}{4-2v_n} = \dfrac{3\left(\frac{2}{5}\right)^n}"
            r"{4-2\left(\frac{2}{5}\right)^n}",
            font_size=26, color=COL_LIM,
        )
        self.ecrit(m4, buff=0.55)
        self.legende(
            "On résout en u n, puis on remplace v n par sa valeur.",
            "1 point. Exercice terminé, quatre points au total.",
        )
        self.pose(4.4)
        self.efface_legende()
        self.play(*[FadeOut(m) for m in self.mobjects])

    # ── Fermeture ─────────────────────────────────────────────────
    def chapitre_fin(self):
        self.etape("bilan")
        bilan = VGroup(
            Text("Ce qu'il faut retenir", font_size=34, color=BAC_INK),
            Text("• Pour une propriété « pour tout n » : la récurrence,",
                 font_size=23, color=BAC_INK_SOFT),
            Text("  TOUJOURS initialisation ET hérédité.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• Majorer par une suite géométrique : le même mécanisme,",
                 font_size=23, color=BAC_INK_SOFT),
            Text("  avec une inégalité qui se resserre à chaque rang.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• Théorème des gendarmes : deux suites qui encadrent",
                 font_size=23, color=BAC_INK_SOFT),
            Text("  (u_n) et convergent vers la MÊME limite.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• Une suite géométrique de raison q ne tend vers 0",
                 font_size=23, color=BAC_INK_SOFT),
            Text("  QUE SI |q| < 1 — à toujours vérifier.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• Suite auxiliaire v_n : un rapport bien choisi qui",
                 font_size=23, color=BAC_INK_SOFT),
            Text("  redevient géométrique ; on en déduit u_n en l'inversant.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("4 points — sujet réel, valeurs exactes du scan officiel.",
                 font_size=21, color=BAC_INK_MUTED),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.24)
        self.play(FadeIn(bilan, shift=0.2 * UP))
        self.pose(5.0)
        self.play(FadeOut(bilan))
        if self._badge_etape is not None:
            self.remove(self._badge_etape)

