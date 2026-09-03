#!/usr/bin/env python3
"""
Génère la figure étagée de l'explication « géométrie-espace / bk-2019-n-x1 ».

Pourquoi un générateur et pas un SVG écrit à la main : la scène est en 3D
(trois points, un plan, une sphère, un cercle d'intersection). Placer les
coordonnées à la main, c'est se tromper — et une figure fausse est pire
qu'une figure absente. Ici, tout descend des données de la banque par la
même projection, donc la figure NE PEUT PAS contredire l'énoncé.

Sortie (deux fichiers, la convention StagedFigure du dépôt) :
  content/maths/geometrie-espace/media/explication-bk-2019-n-x1.svg
      des groupes <g id="step-N"> révélés un par un par l'élève
  content/maths/geometrie-espace/media/explication-bk-2019-n-x1.stages.json
      une légende par étape

Les données (vérifiées à la main lors de l'audit de la scène) :
  A(1,-1,-1)  B(0,-2,1)  C(1,-2,0)
  AB∧AC = (1,1,1)      (ABC) : x+y+z+1 = 0
  (S) : centre Ω(2,-1,1), R = √5
  d(Ω,(ABC)) = √3 < √5  ⟹  cercle de rayon √2

Le fait remarquable que la figure rend VISIBLE, et qu'aucun corrigé écrit
ne montre : le pied de la perpendiculaire abaissée de Ω sur le plan est
exactement le point C. C'est pour voir ça qu'on dessine.
"""

from __future__ import annotations

import json
import math
from pathlib import Path

RACINE = Path(__file__).resolve().parents[1]
SORTIE = RACINE / "content" / "maths" / "geometrie-espace" / "media"
SLUG = "explication-bk-2019-n-x1"

# ── les données de l'exercice ────────────────────────────────────────────
A = (1.0, -1.0, -1.0)
B = (0.0, -2.0, 1.0)
C = (1.0, -2.0, 0.0)
OMEGA = (2.0, -1.0, 1.0)
R = math.sqrt(5)


def sub(p, q):
    return (p[0] - q[0], p[1] - q[1], p[2] - q[2])


def add(p, q):
    return (p[0] + q[0], p[1] + q[1], p[2] + q[2])


def mul(p, k):
    return (p[0] * k, p[1] * k, p[2] * k)


def cross(u, v):
    return (u[1] * v[2] - u[2] * v[1],
            u[2] * v[0] - u[0] * v[2],
            u[0] * v[1] - u[1] * v[0])


def norm(u):
    return math.sqrt(u[0] ** 2 + u[1] ** 2 + u[2] ** 2)


AB, AC = sub(B, A), sub(C, A)
N = cross(AB, AC)                      # (1,1,1)
D_OMEGA = abs(OMEGA[0] + OMEGA[1] + OMEGA[2] + 1) / norm(N)   # √3
R_CERCLE = math.sqrt(R ** 2 - D_OMEGA ** 2)                   # √2
# pied de la perpendiculaire : Ω - ((n·Ω + d)/|n|²) n  →  ici, exactement C
T = (OMEGA[0] + OMEGA[1] + OMEGA[2] + 1) / (norm(N) ** 2)
H = sub(OMEGA, mul(N, T))

# ── la projection (axonométrie : x vers l'avant-gauche, y à droite, z en haut)
# L'échelle et le centre ne sont PAS choisis à la main : ils sont calculés
# pour que tout ce qui est dessiné (sphère comprise) tienne dans le cadre.
# Une figure recadrée à l'œil finit toujours par déborder dès qu'on ajoute
# un objet — ici, c'est structurellement impossible.
LARGEUR, HAUTEUR, MARGE = 640.0, 500.0, 34.0
EX, EY = (-0.55, 0.42), (1.0, 0.0)
EZ = (0.0, -1.0)


def _brut(p):
    x, y, z = p
    return (EX[0] * x + EY[0] * y + EZ[0] * z,
            EX[1] * x + EY[1] * y + EZ[1] * z)


