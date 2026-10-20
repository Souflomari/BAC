#!/usr/bin/env python3
"""Sabotages du PRODUIT pour la porte scene-champ-pentes (« ce que l'équation dit en chaque point »,
maths/equations-differentielles ; ADR 0038 ; spec docs/pipeline/propositions/
maths-equations-differentielles-scene-pentes.md §11.4), posés dans l'arbre à part $ARBRE.
Chaque sabotage nomme la ou les familles qui DOIVENT rougir (« a+b »), ou « VERT » pour un contre-essai.
Un marqueur `/* SABOTAGE */` (TS/TSX) ou une clé inerte `"_sabotage"` (JSON) rend la retouche traçable.
Les « # PRÉVU : » disent ce que la LECTURE de la porte laisse attendre AVANT toute mesure (ADR 0034).

Écarts à la liste de la spec, écrits avant le lancement :
 · n° 3 (pente qui dépend de x) : sabotée au DESSIN seulement — le modèle ne connaît pas x ; N3 (les
   lectures) ne peut donc pas rougir, seule `segment-a-la-bonne-pente` le peut. PRÉVU : celle-là seule.
 · n° 12 ter (seuil au-dessus du plancher) est un sabotage de la PORTE, pas du produit : rejoué à part.
 · n° 26 (un cran a = 0) n'est pas posable sans faire jeter le modèle (−b/0) : non outillé, écrit ici.
 · n° 22 quater, second volet, et n° 22 bis, jumeau : dans la construction, `a` n'existe à S6 qu'après
   la révélation par la règle commune (aucun contrôle avant le pari) — le sabotage « a présent avant »
   ouvre tout avant le pari (même règle), et `avant-pari` doit rougir.
usage: sabotages.py <nom> appliquer|retirer|famille ; --liste ; --verifier-tout."""
import sys, os
RACINE = os.environ.get("ARBRE")
if not RACINE:
  sys.exit("ARBRE non posé : le chemin de l'arbre À PART où poser les sabotages (jamais l'arbre de travail)")
W = RACINE + "/web/"
M = W + "src/lib/scene2d/champ-pentes-modele.ts"
R = W + "src/lib/scene2d/champ-pentes-rendu.ts"
P = W + "src/components/notion/scene/ChampPentesPanel.tsx"
D = RACINE + "/content/maths/equations-differentielles/media/champ-des-pentes.json"

PENTE_R = "      const m = e.a * y + e.b;"
PENTE_M = "  return plus(fois(COEF_Q[a], q(y0)), TERME_Q[b]);"
DXDY = "      const dx = (L / 2) / n, dy = (L / 2) * (m / n);"
COURBE = "        const f = (x: number) => k + (cy0 - k) * Math.exp(e.a * (x - cx0));"
LEVE = "          if (!(y > ya - 2 && y < yb + 2)) {"
ECHELLE = "  const X = (x: number) => ox + x * s, Y = (y: number) => oy - y * s;"
PALIER_P = "      palier: palierVu ? { hauteur: M.valeur(k), accent: palierAccent } : null,"
MFIXE = "  const mFixe = M.pente(etat.a, etat.b, M.POINT_FIXE[1]);"
CHAMP_AFF = '  const champAffiche: M.Champ = revele ? etat.champ : champPose === "plan" ? "plan" : "aucun";'
COURBES_P = '  const courbes: [number, number][] = !revele ? [] : etat.famille === "une" ? [[px, py]] : etat.famille === "trois" ? M.DEPARTS.map((d) => [...M.POINT_XY[d]] as [number, number]) : [];'
OUVRE = "  const ouvre = (c: string) => pari.etapeOuverte && etape.controles.includes(c);"
BOUCLE_I = "        for (let i = xa; i <= xb; i++) {\n          if (surLaRangee(j)) continue;"
LONGUEUR = "    const L = longueurSegment(cote);"
TEXQ = "export function texQ(x: Q): string {\n  if (x.d === 1) return `${x.n}`;"
SUITE_S1 = 'de combien de carreaux descend-il ?",'
SUITE_S3 = 'quand $b$ passe de $1$ à $2$ ?",'
RETOUR_VMI = "Regarde l'inclinaison des segments **au-dessous** de la ligne plate, et **compare-la à celle des segments au-dessus** : ce n'est pas la même chose."
CTRL_S2 = '      "controles": ["champ", "point"],'
CTRL_S4 = '      "controles": ["a", "b"],\n      "crans": { "a": ["-0.5", "0.5"] },'
ETAT_S6 = '      "etat": { "a": "-0.5", "b": "1", "point": "sur", "champ": "plan", "famille": "aucune" },'
CTRL_S6 = '      "controles": ["a", "b", "point", "champ", "famille"],'

