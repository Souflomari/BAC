"""Explication animée v4 — Bac 2021 SN (SExp), Exercice 2 : suites numériques.

Source de vérité : content/maths/suites-numeriques/bank.yaml,
entrée bk-2021-n-x2 (vérifiée, AlloSchool NS22F, element/127180,
Exercice 2, 4 points). Suite homographique définie par récurrence :

    u_0 = 1/2,   u_{n+1} = u_n / (3 - 2 u_n)   pour tout n de N.

Huit questions : 1) calculer u_1 (0,25 pt) ; 2) montrer par récurrence que
0 < u_n <= 1/2 (0,5 pt) ; 3a) montrer que u_{n+1}/u_n <= 1/2 (0,5 pt) ;
3b) en déduire la monotonie — décroissante (0,5 pt) ; 4a) montrer que
0 < u_n <= (1/2)^{n+1} par récurrence puis calculer la limite, 0 par le
théorème des gendarmes (0,75 pt) ; 4b) avec v_n = ln(3-2u_n), calculer
lim v_n = ln(3) par continuité du logarithme (0,5 pt) ; 5a) vérifier que
1/u_{n+1} - 1 = 3(1/u_n - 1) (0,5 pt) ; 5b) en déduire, via la suite
auxiliaire géométrique w_n = 1/u_n - 1 (raison 3, w_0 = 1), le terme
général u_n = 1/(1+3^n) (0,5 pt). Total : 4 points.

Standard v4 = DESIGN.md : règle du zéro implicite (chaque geste
algébrique = une étape), couche de sens AVANT chaque calcul — ici, pour
une suite, une droite graduée où les termes u_n marchent en points
colorés, une barrière verticale en pointillés pour le majorant 1/2, un
marqueur distinct pour la limite, et une droite graduée séparée pour la
suite auxiliaire géométrique w_n avec ses sauts « ×3 » — signaling dans
la formule, zones d'écran dures, carte de référence épinglée (u0 et la
relation de récurrence). Quatre pièges classiques du bac sur les suites
reçoivent chacun leur étape d'avertissement rouge dédiée : la récurrence
exige TOUJOURS initialisation ET hérédité (question 2) ; la monotonie se
justifie par un quotient (ou une différence) comparé à 1, jamais « à
l'œil » (question 3b) ; une suite géométrique de raison q ne tend vers 0
que si |q| < 1, condition à énoncer (question 4a) ; dans w_n = w_0 q^n,
ne pas confondre la raison q et le premier terme w_0 (question 5b).

Rendu : ../../render.sh scenes/maths/suites-numeriques/bk-2021-n-x2.py
"""

import sys
from pathlib import Path
from fractions import Fraction as F

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))

from manim import (
    ArcBetweenPoints,
    Arrow,
    Create,
    DashedLine,
    Dot,
    FadeIn,
    FadeOut,
    MathTex,
    NumberLine,
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
    BAC_ERROR,
    BAC_INK,
    BAC_INK_MUTED,
    BAC_INK_SOFT,
    BAC_SUCCESS,
    BAC_WARNING,
)

# Identité visuelle stable (DESIGN.md §2) : u_n = objet nº1 (sarcelle),
# w_n (suite auxiliaire, question 5) = objet nº2 (or), la barrière du
# majorant = outil du cours (sarcelle clair), la limite = conclusion
# (vert), un piège = toujours rouge, réservé à ça.
COL_U = BAC_ACCENT
COL_BOUND = BAC_ACCENT_LIGHT
COL_LIMIT = BAC_SUCCESS
COL_W = BAC_WARNING

# ── Valeurs exactes (fractions), citées de la banque vérifiée ──────────
# u_0 et la relation de récurrence : données de l'énoncé.
U0 = F(1, 2)


def _suivant(u: F) -> F:
    """u_{n+1} = u_n / (3 - 2 u_n) — la relation de récurrence donnée."""
    return u / (3 - 2 * u)


U1 = _suivant(U0)  # = 1/4 — question 1 (bank step)
# u_2, u_3, u_4 : PAS des étapes de la banque — calculées ici, par la
# MÊME relation de récurrence vérifiée, uniquement pour le tracé sur la
# droite graduée (marche des termes / tassement vers la limite).
U2 = _suivant(U1)  # = 1/10
U3 = _suivant(U2)  # = 1/28
U4 = _suivant(U3)  # = 1/82
assert (U0, U1, U2) == (F(1, 2), F(1, 4), F(1, 10))

BOUND = F(1, 2)  # majorant de la question 2 — coïncide avec u_0

# Suite auxiliaire géométrique w_n = 1/u_n - 1 (question 5b), raison 3,
# w_0 = 1 — valeurs exactes citées de la banque (w_0, puis w_n = 3^n).
W0 = F(1)
W1 = W0 * 3  # = 3
W2 = W1 * 3  # = 9