def _cadre():
    """Échelle + origine : on cadre sur l'ACTION, pas sur la scène entière.

    Faire tenir toute la sphère et tout le plan écrase A, B, C et Ω dans un
    petit tas au centre, et leurs étiquettes se marchent dessus. On cadre
    donc sur les points qui portent le raisonnement (plus le cercle
    d'intersection) ; la sphère et le plan débordent volontairement du
    cadre et sont rognés par le viewport — c'est l'usage courant en
    géométrie : on ne montre pas toute la sphère, on montre ce qui se passe.
    """
    pts = [(0, 0, 0), A, B, C, OMEGA]
    # le cercle (Γ) fait partie de l'action et doit rester entier
    pts += [dans_plan(H, R_CERCLE * math.cos(k * math.pi / 8),
                      R_CERCLE * math.sin(k * math.pi / 8)) for k in range(16)]
    # la pointe de la normale, qu'on annote
    pts.append(add(A, mul(N, 1.32)))
    xs = [_brut(q)[0] for q in pts]
    ys = [_brut(q)[1] for q in pts]
    x0, x1, y0, y1 = min(xs), max(xs), min(ys), max(ys)
    s = min((LARGEUR - 2 * MARGE) / (x1 - x0), (HAUTEUR - 2 * MARGE) / (y1 - y0))
    return s, (LARGEUR / 2 - s * (x0 + x1) / 2, HAUTEUR / 2 - s * (y0 + y1) / 2)


def P(p):
    """3D → pixels SVG."""
    bx, by = _brut(p)
    return (OX + S * bx, OY + S * by)


def f(v):
    return f"{v:.1f}"


def pt(p):
    a, b = P(p)
    return f"{a:.1f},{b:.1f}"


# base orthogonale DANS le plan, pour dessiner le plan et le cercle
E1 = mul(AC, 1 / norm(AC))
E2 = mul(cross(N, AC), 1 / norm(cross(N, AC)))


def dans_plan(centre, a, b):
    return add(centre, add(mul(E1, a), mul(E2, b)))


S, (OX, OY) = _cadre()


def fleche(p, q, couleur, ident="", largeur=2.2, tete=9.0):
    """Segment + pointe, en 2D après projection (la pointe reste lisible)."""
    x1, y1 = P(p)
    x2, y2 = P(q)
    dx, dy = x2 - x1, y2 - y1
    L = math.hypot(dx, dy) or 1.0
    ux, uy = dx / L, dy / L
    bx, by = x2 - ux * tete, y2 - uy * tete          # base de la pointe
    px_, py_ = -uy, ux                                # perpendiculaire
    g1 = f"{bx + px_ * tete * 0.42:.1f},{by + py_ * tete * 0.42:.1f}"
    g2 = f"{bx - px_ * tete * 0.42:.1f},{by - py_ * tete * 0.42:.1f}"
    idattr = f' id="{ident}"' if ident else ""
    return (
        f'<line{idattr} x1="{f(x1)}" y1="{f(y1)}" x2="{f(bx)}" y2="{f(by)}" '
        f'stroke="{couleur}" stroke-width="{largeur}" stroke-linecap="round"/>'
        f'<polygon points="{f(x2)},{f(y2)} {g1} {g2}" fill="{couleur}"/>'
    )


def point(p, nom, dx=10, dy=-8, couleur="var(--figure-ink)", r=4.2):
    x, y = P(p)
    return (
        f'<circle cx="{f(x)}" cy="{f(y)}" r="{r}" fill="{couleur}"/>'
        f'<text x="{f(x + dx)}" y="{f(y + dy)}" font-size="17" font-weight="600" '
        f'fill="{couleur}">{nom}</text>'
    )


def texte(x, y, s, taille=15, couleur="var(--figure-ink-soft)", poids="400", ancre="start"):
    return (f'<text x="{f(x)}" y="{f(y)}" font-size="{taille}" fill="{couleur}" '
            f'font-weight="{poids}" text-anchor="{ancre}">{s}</text>')


# couleurs sémantiques — jetons du dépôt, donc justes dans les deux thèmes
C_AB = "var(--figure-energy-C)"        # bleu
C_AC = "var(--figure-regime-pseudo)"   # ambre
C_N = "var(--figure-energy-L)"         # vert
C_SPH = "var(--figure-regime-aperiodic)"  # violet
C_ACC = "var(--figure-accent)"
C_INK = "var(--figure-ink)"
C_SOFT = "var(--figure-ink-soft)"