def S1(nom, phrase):
  """une forme interdite glissée à la fin de la `suite` de S1 (affichée après le pari de S1)"""
  return [(D, SUITE_S1, SUITE_S1[:-2] + " " + phrase + '", "_sabotage": "' + nom + '",')]

S = {
 # ── LES PENTES (§11.1 N1, §11.2) ──
 # 1 — pente = a + y. PRÉVU : nombres (N1 dès S1) + segment-a-la-bonne-pente.
 "pente-a-plus-y": ("nombres+segment-a-la-bonne-pente", [(M, PENTE_M, "  return plus(COEF_Q[a], q(y0)); /* SABOTAGE : pente = a + y */"), (R, PENTE_R, "      const m = e.a + y; /* SABOTAGE : pente = a + y */")]),
 # 2 — pente = a, tous les segments parallèles (ed-comme-primitive posé dans le code). PRÉVU : segment seule.
 "pente-constante": ("segment-a-la-bonne-pente", [(R, PENTE_R, "      const m = e.a; /* SABOTAGE : tous parallèles */")]),
 # 3 — la pente dépend de x (modele-sans-ecart posé dans le code) — LE sabotage de la campagne. PRÉVU : segment seule.
 "pente-depend-de-x": ("segment-a-la-bonne-pente", [(R, PENTE_R, "      const m = (e.a * y + e.b) / (1 + 0.06 * (x + 8)); /* SABOTAGE : la pente dépend de x */")]),
 # 4 — pentes-comparees toujours égales. PRÉVU : nombres (N3, second sens).
 "comparees-toujours-egales": ("nombres", [(P, MFIXE, "  const mFixe = M.pente(etat.a, etat.b, M.POINT_XY[etat.point][1]); /* SABOTAGE : toujours égales */")]),
 # 5 — pentes-comparees toujours différentes. PRÉVU : nombres (N3, premier sens).
 "comparees-toujours-differentes": ("nombres", [(P, MFIXE, "  const mFixe = M.pente(etat.a, etat.b, M.POINT_FIXE[1] + 1); /* SABOTAGE : toujours différentes */")]),
 # ── LA LIGNE DU PALIER (§11.2) ──
 # 6, 7, 8 — la ligne tracée à b, à +b/a, à 0. PRÉVU : ligne-du-palier (la lecture palier reste juste).
 "ligne-a-b": ("ligne-du-palier", [(P, PALIER_P, "      palier: palierVu ? { hauteur: M.valeur(M.TERME_Q[etat.b]), accent: palierAccent } : null, /* SABOTAGE : la ligne à b */")]),
 "ligne-a-plus-b-sur-a": ("ligne-du-palier", [(P, PALIER_P, "      palier: palierVu ? { hauteur: -M.valeur(k) || 0, accent: palierAccent } : null, /* SABOTAGE : la ligne à +b/a */")]),
 "ligne-a-zero": ("ligne-du-palier", [(P, PALIER_P, "      palier: palierVu ? { hauteur: 0, accent: palierAccent } : null, /* SABOTAGE : la ligne sur l'axe */")]),
 # 9 — la ligne juste, le champ non plat dessus (le champ en a·y). PRÉVU : ligne-du-palier (second volet) + segment.
 "champ-sans-b": ("ligne-du-palier+segment-a-la-bonne-pente", [(R, PENTE_R, "      const m = e.a * y; /* SABOTAGE : le champ oublie b */")]),
 # ── LES COURBES (§11.2) ──
 # 10 — la courbe plafonnée au bord (au lieu d'être coupée). PRÉVU : courbe-clippee-pas-plafonnee.
 "courbe-plafonnee": ("courbe-clippee-pas-plafonnee", [(R, COURBE, "        const f = (x: number) => Math.max(ya + 0.05, Math.min(yb - 0.05, k + (cy0 - k) * Math.exp(e.a * (x - cx0)))); /* SABOTAGE : plafonnée */")]),
 # 11 — la courbe bornée avant le bord (à a > 0, elle ne sort plus). PRÉVU : la même famille, second sens.
 "courbe-bornee": ("courbe-clippee-pas-plafonnee", [(R, COURBE, "        const f = (x: number) => Math.min(5.2, k + (cy0 - k) * Math.exp(e.a * (x - cx0))); /* SABOTAGE : bornée, ne sort plus */")]),
 # 12 — la courbe sans le palier (y₀·e^{ax}) : elle franchit la ligne. PRÉVU : courbe-jamais-sur-le-palier (S4) + nombres (N7) + courbes-jamais-confondues.
 "courbe-sans-palier": ("courbes-jamais-confondues+nombres", [(R, COURBE, "        const f = (x: number) => cy0 * Math.exp(e.a * (x - cx0)); /* SABOTAGE : palier oublié */")]),
 # 12 bis — la fenêtre trop large (x ∈ [−2 ; 10]). PRÉVU : isotropie (la fenêtre lue) ; les séparations aussi.
 "fenetre-large": ("isotropie", [(M, "export const FENETRE = { x: [-8, 4], y: [-6, 6] } as const;", "export const FENETRE = { x: [-2, 10], y: [-6, 6] } as const; /* SABOTAGE : la fenêtre de la première rédaction */")]),
 # 13 — le point fixe incliné d'un rien : la solution constante ne l'est plus. PRÉVU : point-fixe.
 "point-fixe-incline": ("point-fixe", [(R, COURBE, "        const f = (x: number) => k + (cy0 - k) * Math.exp(e.a * (x - cx0)) + 0.04 * (x - cx0); /* SABOTAGE : la constante inclinée */")]),
 # 14 — repère anisotrope (y ×1,2). PRÉVU : isotropie + segment-a-la-bonne-pente.
 "anisotrope": ("isotropie+segment-a-la-bonne-pente", [(R, ECHELLE, "  const X = (x: number) => ox + x * s, Y = (y: number) => oy - y * s * 1.2; /* SABOTAGE : anisotrope */")]),
 # 15 — longueur proportionnelle à la pente. PRÉVU : segment-longueur-fixe.
 "longueur-selon-pente": ("segment-longueur-fixe", [(R, DXDY, "      const dx = ((L / 2) * (1 + Math.abs(m) / 6)) / n, dy = ((L / 2) * (1 + Math.abs(m) / 6)) * (m / n); /* SABOTAGE : longueur selon la pente */")]),
 # 16 — pas du champ à 2. PRÉVU : champ-lisible.
 "pas-de-deux": ("champ-lisible", [(R, BOUCLE_I, "        for (let i = xa; i <= xb; i++) {\n          if ((i + j) % 2 !== 0) continue; /* SABOTAGE : un point sur deux */\n          if (surLaRangee(j)) continue;")]),
 # 16 bis — segments de 40 px (au bureau : 44,7 − 40 < 6 px d'écart). PRÉVU : champ-lisible (second volet).
 "segments-longs": ("champ-lisible", [(R, LONGUEUR, "    const L = longueurSegment(cote) + 18; /* SABOTAGE : segments trop longs */")]),
 # ── L'ÉCRITURE (§11.1 N5, N6) ──
 # 17 — une lecture arrondie à deux décimales (3,50 pour 7/2). PRÉVU : nombres.
 "deux-decimales": ("nombres", [(M, TEXQ, "export function texQ(x: Q): string {\n  if (x.d === 2) return (x.n / x.d).toFixed(2).replace(\".\", \"{,}\"); /* SABOTAGE : deux décimales */\n  if (x.d === 1) return `${x.n}`;")]),
 # ── AVANT LE PARI (§11.2) ──
 # 19 — les courbes tracées avant le pari. PRÉVU : avant-pari.
 # Réécrit le 2026-10-20 : la version d'origine (retirer « !revele ? [] : ») était INERTE — l'état POSÉ de chaque
 # étape porte famille « aucune », la famille n'apparaît que dans etat_revele ; retirer la garde ne dessinait rien
 # (campagne : « MANQUÉ — porte VERTE », verdict AMBIGU au sens de l'ADR 0038). Celle-ci dessine AVANT le pari les
 # courbes que l'étape révélera.
 "courbe-avant-pari": ("avant-pari", [(P, COURBES_P, '  const famAvant = etape.etat_revele?.famille ?? etat.famille; const courbes: [number, number][] = famAvant === "une" ? [[px, py]] : famAvant === "trois" ? M.DEPARTS.map((d) => [...M.POINT_XY[d]] as [number, number]) : []; /* SABOTAGE : courbes avant le pari */')]),
 # 20 — le champ retiré de l'énoncé de S4–S6. PRÉVU : avant-pari (second sens).
 "champ-absent-de-l-enonce": ("avant-pari", [(P, CHAMP_AFF, '  const champAffiche: M.Champ = revele ? etat.champ : "aucun"; /* SABOTAGE : le champ retiré de l\'énoncé */')]),
 # 21 — un segment en P à S3 avant la révélation. PRÉVU : avant-pari.
 "segment-a-S3": ("avant-pari", [(P, CHAMP_AFF, '  const champAffiche: M.Champ = revele ? etat.champ : champPose === "plan" ? "plan" : "un-point"; /* SABOTAGE : un segment avant le pari */')]),
 # 22 — `point` ouvert à S4. PRÉVU : fuite-inter-etapes.
 "point-a-S4": ("fuite-inter-etapes", [(D, CTRL_S4, '      "_sabotage": "point-a-S4",\n      "controles": ["a", "b", "point"],\n      "crans": { "a": ["-0.5", "0.5"] },')]),
 # 22 bis jumeau — `point` NON ouvert après la révélation de S2. PRÉVU : fuite-inter-etapes.
 "point-ferme-a-S2": ("fuite-inter-etapes", [(D, CTRL_S2, '      "_sabotage": "point-ferme-a-S2",\n      "controles": ["champ"],')]),
 # 22 bis — les contrôles ouverts AVANT le pari (toutes étapes). PRÉVU : avant-pari.
 "controles-avant-pari": ("avant-pari", [(P, OUVRE, "  const ouvre = (c: string) => etape.controles.includes(c); /* SABOTAGE : contrôles avant le pari */")]),
 # 22 ter — le cran −1 offert à S4. PRÉVU : fuite-inter-etapes + stem-non-contamine.
 "cran-moins-un-a-S4": ("fuite-inter-etapes+stem-non-contamine", [(D, CTRL_S4, '      "_sabotage": "cran-moins-un-a-S4",\n      "controles": ["a", "b"],\n      "crans": { "a": ["-1", "-0.5", "0.5"] },')]),
 # 22 ter jumeau — deux crans seulement à S6. PRÉVU : fuite-inter-etapes (+ nombres : N10 ne peut plus poser −1).
 "deux-crans-a-S6": ("fuite-inter-etapes", [(D, CTRL_S6, '      "_sabotage": "deux-crans-a-S6",\n      "controles": ["a", "b", "point", "champ", "famille"],\n      "crans": { "a": ["-0.5", "0.5"] },')]),
 # 24 — a = −1 POSÉ à S6 (au lieu de révélé). PRÉVU : stem-non-contamine (+ etapes, avant-pari : la valeur de a).
 "moins-un-pose-a-S6": ("stem-non-contamine", [(D, ETAT_S6, '      "_sabotage": "moins-un-pose-a-S6",\n      "etat": { "a": "-1", "b": "1", "point": "sur", "champ": "plan", "famille": "aucune" },')]),
 # ── LA FORMULE GRADUÉE (§7.7 C) ──
 # 23 — « palier » dans la suite de S1 ; « a = −1 » dans celle de S3. PRÉVU : formule-graduee.
 "palier-a-S1": ("formule-graduee", S1("palier-a-S1", "Là où il vaut zéro, c'est le palier.")),
 "moins-un-a-S3": ("formule-graduee", [(D, SUITE_S3, SUITE_S3[:-2] + ' Essaie aussi $a = -1$.", "_sabotage": "moins-un-a-S3",')]),
 # 23 quinquies — « au-dessous … montent » à S4. PRÉVU : formule-graduee.
 "au-dessous-montent": ("formule-graduee", [(D, RETOUR_VMI, "Regarde les segments **au-dessous** de la ligne plate : ils montent.")]),
 # ── LA FRONTIÈRE (§9), une forme à la fois, dans la suite de S1 ──
 "f-exponentielle": ("frontiere", S1("f-exponentielle", "La solution est une exponentielle.")),
 "f-ce-ax": ("frontiere", S1("f-ce-ax", "Les solutions sont $y = Ce^{ax}$.")),
 "f-condition-initiale": ("frontiere", S1("f-condition-initiale", "Une condition initiale fixe la courbe.")),
 "f-second-ordre": ("frontiere", S1("f-second-ordre", "Au second ordre, c'est autre chose.")),
 "f-tasse": ("frontiere", S1("f-tasse", "C'est la tasse de café du chapitre 1.")),
 "f-volt": ("frontiere", S1("f-volt", "En volts, ce serait une charge de condensateur.")),
 "f-euler": ("frontiere", S1("f-euler", "La méthode d'Euler suit ces segments pas à pas.")),
 "f-isocline": ("frontiere", S1("f-isocline", "Ce dessin s'appelle un champ des pentes.")),
 "f-unicite": ("frontiere", S1("f-unicite", "Par unicité, une seule courbe passe par P.")),
 "f-examen": ("frontiere", S1("f-examen", "Au bac, ce piège revient souvent.")),
 "f-second-membre": ("frontiere", S1("f-second-membre", "Avec un second membre f(x), rien ne change.")),
 # ── CONTRE-ESSAIS (doivent laisser la porte VERTE) ──
 # le mot « piège » SEUL (§9.12) ; un nombre hors grille DANS un choix (§9.10, borné aux lectures et au badge)
 "ce-piege-seul": ("VERT", S1("ce-piege-seul", "Attention au piège.")),
 # ── L'IMPORT DE THREE ──
 "import-three": ("pas-de-3d", [(R, 'import { tailleTexte } from "./texte";', 'import { tailleTexte } from "./texte";\nimport * as THREE_SAB from "three"; /* SABOTAGE */\n(globalThis as unknown as { __THREE__?: string }).__THREE__ = String(THREE_SAB.REVISION);')]),
}
def lire(f): return open(f, encoding="utf-8").read()
def ecrire(f, s): open(f, "w", encoding="utf-8").write(s)
def appliquer(nom):
  for f, a, b in S[nom][1]:
    s = lire(f)
    if s.count(a) != 1: sys.exit(f"{nom} : ancre trouvée {s.count(a)} fois dans {f}")
    ecrire(f, s.replace(a, b))
  print(f"{nom} : appliqué")
def retirer(nom):
  for f, a, b in reversed(S[nom][1]):
    s = lire(f)
    if s.count(b) != 1: sys.exit(f"{nom} : trace trouvée {s.count(b)} fois dans {f}")
    ecrire(f, s.replace(b, a))
  print(f"{nom} : retiré")
if sys.argv[1] == "--liste": print(" ".join(S)); sys.exit(0)
if sys.argv[1] == "--verifier-tout":
  bad = [f"{n}:{f.split('/')[-1]}:{lire(f).count(a)}" for n, (_, e) in S.items() for f, a, _ in e if lire(f).count(a) != 1]
  print("ancres uniques partout" if not bad else "ANCRES FAUTIVES : " + " ".join(bad)); sys.exit(1 if bad else 0)
nom, op = sys.argv[1], sys.argv[2]
{"appliquer": appliquer, "retirer": retirer, "famille": lambda n: print(S[n][0])}[op](nom)