NARRATION = {
    "titre": "Exercice deux du bac deux mille vingt et un, session "
    "normale, sciences expérimentales : suites numériques, sur quatre "
    "points.",
    "intro": "On considère la suite u, définie par son premier terme, "
    "un demi, et une relation de récurrence : chaque terme suivant "
    "s'obtient à partir du précédent.",
    "plan": "Une suite, c'est une liste de nombres qu'on peut placer "
    "comme des points sur une droite graduée. On place le premier, u "
    "zéro, à un demi.",
    "q1": "Question un. On calcule u un en appliquant la relation de "
    "récurrence au rang zéro, puis on le place sur la droite.",
    "q2": "Question deux. Par récurrence, on montre que tous les termes "
    "restent strictement entre zéro et un demi : une barrière verticale "
    "que la suite ne franchit jamais.",
    "q3a": "Question trois a. On compare le quotient de deux termes "
    "consécutifs à un demi, pour préparer l'étude du sens de variation.",
    "q3b": "Question trois b. On en déduit que la suite est strictement "
    "décroissante : chaque terme est plus proche de zéro que le "
    "précédent.",
    "q4a": "Question quatre a. On majore la suite par une suite "
    "géométrique de raison un demi, qui tend vers zéro, puis on conclut "
    "par le théorème des gendarmes que la suite u converge vers zéro.",
    "q4b": "Question quatre b. On pose v égal au logarithme de trois "
    "moins deux u n, et on calcule sa limite par continuité du "
    "logarithme.",
    "q5a": "Question cinq a. On vérifie une identité sur l'inverse de "
    "u, qui va révéler une suite auxiliaire géométrique.",
    "q5b": "Question cinq b. On nomme cette suite auxiliaire w, "
    "géométrique de raison trois, on la place à son tour sur une droite "
    "graduée, puis on en déduit u n en fonction de n.",
}


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        nl, termes = self.chapitre_plan()
        termes = self.chapitre_q1(nl, termes)
        termes, barriere = self.chapitre_q2(nl, termes)
        self.chapitre_q3a()
        termes = self.chapitre_q3b(nl, termes)
        self.chapitre_q4a(nl, termes, barriere)
        self.chapitre_q4b()
        self.chapitre_q5a()
        self.chapitre_q5b()
        self.chapitre_fin()

    # ── Ouverture ──────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("titre")
        self.carte_titre(
            "BAC 2021 · SESSION NORMALE · SCIENCES EXP.",
            "Suites numériques",
            "Exercice 2 — 4 points · sujet officiel NS22F",
        )

    # ── La définition de la suite ────────────────────────────────────
    def chapitre_intro(self):
        self.etape("intro-definition")
        entete = Text(
            "On considère la suite numérique (u_n) définie par :",
            font_size=27,
        ).shift(2.3 * UP)
        u0_def = MathTex(r"u_0 = \dfrac{1}{2}", font_size=40, color=COL_U)
        rec_def = MathTex(
            r"u_{n+1} = \dfrac{u_n}{3-2u_n} \quad \text{pour tout } n \text{ de } \mathbb{N}",
            font_size=36,
        )
        bloc = VGroup(u0_def, rec_def).arrange(DOWN, buff=0.5).next_to(
            entete, DOWN, buff=0.7
        )
        self.play(Write(entete), run_time=1.2)
        self.play(FadeIn(bloc, shift=0.2 * UP), run_time=1.4)
        self.legende(
            "Un premier terme, puis une règle : chaque terme suivant se",
            "calcule à partir du précédent. On les retrouve à CHAQUE question.",
        )
        self.pose(3.4)
        self.efface_legende()
        self.play(FadeOut(entete))
        self.play(
            bloc.animate.scale(0.62).to_edge(LEFT, buff=0.55).to_edge(UP, buff=1.05)
        )
        self.epingle(bloc)
        return bloc

    # ── La couche de sens : une droite graduée, les termes qui marchent ──
    def chapitre_plan(self):
        self.etape("plan-droite")
        nl = NumberLine(
            x_range=[0, 0.6, 0.1],
            length=5.2,
            include_numbers=False,
            include_tip=True,
            tip_width=0.18,
            tip_height=0.18,
            stroke_color=BAC_INK_MUTED,
            stroke_width=2.5,
        ).move_to(3.7 * RIGHT + 0.4 * UP)
        # "0" à l'extrémité GAUCHE, décalé EN BAS-GAUCHE (hors de l'axe,
        # côté libre) : les termes qui s'y tasseront plus tard (question 4a)
        # restent légèrement à DROITE de ce point — jamais superposés.
        zero_lbl = MathTex("0", font_size=28, color=BAC_INK_MUTED).next_to(
            nl.n2p(0), DOWN + LEFT, buff=0.15
        )
        self.play(Create(nl), FadeIn(zero_lbl), run_time=1.8)
        nl.add(zero_lbl)  # suit la droite pour un futur FadeOut(nl) unique
        self.legende(
            "Une suite : une liste de nombres. On les place comme des",
            "points sur une droite graduée, pour VOIR comment ils se",
            "comportent — la couche de sens avant le calcul.",
        )
        self.pose(3.4)

        self.etape("plan-u0")
        u0_pt = nl.n2p(float(U0))
        u0_dot = Dot(u0_pt, color=COL_U, radius=0.08)
        # Étiquette EN BAS : tous les termes u_n garderont ce même côté
        # (règle d'audit : jamais d'alternance qui finit par chevaucher
        # quand les termes se tassent près de zéro, question 4a).
        u0_lbl = MathTex("u_0", font_size=28, color=COL_U).next_to(
            u0_dot, DOWN, buff=0.28
        )
        self.play(FadeIn(u0_dot, scale=1.6), Write(u0_lbl))
        self.legende(
            "u zéro = un demi : le premier point. Les suivants",
            "arriveront un par un, à chaque question.",
        )
        self.pose(3.2)
        self.efface_legende()
        termes = {"u0": VGroup(u0_dot, u0_lbl)}
        return nl, termes

    # ── Q1 : calculer u_1 ─────────────────────────────────────────────
    def chapitre_q1(self, nl, termes):
        badge = self.bandeau_question("1)", "0,25 pt")
        self.ardoise()

        self.etape("q1-enonce")
        but = MathTex(r"\text{Calculer } u_1", font_size=40)
        self.ecrit(but)
        self.legende(
            "On applique la règle de récurrence une seule fois,",
            "au rang zéro.",
        )
        self.pose(2.8)

        self.etape("q1-calcul-1")
        m1 = MathTex(
            r"u_1 = \dfrac{u_0}{3-2u_0} = \dfrac{\frac{1}{2}}{3-2\times\frac{1}{2}}",
            font_size=32,
        )
        self.ecrit(m1, buff=0.55)
        self.legende(
            "On remplace n par zéro dans la relation, avec u0 = un demi.",
        )
        self.pose(3.0)

        self.etape("q1-calcul-2")
        m2 = MathTex(
            r"u_1 = \dfrac{\frac{1}{2}}{3-1} = \dfrac{\frac{1}{2}}{2} = \dfrac{1}{4}",
            font_size=32, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(m2, buff=0.55)
        self.legende("Le dénominateur vaut 2 ; on simplifie : u1 = un quart.")
        self.pose(3.0)

        self.etape("q1-plot")
        u1_pt = nl.n2p(float(U1))
        u1_dot = Dot(u1_pt, color=COL_U, radius=0.08)
        u1_lbl = MathTex("u_1", font_size=28, color=COL_U).next_to(
            u1_dot, DOWN, buff=0.28
        )
        self.play(FadeIn(u1_dot, scale=1.6), Write(u1_lbl))
        termes["u1"] = VGroup(u1_dot, u1_lbl)
        self.legende(
            "u1 rejoint u0 sur la droite — déjà plus proche de zéro.",
            "0,25 point.",
        )
        self.pose(3.4)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return termes

    # ── Q2 : 0 < u_n <= 1/2 par récurrence ────────────────────────────
    def chapitre_q2(self, nl, termes):
        badge = self.bandeau_question("2)", "0,5 pt")
        self.ardoise()

        self.etape("q2-enonce")
        but = MathTex(
            r"\text{Montrer par récurrence que } 0 < u_n \le \dfrac{1}{2}",
            font_size=34,
        )
        self.ecrit(but)
        self.legende(
            "On encadre TOUS les termes de la suite, pour tout n.",
            "La récurrence est l'outil : on le rappelle avant de l'utiliser.",
        )
        self.pose(3.4)

        self.etape("q2-piege-recurrence")
        piege = VGroup(
            Text("ATTENTION : une récurrence exige DEUX étapes,", font_size=19, color=BAC_ERROR),
            Text("jamais une seule — l'INITIALISATION (le rang 0)", font_size=19, color=BAC_ERROR),
            Text("ET l'HÉRÉDITÉ (le passage du rang n au rang n+1).", font_size=19, color=BAC_ERROR),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(piege, buff=0.5)
        self.legende(
            "Un piège classique du bac : oublier l'une des deux étapes",
            "invalide toute la récurrence.",
        )
        self.pose(3.8)
        self.nettoie(garder=1)

        self.etape("q2-sens-barriere")
        base = nl.n2p(float(BOUND))
        # Sommet à base_y + 1,9 (≈ 2,3) : assez haut pour être visuellement
        # DISTINCT des étiquettes u_n (en bas de la droite), mais l'étiquette
        # de la barrière (~0,3 de haut, posée juste au-dessus) reste sous
        # y ≈ 3,1 — jamais dans la bande du bandeau (y ≥ 3,2).
        barre = DashedLine(
            base + 0.15 * DOWN, base + 1.9 * UP, color=COL_BOUND, stroke_width=3
        )
        # Étiquette au bout HAUT de la barrière — l'extrémité LIBRE, loin
        # des étiquettes u_n en bas de la droite (règle d'audit).
        borne_lbl = MathTex(
            r"u = \dfrac{1}{2}\ (\text{majorant})", font_size=24, color=COL_BOUND
        ).next_to(barre.get_top(), UP, buff=0.12)
        self.play(Create(barre, run_time=1.6), FadeIn(borne_lbl))
        self.legende(
            "Une barrière verticale à un demi : si l'énoncé dit vrai,",
            "aucun point ne la franchit jamais — u0 la touche déjà.",
        )
        self.pose(3.6)
        barriere = VGroup(barre, borne_lbl)

        self.etape("q2-initialisation")
        m1 = MathTex(
            r"u_0 = \dfrac{1}{2}, \quad 0 < \dfrac{1}{2} \le \dfrac{1}{2}",
            font_size=32,
        )
        self.ecrit(m1, buff=0.5)
        self.legende("Initialisation : vrai au rang 0, avec l'égalité large.")
        self.pose(2.8)

        self.etape("q2-heredite-hypothese")
        m2 = MathTex(
            r"0 < u_n \le \dfrac{1}{2} \implies 0 \le 2u_n \le 1 \implies 2 \le 3-2u_n",
            font_size=26,
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "Hérédité : on suppose l'encadrement vrai au rang n, et on",
            "contrôle d'abord le dénominateur — il reste au moins 2.",
        )
        self.pose(3.6)

        self.etape("q2-heredite-positif")
        m3 = MathTex(r"u_{n+1} = \dfrac{u_n}{3-2u_n} > 0", font_size=32)
        self.ecrit(m3, buff=0.5)
        self.legende(
            "Numérateur et dénominateur strictement positifs :",
            "u(n+1) est strictement positif.",
        )
        self.pose(3.0)

        self.etape("q2-heredite-majoration")
        m4 = MathTex(
            r"u_{n+1} \le \dfrac{1}{2} \iff u_n \le \dfrac{1}{2}(3-2u_n)"
            r" \iff u_n \le \dfrac{3}{2}-u_n \iff u_n \le \dfrac{3}{4}",
            font_size=22,
        )
        self.ecrit(m4, buff=0.55)
        self.legende(
            "On multiplie par le dénominateur, POSITIF (étape",
            "précédente), puis on isole u_n : le sens des inégalités",
            "est conservé.",
        )
        self.pose(3.8)

        self.etape("q2-heredite-conclusion")
        m5 = MathTex(
            r"u_n \le \dfrac{1}{2} < \dfrac{3}{4} \implies u_{n+1} \le \dfrac{1}{2}",
            font_size=30, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(m5, buff=0.55)
        self.legende(
            "L'hypothèse de récurrence donne bien u_n <= 3/4 :",
            "l'hérédité est vérifiée.",
        )
        self.pose(3.4)

        self.etape("q2-conclusion")
        concl = MathTex(
            r"\text{Par récurrence : } 0 < u_n \le \dfrac{1}{2}"
            r" \ \text{pour tout } n \text{ de } \mathbb{N}",
            font_size=26, color=BAC_SUCCESS,
        )
        self.ecrit(concl, buff=0.55)
        self.legende(
            "Initialisation et hérédité réunies : la barrière tient",
            "pour TOUS les rangs. 0,5 point.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return termes, barriere

    # ── Q3a : u_{n+1}/u_n <= 1/2 ──────────────────────────────────────
    def chapitre_q3a(self):
        badge = self.bandeau_question("3) a)", "0,5 pt")
        self.ardoise()

        self.etape("q3a-enonce")
        but = MathTex(
            r"\text{Montrer que } \dfrac{u_{n+1}}{u_n} \le \dfrac{1}{2}",
            font_size=36,
        )
        self.ecrit(but)
        self.legende(
            "Pour étudier le sens de variation, on compare le quotient",
            "de deux termes consécutifs à un demi.",
        )
        self.pose(3.2)

        self.etape("q3a-quotient")
        m1 = MathTex(
            r"u_n>0 \implies \dfrac{u_{n+1}}{u_n} = \dfrac{1}{3-2u_n}",
            font_size=32,
        )
        self.ecrit(m1, buff=0.5)
        self.legende(
            "On divise u(n+1) par u_n — licite car u_n > 0,",
            "établi à la question 2.",
        )
        self.pose(3.4)

        self.etape("q3a-reutilise-denominateur")
        m2 = MathTex(
            r"0<u_n\le\dfrac{1}{2} \implies 2\le 3-2u_n", font_size=32
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "On réutilise le contrôle du dénominateur, déjà fait à",
            "la question 2.",
        )
        self.pose(3.0)

        self.etape("q3a-inverse-decroissante")
        m3 = MathTex(
            r"2\le 3-2u_n \implies \dfrac{1}{3-2u_n}\le\dfrac{1}{2}",
            font_size=32,
        )
        self.ecrit(m3, buff=0.5)
        self.legende(
            "La fonction inverse est DÉCROISSANTE sur les positifs :",
            "le plus grand dénominateur donne la plus petite fraction.",
        )
        self.pose(3.6)

        self.etape("q3a-conclusion")
        concl = MathTex(
            r"\dfrac{u_{n+1}}{u_n}\le\dfrac{1}{2} \quad \text{pour tout } n",
            font_size=34, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(concl, buff=0.55)
        self.legende("Le quotient reste majoré par un demi. 0,5 point.")
        self.pose(3.2)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q3b : en déduire la monotonie ────────────────────────────────
    def chapitre_q3b(self, nl, termes):
        badge = self.bandeau_question("3) b)", "0,5 pt")
        self.ardoise()

        self.etape("q3b-enonce")
        but = MathTex(r"\text{En déduire la monotonie de } (u_n)", font_size=38)
        self.ecrit(but)
        self.legende(
            "On relit le résultat précédent pour trouver le sens",
            "de variation de la suite.",
        )
        self.pose(3.0)

        self.etape("q3b-sens-anticipation")
        u0_dot = termes["u0"][0]
        u1_dot = termes["u1"][0]
        fleche = Arrow(
            u0_dot.get_center() + 0.32 * UP,
            u1_dot.get_center() + 0.32 * UP,
            buff=0.12, color=COL_U, stroke_width=3,
            max_tip_length_to_length_ratio=0.2,
        )
        self.play(Create(fleche), run_time=1.2)
        self.legende(
            "On le VOIT déjà : u1 est plus proche de zéro que u0.",
            "Vérifions-le pour TOUS les rangs, avec le quotient.",
        )
        self.pose(3.4)

        self.etape("q3b-calcul")
        m1 = MathTex(
            r"\dfrac{u_{n+1}}{u_n}\le\dfrac{1}{2}<1, \quad u_n>0"
            r" \implies u_{n+1}\le\dfrac{1}{2}u_n < u_n",
            font_size=24,
        )
        self.ecrit(m1, buff=0.5)
        self.legende(
            "u_n est strictement positif : multiplier l'inégalité par",
            "u_n conserve le sens des comparaisons.",
        )
        self.pose(3.6)

        self.etape("q3b-piege-rigueur")
        piege = VGroup(
            Text("ATTENTION : on ne conclut PAS en regardant que les", font_size=19, color=BAC_ERROR),
            Text("valeurs « semblent diminuer ». Il faut un ARGUMENT :", font_size=19, color=BAC_ERROR),
            Text("ici, le quotient u(n+1)/u_n comparé à 1.", font_size=19, color=BAC_ERROR),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(piege, buff=0.5)
        self.legende(
            "Un piège classique : le sens de variation se justifie,",
            "il ne se devine pas sur quelques valeurs.",
        )
        self.pose(3.8)
        self.nettoie(garder=1)

        self.etape("q3b-conclusion")
        concl = MathTex(
            r"u_{n+1} < u_n \quad \text{pour tout } n",
            font_size=36, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(concl, buff=0.55)
        self.legende(
            "La suite (u_n) est strictement décroissante. 0,5 point.",
        )
        self.pose(3.2)

        self.etape("q3b-confirmation")
        self.play(FadeOut(fleche))
        u2_pt = nl.n2p(float(U2))
        u2_dot = Dot(u2_pt, color=COL_U, radius=0.08)
        u2_lbl = MathTex("u_2", font_size=28, color=COL_U).next_to(
            u2_dot, DOWN, buff=0.28
        )
        self.play(FadeIn(u2_dot, scale=1.6), Write(u2_lbl))
        termes["u2"] = VGroup(u2_dot, u2_lbl)
        self.legende(
            "u0, u1, u2 : la suite MARCHE vers la gauche, terme après",
            "terme, sans jamais franchir la barrière.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return termes

    # ── Q4a : majoration géométrique, puis limite ────────────────────
    def chapitre_q4a(self, nl, termes, barriere):
        badge = self.bandeau_question("4) a)", "0,75 pt")
        self.ardoise()

        self.etape("q4a-enonce")
        but = MathTex(
            r"\text{Montrer que } 0 < u_n \le \left(\dfrac{1}{2}\right)^{n+1},"
            r" \text{ puis calculer } \lim u_n",
            font_size=26,
        )
        self.ecrit(but)
        self.legende(
            "Une nouvelle récurrence : on majore u_n par une suite",
            "géométrique, plus fine, pour atteindre la limite.",
        )
        self.pose(3.6)

        self.etape("q4a-sens-convergence")
        u3_pt = nl.n2p(float(U3))
        u4_pt = nl.n2p(float(U4))
        u3_dot = Dot(u3_pt, color=COL_U, radius=0.05)
        u4_dot = Dot(u4_pt, color=COL_U, radius=0.05)
        # Sous u3 (pas u4) : u4 est presque collé à l'extrémité « 0 » de la
        # droite — l'étiquette « … » garde ainsi une marge avec le label 0.
        pts = MathTex(r"\cdots", font_size=26, color=COL_U).next_to(
            u3_dot, DOWN, buff=0.32
        )
        self.play(FadeIn(u3_dot, scale=1.6), FadeIn(u4_dot, scale=1.6), FadeIn(pts))
        self.legende(
            "Les termes se TASSENT contre zéro — la suite semble",
            "converger. Vérifions-le, puis calculons cette limite.",
        )
        self.pose(3.6)
        crowd = VGroup(u3_dot, u4_dot, pts)

        self.etape("q4a-initialisation")
        m1 = MathTex(
            r"u_0 = \dfrac{1}{2} = \left(\dfrac{1}{2}\right)^{0+1}",
            font_size=32,
        )
        self.ecrit(m1, buff=0.5)
        self.legende("Initialisation : égalité exacte au rang 0.")
        self.pose(2.8)

        self.etape("q4a-heredite")
        m2 = MathTex(
            r"0<u_n\le\left(\dfrac{1}{2}\right)^{n+1} \implies"
            r" u_{n+1}\le\dfrac{1}{2}u_n\le\dfrac{1}{2}\left(\dfrac{1}{2}\right)^{n+1}"
            r" = \left(\dfrac{1}{2}\right)^{n+2}",
            font_size=20,
        )
        self.ecrit(m2, buff=0.55)
        self.legende(
            "Hérédité : on réinjecte u(n+1) <= un demi fois u_n,",
            "établi à la question trois a, dans l'hypothèse de rang n.",
        )
        self.pose(4.0)

        self.etape("q4a-conclusion-encadrement")
        m3 = MathTex(
            r"0 < u_n \le \left(\dfrac{1}{2}\right)^{n+1}"
            r" \quad \text{pour tout } n \text{ de } \mathbb{N}",
            font_size=26, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(m3, buff=0.55)
        self.legende(
            "Par récurrence, l'encadrement géométrique est établi",
            "pour tout n.",
        )
        self.pose(3.4)

        self.etape("q4a-piege-raison")
        piege = VGroup(
            Text("ATTENTION : une suite géométrique de raison q tend", font_size=19, color=BAC_ERROR),
            Text("vers 0 SEULEMENT si |q| < 1. Cette condition doit être", font_size=19, color=BAC_ERROR),
            Text("ÉCRITE — jamais sous-entendue.", font_size=19, color=BAC_ERROR),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(piege, buff=0.5)
        self.legende(
            "Un piège classique : oublier de justifier |q| < 1 avant",
            "de conclure qu'une suite géométrique tend vers zéro.",
        )
        self.pose(3.8)
        self.nettoie(garder=1)

        self.etape("q4a-limite-geometrique")
        m4 = MathTex(
            r"\left|\dfrac{1}{2}\right|<1 \implies"
            r" \lim_{n\to+\infty}\left(\dfrac{1}{2}\right)^{n+1} = 0",
            font_size=28,
        )
        self.ecrit(m4, buff=0.5)
        self.legende(
            "La condition est vérifiée : un demi est bien entre −1 et 1.",
            "La suite géométrique majorante tend vers zéro.",
        )
        self.pose(3.6)

        self.etape("q4a-gendarmes")
        m5 = MathTex(
            r"0<u_n\le\left(\dfrac{1}{2}\right)^{n+1}, \quad"
            r" \left(\dfrac{1}{2}\right)^{n+1}\to 0 \implies"
            r" \lim_{n\to+\infty} u_n = 0",
            font_size=24, color=COL_LIMIT,
        )
        self.ecrit(m5, buff=0.55)
        self.legende(
            "Théorème des gendarmes : u_n est coincée entre zéro et",
            "une suite qui tend vers zéro — u_n tend donc vers zéro.",
            "0,75 point.",
        )
        self.pose(4.2)

        self.etape("q4a-limite-marker")
        lim_pt = nl.n2p(0.0)
        lim_dot = Dot(lim_pt, color=COL_LIMIT, radius=0.1)
        lim_lbl = MathTex(
            r"\lim u_n = 0", font_size=26, color=COL_LIMIT
        ).next_to(lim_dot, UP + LEFT, buff=0.15)
        self.play(FadeIn(lim_dot, scale=1.8), Write(lim_lbl))
        self.legende(
            "Un marqueur distinct pour la limite : les points",
            "s'accumulent contre lui, sans jamais l'atteindre.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.nettoie()

        # Le récit de u_n sur la droite graduée est terminé — on efface
        # la figure de ce chapitre avant d'ouvrir le chapitre suivant
        # (patron de nettoyage de fin de chapitre, DESIGN.md).
        self.play(
            FadeOut(
                VGroup(
                    badge, nl, barriere, termes["u0"], termes["u1"],
                    termes["u2"], crowd, lim_dot, lim_lbl,
                )
            ),
            run_time=0.9,
        )

    # ── Q4b : v_n = ln(3-2u_n), calculer lim v_n ─────────────────────
    def chapitre_q4b(self):
        badge = self.bandeau_question("4) b)", "0,5 pt")
        self.ardoise()

        self.etape("q4b-enonce")
        pose_v = MathTex(
            r"v_n = \ln\left(3-2u_n\right) \quad \text{pour tout } n \text{ de } \mathbb{N}",
            font_size=32,
        )
        self.ecrit(pose_v)
        but = MathTex(r"\text{Calculer } \lim v_n", font_size=36)
        self.ecrit(but, buff=0.5)
        self.legende(
            "Une nouvelle suite, construite à partir de u_n par le",
            "logarithme. On veut sa limite.",
        )
        self.pose(3.4)

        self.etape("q4b-sens-continuite")
        box1 = MathTex(r"u_n \to 0", font_size=30, color=COL_U)
        box2 = MathTex(r"3-2u_n \to 3", font_size=30, color=BAC_INK)
        box3 = MathTex(r"\ln(3-2u_n) \to \ln 3", font_size=30, color=COL_LIMIT)
        chaine = VGroup(box1, box2, box3).arrange(DOWN, buff=1.05).move_to(
            3.8 * RIGHT + 0.5 * UP
        )
        fl1 = Arrow(
            box1.get_bottom(), box2.get_top(), buff=0.12,
            color=BAC_INK_MUTED, stroke_width=3,
        )
        fl2 = Arrow(
            box2.get_bottom(), box3.get_top(), buff=0.12,
            color=BAC_INK_MUTED, stroke_width=3,
        )
        self.play(FadeIn(box1))
        self.legende(
            "On repart de la limite déjà connue : u_n tend vers zéro",
            "(question quatre a).",
        )
        self.pose(3.0)
        self.play(Create(fl1), FadeIn(box2))
        self.legende(
            "Les opérations usuelles sur les limites font passer",
            "cette limite dans 3 moins 2 u_n.",
        )
        self.pose(3.2)
        self.play(Create(fl2), FadeIn(box3))
        self.legende(
            "Que SIGNIFIE la continuité du logarithme en 3 ? La limite",
            "PASSE À TRAVERS lui : ln(3-2u_n) tend vers ln(3).",
        )
        self.pose(4.0)

        self.etape("q4b-calcul-interieur")
        m1 = MathTex(
            r"\lim_{n\to+\infty} u_n = 0 \implies"
            r" \lim_{n\to+\infty} (3-2u_n) = 3-2\times 0 = 3",
            font_size=28,
        )
        self.ecrit(m1, buff=0.5)
        self.legende("On remplace u_n par sa limite, zéro, dans 3 moins 2u_n.")
        self.pose(3.2)

        self.etape("q4b-calcul-limite")
        m2 = MathTex(
            r"\lim_{n\to+\infty} v_n = \lim_{n\to+\infty} \ln(3-2u_n) = \ln(3)",
            font_size=30, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(m2, buff=0.55)
        self.legende(
            "Continuité du logarithme en 3 : la limite de v_n vaut",
            "ln(3). 0,5 point.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, chaine, fl1, fl2)))

    # ── Q5a : vérifier 1/u_{n+1} - 1 = 3(1/u_n - 1) ──────────────────
    def chapitre_q5a(self):
        badge = self.bandeau_question("5) a)", "0,5 pt")
        self.ardoise()

        self.etape("q5a-enonce")
        but = MathTex(
            r"\text{Vérifier que } \dfrac{1}{u_{n+1}} - 1 = 3\left(\dfrac{1}{u_n} - 1\right)",
            font_size=30,
        )
        self.ecrit(but)
        self.legende(
            "Une identité sur l'INVERSE de u_n — elle va révéler une",
            "suite cachée, géométrique.",
        )
        self.pose(3.4)

        self.etape("q5a-inverser")
        m1 = MathTex(
            r"u_{n+1} = \dfrac{u_n}{3-2u_n} \implies"
            r" \dfrac{1}{u_{n+1}} = \dfrac{3-2u_n}{u_n}",
            font_size=28,
        )
        self.ecrit(m1, buff=0.5)
        self.legende(
            "On inverse la relation de récurrence — licite car u_n",
            "est strictement positif (question 2).",
        )
        self.pose(3.6)

        self.etape("q5a-separer")
        m2 = MathTex(r"\dfrac{1}{u_{n+1}} = \dfrac{3}{u_n} - 2", font_size=32)
        self.ecrit(m2, buff=0.5)
        self.legende("On sépare la fraction en deux termes.")
        self.pose(2.8)

        self.etape("q5a-conclusion")
        m3 = MathTex(
            r"\dfrac{1}{u_{n+1}} - 1 = \dfrac{3}{u_n} - 3 = 3\left(\dfrac{1}{u_n}-1\right)",
            font_size=28, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(m3, buff=0.55)
        self.legende(
            "On soustrait 1 des deux côtés, puis on factorise par 3 :",
            "l'égalité est vérifiée. 0,5 point.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q5b : en déduire u_n en fonction de n ────────────────────────
    def chapitre_q5b(self):
        badge = self.bandeau_question("5) b)", "0,5 pt")
        self.ardoise()

        self.etape("q5b-enonce")
        but = MathTex(r"\text{En déduire } u_n \text{ en fonction de } n", font_size=36)
        self.ecrit(but)
        self.legende(
            "L'identité de la question 5a cache une suite géométrique.",
            "On la nomme, on la résout, puis on revient à u_n.",
        )
        self.pose(3.4)

        self.etape("q5b-nomme-wn")
        m1 = MathTex(
            r"w_n = \dfrac{1}{u_n} - 1, \quad w_{n+1} = 3w_n"
            r" \quad \text{(question 5a)}",
            font_size=26,
        )
        self.ecrit(m1, buff=0.5)
        self.legende(
            "On nomme la suite auxiliaire w_n : la question 5a dit",
            "exactement qu'elle est géométrique, de raison 3.",
        )
        self.pose(3.8)

        self.etape("q5b-sens-nouvelle-droite")
        w_nl = NumberLine(
            x_range=[0, 10, 2],
            length=5.2,
            include_numbers=False,
            include_tip=True,
            tip_width=0.18,
            tip_height=0.18,
            stroke_color=BAC_INK_MUTED,
            stroke_width=2.5,
        ).move_to(3.7 * RIGHT + 0.4 * UP)
        w_zero_lbl = MathTex("0", font_size=28, color=BAC_INK_MUTED).next_to(
            w_nl.n2p(0), DOWN + LEFT, buff=0.15
        )
        self.play(Create(w_nl, run_time=1.6), FadeIn(w_zero_lbl))
        w_nl.add(w_zero_lbl)
        self.legende(
            "Une NOUVELLE droite graduée : w_n grandit vite (raison 3),",
            "elle a besoin d'une autre échelle que celle de u_n.",
        )
        self.pose(3.6)

        self.etape("q5b-calcul-w0")
        m2 = MathTex(
            r"w_0 = \dfrac{1}{u_0} - 1 = \dfrac{1}{\frac{1}{2}} - 1 = 2-1 = 1",
            font_size=30,
        )
        self.ecrit(m2, buff=0.5)
        w0_pt = w_nl.n2p(float(W0))
        w0_dot = Dot(w0_pt, color=COL_W, radius=0.08)
        w0_lbl = MathTex("w_0", font_size=26, color=COL_W).next_to(
            w0_dot, DOWN, buff=0.28
        )
        self.play(FadeIn(w0_dot, scale=1.6), Write(w0_lbl))
        self.legende("Premier terme de la suite géométrique w : w0 = 1.")
        self.pose(3.2)

        self.etape("q5b-piege-raison-premier-terme")
        piege = VGroup(
            Text("ATTENTION : dans w_n = w_0 × q^n, ne pas confondre", font_size=19, color=BAC_ERROR),
            Text("le premier terme w_0 (= 1 ici) et la raison q (= 3 ici)", font_size=19, color=BAC_ERROR),
            Text("— une confusion très classique au bac.", font_size=19, color=BAC_ERROR),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(piege, buff=0.5)
        self.legende(
            "Un piège classique : le premier terme et la raison jouent",
            "des rôles différents dans la formule.",
        )
        self.pose(3.8)
        self.nettoie(garder=1)

        self.etape("q5b-calcul-wn-formule")
        m3 = MathTex(r"w_n = w_0\times 3^n = 3^n", font_size=34, color=BAC_ACCENT_STRONG)
        self.ecrit(m3, buff=0.55)
        w1_pt = w_nl.n2p(float(W1))
        w2_pt = w_nl.n2p(float(W2))
        w1_dot = Dot(w1_pt, color=COL_W, radius=0.08)
        w1_lbl = MathTex("w_1", font_size=26, color=COL_W).next_to(
            w1_dot, DOWN, buff=0.28
        )
        w2_dot = Dot(w2_pt, color=COL_W, radius=0.08)
        w2_lbl = MathTex("w_2", font_size=26, color=COL_W).next_to(
            w2_dot, DOWN, buff=0.28
        )
        # Arcs « saut ×3 » AU-DESSUS de la droite ; toutes les étiquettes
        # w_n restent EN BAS — aucun risque de croisement (règle d'audit).
        # angle NÉGATIF : pour une corde orientée gauche→droite, PI/2
        # bombe l'arc VERS LE BAS (constaté au rendu) — dans la zone des
        # étiquettes w_n. −PI/2 le fait bomber vers le haut.
        saut1 = ArcBetweenPoints(
            w0_dot.get_center(), w1_dot.get_center(), angle=-PI / 2,
            color=COL_W, stroke_width=2.5,
        )
        saut1.add_tip(tip_length=0.13)
        saut1_lbl = MathTex(r"\times 3", font_size=22, color=COL_W).move_to(
            saut1.point_from_proportion(0.5) + 0.28 * UP
        )
        self.play(
            FadeIn(w1_dot, scale=1.6), Write(w1_lbl),
            Create(saut1), FadeIn(saut1_lbl),
        )
        self.pose(1.6)
        saut2 = ArcBetweenPoints(
            w1_dot.get_center(), w2_dot.get_center(), angle=-PI / 2,
            color=COL_W, stroke_width=2.5,
        )
        saut2.add_tip(tip_length=0.13)
        saut2_lbl = MathTex(r"\times 3", font_size=22, color=COL_W).move_to(
            saut2.point_from_proportion(0.5) + 0.28 * UP
        )
        self.play(
            FadeIn(w2_dot, scale=1.6), Write(w2_lbl),
            Create(saut2), FadeIn(saut2_lbl),
        )
        self.legende(
            "Formule explicite d'une suite géométrique : chaque saut",
            "multiplie par la raison, 3. w0 = 1, w1 = 3, w2 = 9…",
        )
        self.pose(4.0)
        self.nettoie(garder=1)

        self.etape("q5b-calcul-un")
        m4 = MathTex(
            r"\dfrac{1}{u_n} - 1 = 3^n \implies \dfrac{1}{u_n} = 1+3^n"
            r" \implies u_n = \dfrac{1}{1+3^n}",
            font_size=26,
        )
        self.ecrit(m4, buff=0.55)
        self.legende(
            "On inverse la définition de w_n pour revenir à u_n :",
            "on remplace w_n par 3 puissance n.",
        )
        self.pose(3.8)

        self.etape("q5b-conclusion")
        concl = MathTex(
            r"u_n = \dfrac{1}{1+3^n} \quad \text{pour tout } n \text{ de } \mathbb{N}",
            font_size=38, color=COL_LIMIT,
        )
        self.ecrit(concl, buff=0.6)
        self.encadre(couleur=COL_LIMIT)
        self.legende(
            "Le terme général de la suite u — 0,5 point. Exercice",
            "terminé, quatre points au total.",
        )
        self.pose(4.4)
        self.efface_legende()
        self.play(*[FadeOut(m) for m in self.mobjects])

    # ── Fermeture ─────────────────────────────────────────────────
    def chapitre_fin(self):
        self.etape("bilan")
        bilan = VGroup(
            Text("Ce qu'il faut retenir", font_size=34, color=BAC_INK),
            Text("• Une suite se VOIT : elle marche sur une droite graduée ;",
                 font_size=23, color=BAC_INK_SOFT),
            Text("  un majorant est une barrière jamais franchie.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• Le sens de variation se JUSTIFIE : quotient comparé à 1,",
                 font_size=23, color=BAC_INK_SOFT),
            Text("  jamais deviné à l'œil sur quelques valeurs.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• Récurrence : TOUJOURS initialisation ET hérédité.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• Suite géométrique : q^n → 0 SEULEMENT si |q| < 1.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• Gendarmes : coincée entre deux suites de même limite.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• Suite auxiliaire w_n = 1/u_n − 1 : ne pas confondre le",
                 font_size=23, color=BAC_INK_SOFT),
            Text("  premier terme w_0 et la raison q.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("4 points — sujet réel, valeurs exactes du scan officiel.",
                 font_size=21, color=BAC_INK_MUTED),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.24)
        self.play(FadeIn(bilan, shift=0.2 * UP))
        self.pose(5.0)
        self.play(FadeOut(bilan))
        if self._badge_etape is not None:
            self.remove(self._badge_etape)