parts: list[str] = []
add_ = parts.append

add_(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 500" width="640" height="500"\n'
    "     font-family=\"'IBM Plex Sans', system-ui, sans-serif\"\n"
    '     role="img"\n'
    '     aria-label="Construction pas à pas de l\'exercice de géométrie dans l\'espace du bac 2019 : '
    "les points A, B et C, les vecteurs AB et AC, leur produit vectoriel normal au plan, le plan (ABC), "
    "la sphère de centre Oméga, la perpendiculaire abaissée de Oméga qui tombe exactement sur C, "
    'et le cercle d\'intersection de rayon racine de deux.">'
)
add_("<title>Géométrie dans l'espace — bac 2019, construction étape par étape</title>")
add_("<!-- GÉNÉRÉ par scripts/figure-geometrie-espace-2019.py — ne pas éditer à la main. -->")

# ── step-1 : le repère et les trois points ──────────────────────────────
add_('<g id="step-1">')
O = (0.0, 0.0, 0.0)
# Les axes sont BORNÉS AU CADRE (correctif du 2026-09-03).
#
# _cadre() ci-dessus cadre sur l'action et laisse volontairement déborder la
# sphère et le plan — c'est un choix assumé et documenté. Mais les extrémités
# des axes ne figurent PAS dans les points qu'il considère : leur débordement
# n'était pas un choix, c'était un effet de bord. Mesuré sur le SVG produit :
# l'axe y courait jusqu'à x = 1030 et son étiquette à 1089, l'axe z jusqu'à
# y = −232 et son étiquette à −291, pour un cadre de 640 × 500. Deux des trois
# axes d'un repère 3D sortaient donc du dessin AVEC leur pointe et leur nom :
# l'élève ne pouvait plus dire lequel était y et lequel était z.
#
# Les allonger dans le cadre serait faux (il faudrait dézoomer, et le
# docstring de _cadre() explique justement pourquoi on ne le fait pas : ça
# écrase A, B, C et Oméga en un petit tas). On les RACCOURCIT donc : chaque
# axe garde sa direction et s'arrête à la longueur qui laisse sa pointe ET
# son étiquette dans le cadre.
MARGE_AXE = 22.0  # place pour la pointe et le nom de l'axe


def _longueur_visible(direction, maxi=3.1):
    """La plus grande longueur, le long de `direction`, dont la pointe et
    l'étiquette (posée à 1,13 × la longueur) tiennent dans le viewBox."""
    lo, hi = 0.0, maxi
    for _ in range(40):
        milieu = (lo + hi) / 2
        ex, ey = P(mul(direction, milieu * 1.13))
        dedans = (
            MARGE_AXE <= ex <= LARGEUR - MARGE_AXE
            and MARGE_AXE <= ey <= HAUTEUR - MARGE_AXE
        )
        if dedans:
            lo = milieu
        else:
            hi = milieu
    return lo


for direction, nom in (((1.0, 0, 0), "x"), ((0, 1.0, 0), "y"), ((0, 0, 1.0), "z")):
    L = _longueur_visible(direction)
    vec = mul(direction, L)
    add_(fleche(O, vec, "var(--figure-grid)", largeur=1.6, tete=7))
    ex, ey = P(mul(vec, 1.13))
    add_(texte(ex - 4, ey + 4, nom, 14, "var(--figure-grid)"))
add_(point(O, "O", -16, 16, C_SOFT, 3.2))
add_(point(A, "A", 11, -7))
add_(point(B, "B", 11, -7))
add_(point(C, "C", 12, 18))
add_("</g>")

# ── step-2 : les deux vecteurs du plan ─────────────────────────────────
add_('<g id="step-2">')
add_(fleche(A, B, C_AB))
add_(fleche(A, C, C_AC))
mx, my = P(mul(add(A, B), 0.5))
add_(texte(mx - 46, my - 2, "AB", 16, C_AB, "700"))
mx, my = P(mul(add(A, C), 0.5))
add_(texte(mx - 30, my + 22, "AC", 16, C_AC, "700"))
add_("</g>")

