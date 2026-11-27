#!/usr/bin/env python3
"""Typographie française À L'INTÉRIEUR des `\\text{…}` des formules.

Le français d'une formule est du français : `\\text{Événements incompatibles :}`
mérite la même espace insécable que la phrase au-dessus, et `\\text{c'est-à-dire}`
la même apostrophe.

DEUX RÈGLES, ET UNE INTERDICTION MESURÉE :
  · l'apostrophe droite entre deux lettres devient `’` — KaTeX la rend sans
    broncher (vérifié) ;
  · l'espace devant `;` `:` `?` devient `\\,` — LA FINE DE LATEX, pas U+202F.
    Mesuré le 2026-09-05 : `katex.renderToString` refuse U+202F
    (« Unrecognized Unicode character (8239) », « No character metrics ») et
    U+00A0 (160). Poser dans une formule l'insécable fine qu'on pose dans la
    prose produirait des avertissements et un glyphe sans métrique. `\\,` est
    la façon dont LaTeX écrit cette espace depuis toujours.
  · le POINT D'EXCLAMATION est laissé tranquille — factorielle (voir
    scripts/typo-figures.py, même raison).
"""
import re, sys, glob

TEXT = re.compile(r"(\\(?:text|textbf|textit|mathrm)\{)([^{}]*)(\})")
APO = re.compile(r"([^\W\d_])'([^\W\d_])", re.UNICODE)
# La parenthèse fermante et le guillemet comptent comme fin de mot :
# « \\text{(cas idéal) :} » veut sa fine comme le reste.
HAUTE = re.compile(r"([^\W\d_]|\d|\)|»)[ ]?([;:?])(?!\d)", re.UNICODE)

def normaliser(t: str) -> str:
    t = APO.sub(r"\1’\2", t)
    t = HAUTE.sub(r"\1\\,\2", t)
    return t

def traiter(src: str):
    n = 0
    def repl(m):
        nonlocal n
        v = normaliser(m.group(2))
        if v != m.group(2):
            n += 1
        return m.group(1) + v + m.group(3)
    return TEXT.sub(repl, src), n

def main():
    ecrire = "--ecrire" in sys.argv
    motifs = [a for a in sys.argv[1:] if not a.startswith("--")] or [
        "content/*/*/lesson.md", "content/*/*/*.yaml",
    ]
    fichiers = sorted(f for m in motifs for f in glob.glob(m))
    total = touches = 0
    for f in fichiers:
        src = open(f, encoding="utf-8").read()
        neuf, n = traiter(src)
        if n:
            total += n
            touches += 1
            if ecrire:
                open(f, "w", encoding="utf-8").write(neuf)
    print(f"{total} span(s) \\text{{}} {'réécrit' if ecrire else 'à réécrire'} dans {touches} fichier(s).")

main()
