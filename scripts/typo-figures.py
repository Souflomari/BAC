#!/usr/bin/env python3
"""Typographie française dans le TEXTE des figures.

`remarkFrenchTypography` normalise la prose des leçons ; les étiquettes des
figures, elles, sont écrites à la main dans les SVG et n'ont jamais rien vu
passer. Résultat mesuré le 2026-09-05 : 654 écarts dans 201 fichiers, et le
même mot rendu de deux façons à trois centimètres d'écart selon qu'il est
dans le corps ou dans une figure.

CE QU'ON TOUCHE, et rien d'autre :
  · le CONTENU de <text>, <tspan>, <title>, <desc> ;
  · la valeur de l'attribut `aria-label` (c'est ce qu'un lecteur d'écran
    prononce : il mérite la même langue que le reste).

CE QU'ON NE TOUCHE PAS, et pourquoi :
  · les COMMENTAIRES XML — ils portent le raisonnement de l'auteur, pas du
    texte rendu, et les réécrire brouillerait les diffs sans rien gagner ;
  · le POINT D'EXCLAMATION. En français il prend une insécable fine ; en
    maths, `n!` est une factorielle, et « n ! » serait faux. Le corpus de
    dénombrement en est plein. On laisse `!` tranquille — angle mort ASSUMÉ,
    écrit ici pour que personne ne le « corrige » demain sans y penser ;
  · `:` suivi d'un CHIFFRE (`1:2`, `12:30`) — un rapport ou une heure ;
  · l'apostrophe qui n'est pas ENTRE DEUX LETTRES : `f'(x)` est une dérivée,
    pas une élision.
"""
import re, sys, glob
import xml.etree.ElementTree as ET

NNBSP = " "
NBSP = " "
LETTRE = r"[^\W\d_]"
RE_ENTITE = re.compile(r"&#?\w+;")
SENTINELLE = "\uE000"

RE_APO = re.compile(rf"({LETTRE})'({LETTRE})", re.UNICODE)
# Une lettre, un CHIFFRE, une parenthèse fermante ou un guillemet fermant ;
# une espace ordinaire facultative ; puis ; : ?. Le chiffre compte : « (0 ; 0) »
# et « étape 3 : » sont du français comme le reste. Le garde `(?!\d)` protège
# les rapports et les heures (`1:2`, `12:30`).
# La SENTINELLE compte comme fin de mot : une lettre écrite en entité
# (`&#x3A9;` pour Ω) est masquée avant l'application des règles, et sans cela
# « &#x3A9; : 9 boules » échappait à la normalisation — le seul cas resté
# debout après deux passes, trouvé par la sonde.
RE_HAUTE = re.compile(rf"({LETTRE}|\d|\)|»|{SENTINELLE})[ {NBSP}]?([;:?])(?!\d)", re.UNICODE)
RE_GUILL_OUVR = re.compile(rf"«[ {NBSP}]?(?=\S)")
RE_GUILL_FERM = re.compile(rf"(?<=\S)[ {NBSP}]?»")

# LES ENTITÉS XML D'ABORD, et c'est un piège payé en dur (2026-09-05) :
# `t&#183;u` (un point médian) se termine par un `;` précédé d'un CHIFFRE.
# La règle de la ponctuation haute y voyait « 3 ; » et écrivait `t&#183 ;u` —
# entité coupée, SVG qui ne parse plus. Huit figures cassées d'un coup. On
# masque donc toute entité avant de toucher au texte, et on la remet après.
# Les ESPACES écrites en entité (`&#160;`, `&nbsp;`) doivent redevenir des
# caractères AVANT le masquage : sinon la règle voit une sentinelle là où il y
# a une espace, et « pH&#160;: » échappe à la normalisation. Trouvé par la
# sonde, sur `echelle-acide-neutre-basique` — un seul cas, mais il disait que
# la passe avait un trou.
RE_ESPACE_ENTITE = re.compile(r"&(?:nbsp|#160|#xA0|#x00A0);", re.I)
RE_FINE_ENTITE = re.compile(r"&(?:#8239|#x202F);", re.I)

def normaliser(t: str) -> str:
    t = RE_ESPACE_ENTITE.sub(NBSP, t)
    t = RE_FINE_ENTITE.sub(NNBSP, t)
    entites = []
    def masquer(m):
        entites.append(m.group(0))
        return SENTINELLE + str(len(entites) - 1) + SENTINELLE
    t = RE_ENTITE.sub(masquer, t)
    t = RE_APO.sub(r"\1’\2", t)
    t = RE_HAUTE.sub(rf"\1{NNBSP}\2", t)
    t = RE_GUILL_OUVR.sub(f"«{NNBSP}", t)
    t = RE_GUILL_FERM.sub(f"{NNBSP}»", t)
    t = re.sub(SENTINELLE + r"(\d+)" + SENTINELLE, lambda m: entites[int(m.group(1))], t)
    return t

BALISES = re.compile(r"(<(text|tspan|title|desc)\b[^>]*>)(.*?)(</\2>)", re.S)
ARIA = re.compile(r'(aria-label=")([^"]*)(")')
COMMENTAIRE = re.compile(r"<!--.*?-->", re.S)