# ── step-3 : le produit vectoriel ──────────────────────────────────────
add_('<g id="step-3">')
add_(fleche(A, add(A, mul(N, 1.25)), C_N, largeur=2.6, tete=11))
nx, ny = P(add(A, mul(N, 1.32)))
add_(texte(nx + 8, ny - 2, "n = AB ∧ AC", 16, C_N, "700"))
# les deux angles droits, dessinés là où ils se lisent
for autre, coul in ((AB, C_AB), (AC, C_AC)):
    u = mul(autre, 0.42 / norm(autre))
    v = mul(N, 0.42 / norm(N))
    p1, p2, p3 = add(A, u), add(A, add(u, v)), add(A, v)
    add_(f'<polyline points="{pt(p1)} {pt(p2)} {pt(p3)}" fill="none" '
         f'stroke="{coul}" stroke-width="1.6" opacity="0.85"/>')
add_("</g>")

# ── step-4 : le plan (ABC) ─────────────────────────────────────────────
add_('<g id="step-4">')
coins = [dans_plan(C, a, b) for a, b in ((2.35, 2.35), (2.35, -2.35), (-2.35, -2.35), (-2.35, 2.35))]
add_(f'<polygon points="{" ".join(pt(p) for p in coins)}" '
     f'fill="{C_N}" fill-opacity="0.10" stroke="{C_N}" stroke-width="1.5" '
     f'stroke-opacity="0.55"/>')
add_(f'<polygon points="{pt(A)} {pt(B)} {pt(C)}" fill="{C_N}" fill-opacity="0.16" '
     f'stroke="{C_N}" stroke-width="1.8"/>')
add_(texte(20, HAUTEUR - 16, "(ABC)", 16, C_N, "700"))
add_("</g>")

# ── step-5 : la sphère ─────────────────────────────────────────────────
add_('<g id="step-5">')
ox, oy = P(OMEGA)
rpx = R * S * 0.95
add_(f'<circle cx="{f(ox)}" cy="{f(oy)}" r="{f(rpx)}" fill="{C_SPH}" '
     f'fill-opacity="0.07" stroke="{C_SPH}" stroke-width="1.8"/>')
add_(f'<ellipse cx="{f(ox)}" cy="{f(oy)}" rx="{f(rpx)}" ry="{f(rpx * 0.30)}" '
     f'fill="none" stroke="{C_SPH}" stroke-width="1.1" stroke-opacity="0.5" '
     f'stroke-dasharray="4 4"/>')
add_(point(OMEGA, "Ω", -6, -16, C_SPH))
add_(f'<line x1="{f(ox)}" y1="{f(oy)}" x2="{f(ox + rpx)}" y2="{f(oy)}" '
     f'stroke="{C_SPH}" stroke-width="1.6" stroke-dasharray="5 4"/>')
add_(texte(ox + rpx * 0.46, oy - 8, "R = √5", 15, C_SPH, "700"))
add_("</g>")

# ── step-6 : la distance — et le pied tombe sur C ──────────────────────
add_('<g id="step-6">')
add_(f'<line x1="{pt(OMEGA).split(",")[0]}" y1="{pt(OMEGA).split(",")[1]}" '
     f'x2="{pt(H).split(",")[0]}" y2="{pt(H).split(",")[1]}" '
     f'stroke="{C_ACC}" stroke-width="2.6" stroke-linecap="round"/>')
u = mul(sub(H, OMEGA), 0.40 / norm(sub(H, OMEGA)))
v = mul(E1, 0.40)
add_(f'<polyline points="{pt(add(H, u))} {pt(add(H, add(u, v)))} {pt(add(H, v))}" '
     f'fill="none" stroke="{C_ACC}" stroke-width="1.8"/>')
hx, hy = P(mul(add(OMEGA, H), 0.5))
ox_, oy_ = P(OMEGA)
cx_, cy_ = P(H)
# normale 2D au segment ΩC, pour poser l'étiquette à côté et non dessus
ndx, ndy = -(cy_ - oy_), (cx_ - ox_)
nl = math.hypot(ndx, ndy) or 1.0
add_(texte(hx + 34 * ndx / nl - 16, hy + 34 * ndy / nl + 5, "d = √3", 16, C_ACC, "700"))
add_("</g>")

