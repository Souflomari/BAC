"""Identité visuelle des explications animées.

Chaque constante reflète un token de web/src/lib/tokens.ts (thème light).
RÈGLE : un changement de token là-bas implique une mise à jour ici, dans
le même esprit que TOKENS.md — la revue vérifie la correspondance.
"""

from manim import Tex, MathTex, Text, Mobject, TexTemplate

# ── Surfaces ────────────────────────────────────────────── tokens.ts
BAC_BG = "#F4EFE6"            # --color-surface-base
BAC_SURFACE_RAISED = "#FBF7F0"  # --color-surface-raised
BAC_BORDER = "#E6DECF"        # --color-border-subtle
BAC_BORDER_SOFT = "#D2C6B2"   # --color-border-soft

# ── Encre ───────────────────────────────────────────────────────────
BAC_INK = "#2A2018"           # --color-text-primary
BAC_INK_SOFT = "#5C5043"      # --color-text-secondary
BAC_INK_MUTED = "#8A7E6E"     # --color-text-tertiary

# ── Accent (sarcelle) ───────────────────────────────────────────────
BAC_ACCENT = "#1F6F6B"        # --color-accent
BAC_ACCENT_STRONG = "#185C58" # --color-accent-strong
BAC_ACCENT_LIGHT = "#5FB6AE"  # --color-accent-light
BAC_ACCENT_SUBTLE = "#E4F0EE" # --color-accent-subtle

# ── États ───────────────────────────────────────────────────────────
BAC_SUCCESS = "#3F6B4E"       # --color-success
BAC_WARNING = "#8A6A1E"       # --color-warning
BAC_ERROR = "#9A3B2E"         # --color-error


# Préambule LaTeX minimal : le gabarit par défaut de Manim exige une
# distribution TeX lourde (physics, calligra, tipa…) ; nos scènes n'ont
# besoin que d'amsmath/amssymb + le français — ce qui rend l'install
# native légère (texlive-latex-base + latex-extra + fonts-recommended).
BAC_TEX = TexTemplate(
    preamble=r"""
\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage{amsmath}
\usepackage{amssymb}
"""
)


def apply_defaults() -> None:
    """Encre et gabarit TeX par défaut — appelé par BacScene."""
    Mobject.set_default(color=BAC_INK)
    Tex.set_default(color=BAC_INK, tex_template=BAC_TEX)
    MathTex.set_default(color=BAC_INK, tex_template=BAC_TEX)
    Text.set_default(color=BAC_INK)