def traiter(src: str) -> tuple[str, int]:
    """Réécrit hors commentaires ; rend (texte, nombre de changements)."""
    morceaux, pos = [], 0
    for c in COMMENTAIRE.finditer(src):
        morceaux.append((src[pos:c.start()], True))
        morceaux.append((c.group(0), False))
        pos = c.end()
    morceaux.append((src[pos:], True))

    n = 0
    out = []
    for texte, traitable in morceaux:
        if not traitable:
            out.append(texte)
            continue
        def repl_balise(m):
            nonlocal n
            # Le contenu peut porter des sous-balises (<tspan>) : on ne
            # normalise que les segments de TEXTE, jamais le balisage.
            interne = re.split(r"(<[^>]+>)", m.group(3))
            neuf = []
            precedent_mot = False   # le segment de texte précédent finit-il par un mot ?
            for seg in interne:
                if seg.startswith("<"):
                    neuf.append(seg)
                    continue
                v = normaliser(seg)
                # LE CAS DE LA FRONTIÈRE : `<text>Ω<tspan> : 9 boules</tspan></text>`
                # découpe « Ω » et « : 9 boules » en deux segments, et la règle
                # de la ponctuation haute — qui veut voir un mot AVANT — ne
                # mord dans aucun des deux. Trouvé par la sonde, sur
                # `univers-restreint` ; sans ce rattrapage, la passe laisse
                # exactement les cas que le balisage a coupés en deux.
                if precedent_mot:
                    v = re.sub(rf"^[ {NBSP}]?([;:?])(?!\d)", rf"{NNBSP}\1", v)
                if v != seg:
                    n += 1
                neuf.append(v)
                if seg.strip():
                    precedent_mot = bool(re.search(r"[^\W\d_]|\d|\)|»$", seg.rstrip()[-1:]))
            return m.group(1) + "".join(neuf) + m.group(4)
        texte = BALISES.sub(repl_balise, texte)
        def repl_aria(m):
            nonlocal n
            v = normaliser(m.group(2))
            if v != m.group(2):
                n += 1
            return m.group(1) + v + m.group(3)
        texte = ARIA.sub(repl_aria, texte)
        out.append(texte)
    return "".join(out), n

RE_BALISE = re.compile(r"</?([a-zA-Z][\w:-]*)")

def invariants(src: str):
    """Ce qu'une passe TYPOGRAPHIQUE n'a pas le droit de changer.

    234 figures du corpus n'ont jamais parsé au sens strict (entités HTML non
    déclarées) : le contrôle de parsabilité seul y serait aveugle, et c'est
    précisément là qu'une casse passerait inaperçue. Ces deux invariants-là,
    eux, tiennent pour TOUS les fichiers — et ils auraient attrapé la casse
    de `&#183;` du premier jet, où une entité devenait « &#183 ; ».
    """
    # Les entités d'ESPACE sont canonicalisées des deux côtés : les convertir
    # en caractères est justement ce que la passe fait exprès (`pH&#160;:` doit
    # pouvoir devenir `pH :`), et l'invariant ne doit pas confondre cette
    # conversion voulue avec la casse d'une entité comme `&#183;`.
    canon = RE_FINE_ENTITE.sub(NNBSP, RE_ESPACE_ENTITE.sub(NBSP, src))
    return (
        tuple(sorted(RE_ENTITE.findall(canon))),  # les entités, une à une
        tuple(RE_BALISE.findall(canon)),          # la structure des balises
    )

def parse_ok(src: str) -> bool:
    try:
        # `ET` refuse les entités HTML non déclarées (&nbsp;) que certains
        # SVG du corpus utilisent déjà : on ne juge donc pas la parsabilité
        # dans l'absolu, mais la NON-RÉGRESSION — c'est l'appelant qui
        # compare à l'état d'avant.
        ET.fromstring(src)
        return True
    except ET.ParseError:
        return False

def main():
    ecrire = "--ecrire" in sys.argv
    casses = []
    motifs = [a for a in sys.argv[1:] if not a.startswith("--")] or ["content/*/*/media/*.svg"]
    fichiers = sorted(f for m in motifs for f in glob.glob(m))
    total, touches = 0, 0
    for f in fichiers:
        src = open(f, encoding="utf-8").read()
        neuf, n = traiter(src)
        # NON-RÉGRESSION, et pas parsabilité dans l'absolu : 234 figures du
        # corpus utilisent déjà des entités HTML non déclarées (&nbsp;) que
        # `ET` refuse. Les juger « cassées » ferait rejeter presque tout le
        # corpus — et masquerait les vraies casses. On ne refuse donc une
        # réécriture que si elle casse un fichier qui parsait AVANT.
        if n and (invariants(src) != invariants(neuf) or (parse_ok(src) and not parse_ok(neuf))):
            # L'INSTRUMENT NE LIVRE PAS CE QU'IL A CASSÉ. Une réécriture qui
            # rend un SVG illisible n'est pas une réécriture : on la refuse,
            # fichier par fichier, et on le dit.
            print(f"  ✗ {f} : la réécriture casserait le XML — fichier laissé intact")
            casses.append(f)
            continue
        if n:
            touches += 1
            total += n
            if ecrire:
                open(f, "w", encoding="utf-8").write(neuf)
    verbe = "réécrit" if ecrire else "à réécrire"
    print(f"{total} segment(s) {verbe} dans {touches} fichier(s) sur {len(fichiers)}.")
    if casses:
        print(f"{len(casses)} fichier(s) refusé(s) parce que la réécriture cassait leur XML.")

main()