# ── step-7 : d < R ⟹ le cercle d'intersection ──────────────────────────
add_('<g id="step-7">')
pts = [dans_plan(H, R_CERCLE * math.cos(k * math.pi / 36),
                 R_CERCLE * math.sin(k * math.pi / 36)) for k in range(72)]
add_(f'<polygon points="{" ".join(pt(p) for p in pts)}" fill="{C_ACC}" '
     f'fill-opacity="0.18" stroke="{C_ACC}" stroke-width="2.4"/>')
bord = dans_plan(H, R_CERCLE, 0)
add_(f'<line x1="{pt(H).split(",")[0]}" y1="{pt(H).split(",")[1]}" '
     f'x2="{pt(bord).split(",")[0]}" y2="{pt(bord).split(",")[1]}" '
     f'stroke="{C_ACC}" stroke-width="1.6" stroke-dasharray="5 4"/>')
bx, by = P(dans_plan(H, R_CERCLE * 0.52, 0))
add_(texte(bx - 4, by - 9, "√2", 15, C_ACC, "700"))
add_("</g>")

add_("</svg>")

SORTIE.mkdir(parents=True, exist_ok=True)
(SORTIE / f"{SLUG}.svg").write_text("\n".join(parts) + "\n", encoding="utf-8")

stages = {
    "slug": SLUG,
    "stages": [
        {"caption": "On place d'abord le décor : le repère de l'espace, puis les trois points que "
                    "l'énoncé donne — A, B et C. Rien à calculer ici, on regarde juste où on est."},
        {"caption": "Pour décrire le plan, on part d'un sommet, A, et on va vers les deux autres : "
                    "cela donne deux vecteurs, AB en bleu et AC en ambre. Leurs coordonnées se lisent "
                    "« arrivée moins départ »."},
        {"caption": "Le produit vectoriel AB ∧ AC fabrique un troisième vecteur, n = (1, 1, 1), "
                    "perpendiculaire aux deux à la fois — les deux petits carrés le marquent. C'est "
                    "exactement ce qu'il faut pour tenir un plan : sa direction normale."},
        {"caption": "Le plan (ABC) apparaît, tenu par cette normale. Les coefficients de son équation "
                    "SONT les coordonnées de n : x + y + z + d = 0. La constante d se fixe en imposant "
                    "que A soit dessus, ce qui donne d = 1."},
        {"caption": "Entre en scène la sphère (S), de centre Ω(2, −1, 1) et de rayon R = √5 ≈ 2,24. "
                    "La question devient géométrique : ce plan la traverse-t-il, l'effleure-t-il, ou "
                    "passe-t-il à côté ?"},
        {"caption": "On mesure la distance de Ω au plan : √3 ≈ 1,73. Regarde où la perpendiculaire "
                    "atterrit — exactement sur C. Ce n'est pas un hasard : ΩC = (−1, −1, −1) est "
                    "colinéaire à n, donc C EST le pied de la perpendiculaire."},
        {"caption": "√3 < √5 : la distance est plus petite que le rayon, donc le plan entre dans la "
                    "sphère et la coupe selon un cercle (Γ). Pythagore donne son rayon : "
                    "√(R² − d²) = √(5 − 3) = √2, centré en C."},
    ],
}
(SORTIE / f"{SLUG}.stages.json").write_text(
    json.dumps(stages, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

print(f"AB∧AC = {tuple(int(v) for v in N)}   d(Ω,plan) = √{D_OMEGA**2:.0f} ≈ {D_OMEGA:.3f}")
print(f"pied H = {tuple(round(v, 3) for v in H)}   (C = {C})   → H == C : {all(abs(a-b)<1e-9 for a,b in zip(H, C))}")
print(f"rayon du cercle = √{R_CERCLE**2:.0f} ≈ {R_CERCLE:.3f}")
print(f"écrit : {(SORTIE / (SLUG + '.svg')).relative_to(RACINE)}  (+ .stages.json)")
