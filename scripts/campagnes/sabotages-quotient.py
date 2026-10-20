#!/usr/bin/env python3
"""Sabotages du PRODUIT pour la porte scene-quotient (« l'échelle des quotients », pc/evolution-spontanee ;
ADR 0038, spec docs/pipeline/propositions/pc-evolution-spontanee-scene-quotient.md §11.4), posés dans l'arbre
à part $ARBRE. Chaque sabotage nomme la famille qui DOIT rougir — le nom que la porte émet
(`juger("<famille>", …)`) : N1–N12 → `nombres`, N13 → `decades-affirmees`. Plusieurs familles exigées
s'écrivent « a+b » (la campagne exige chacune). « VERT » marque un CONTRE-ESSAI : la porte doit rester verte.
Un marqueur `/* SABOTAGE */` (TS/TSX) ou une clé inerte `"_sabotage": "<nom>"` (JSON, ignorée par le
chargeur `lib/content.ts` et par la porte) rend chaque retouche traçable et retirable.

Les « # PRÉVU : » disent ce que la LECTURE de la porte laisse attendre, avant toute mesure — ce ne sont
pas des résultats (ADR 0034 : un rouge ne prouve rien sans le vert qui l'a précédé, dans ce dossier).

Contre-essais de la spec SANS sabotage à outiller — le produit propre les porte déjà, la passe propre de la
campagne les mesure : 16 (les quatre CHOIX de S4 sont des expressions ; la porte juge elle-même « un choix
n'est pas une lecture »), 24 (l'unité des boutons radio et de `melange` à S5), 29 (le chevron légitime :
bain A à S3, bain C à S4), et le contre-essai N13 (les comptes justes de la colonne « attendu »).

usage: sabotages.py <nom> appliquer|retirer|famille ; --liste ; --verifier-tout."""
import sys, os
RACINE = os.environ.get("ARBRE")
if not RACINE:
  sys.exit("ARBRE non posé : le chemin de l'arbre À PART où poser les sabotages (jamais l'arbre de travail)")
W = RACINE + "/web/"
M = W + "src/lib/scene2d/quotient-modele.ts"
R = W + "src/lib/scene2d/quotient-rendu.ts"
P = W + "src/components/notion/scene/QuotientPanel.tsx"
D = RACINE + "/content/pc/evolution-spontanee/media/echelle-des-quotients.json"

QRI = "export const qri = (s: Etat): Quotient => quotientDe(VALEUR_CRAN[s.produit], VALEUR_CRAN[s.oxydant], COUPLES[s.bain].n);"
CRIT = "  const c = compare(qri(s), COUPLES[s.bain].K);"
EQ_A = r'    equationTex: "Zn_{(s)} + Cu^{2+}_{(aq)} \\underset{(2)}{\\overset{(1)}{\\rightleftharpoons}} Zn^{2+}_{(aq)} + Cu_{(s)}",'
OUVRE = "  const ouvre = (c: string) => pari.etapeOuverte && etape.controles.includes(c);"
FL_AXE = 'if (e.accent && e.verdict && e.verdict !== "equilibre" && !dansBande) fleche(xQ, yAxe + 17, xK, yAxe + 17, accent, 2);'
FL_BANDE = 'if (e.accent && e.verdict && e.verdict !== "equilibre") fleche(xQb, yBande + 17, xKb, yBande + 17, accent, 2);'
PAROIS = "    // le bécher, en encre : deux parois et le fond (ouvert en haut)\n    c.strokeStyle = encre;"
DANS_BANDE = "    if (e.logQ >= bMin && e.logQ <= bMax) {\n      const xQb = Xb(e.logQ);"


def J(nom, debut, avant, apres, retrait):
  """Une retouche de TEXTE du descripteur : la clé inerte `_sabotage` posée devant la ligne qui commence
  par `debut` (même objet JSON), puis `avant` → `apres` dans cette ligne. `apres` est écrit sous sa forme
  SOURCE JSON (antislashs doublés)."""
  return [(D, debut, f'"_sabotage": "{nom}",\n{retrait}{debut}'), (D, avant, apres)]


SUITE_S1 = '"suite": "« Fais varier'
FIN_SUITE_S1 = 'regarde ce que fait le pivot. »",'


def F(nom, phrase):
  """23 — une forme interdite du §9, UNE à la fois, dans la `suite` de S1 (affichée après le pari de S1,
  mesurée par `frontiere("étape 1 révélée")`)."""
  return J(nom, SUITE_S1, FIN_SUITE_S1, f'regarde ce que fait le pivot. » {phrase}",', "      ")


S = {
 # ─────────────────────────── les NOMBRES (§11.1) ───────────────────────────
 # 1 — Q_r = c_o / c_p (inversé). Littéral : c_o / c_p, sans exposant — la réciproque exacte au bain C
 # (c_o² / c_p) JETTERAIT (625/10 = 62,5 : trois chiffres, `texDeuxChiffres` refuse) et le panneau
 # tomberait avant toute mesure. PRÉVU : nombres (qri, sens, especes) ; cote-et-verdict au bain B (S3 :
 # 0,10 dessiné à GAUCHE de K, la porte recalcule « inverse ») ; position-qri aussi.
 "qr-inverse": ("nombres+cote-et-verdict", [(M, QRI, "export const qri = (s: Etat): Quotient => quotientDe(VALEUR_CRAN[s.oxydant], VALEUR_CRAN[s.produit], 1); /* SABOTAGE : Q_r = c_o / c_p */")]),
 # 2 — Q_r(C) = c_p / c_o (l'exposant omis). PRÉVU : nombres (N1/N5, et `ecart` à S4) + position-qri ;
 # aussi bande-de-travail et decades-affirmees (le chevron dirait « 14 décades », pas 12).
 "exposant-omis": ("nombres+position-qri", [(M, "    n: 2,\n", "    n: 1, /* SABOTAGE : l'exposant omis au bain C */\n")]),
 # 3 — Q_r(C) = c_p / (2 c_o) (le coefficient en facteur). PRÉVU : nombres à S4 (5,0 au lieu de 1,0×10³).
 # ⚠ le produit JETTE ensuite à S5, bain C, [Cu²⁺] = 2,5×10⁻² et [Ag⁺] ∈ {10⁻³, 10⁻², 10⁻¹} (25/20 = 1,25 :
 # trois chiffres) : la porte s'arrête en [execution] APRÈS avoir noté nombres — un arrêt, pas un manqué.
 "coefficient-en-facteur": ("nombres", [(M, QRI, "export const qri = (s: Etat): Quotient => COUPLES[s.bain].n === 2 ? reduit({ num: VALEUR_CRAN[s.produit].m, den: N2 * VALEUR_CRAN[s.oxydant].m, E: VALEUR_CRAN[s.produit].e - VALEUR_CRAN[s.oxydant].e }) : quotientDe(VALEUR_CRAN[s.produit], VALEUR_CRAN[s.oxydant], COUPLES[s.bain].n); /* SABOTAGE : c_p / (2 c_o) */")]),
 # 4 — K dépend du mélange : Q_{r,i} recopié dans la lecture `k` (N4) ET dans le pivot dessiné (position-k).
 # PRÉVU : nombres + position-k ; cote-et-verdict et fleche-du-verdict aussi (le pivot tombe SUR la pastille).
 "k-depend-du-melange": ("nombres+position-k", [(P, "  const kSeul = couple.kTex.replace(/^K = /, \"\");", "  const kSeul = M.texQri(etatCourant); /* SABOTAGE : K recopié de Q_{r,i} (lecture) */"), (P, "      logK: M.log10K(etat.bain),", "      logK: M.log10Q(M.qri(etatCourant)), /* SABOTAGE : K recopié de Q_{r,i} (dessin) */")]),
 # 5 — le critère retourné (Q_{r,i} < K ⇒ inverse). PRÉVU : nombres (sens, especes) et becher-et-roles ;
 # cote-et-verdict RESTERA VERTE : la porte compare la position du repère à SON verdict recalculé, jamais à
 # la lecture `sens` affichée — et la position est juste (ADR 0033, troisième cas : la spec §11.2 dit « le
 # repère est à gauche ssi `sens` dit direct »). Attendu : ATTRAPÉ EN PARTIE.
 "critere-retourne": ("nombres+cote-et-verdict", [(M, "  return c < 0 ? \"direct\" : c > 0 ? \"inverse\" : \"equilibre\";", "  return c < 0 ? \"inverse\" : c > 0 ? \"direct\" : \"equilibre\"; /* SABOTAGE : le critère retourné */")]),
 # 6 — le seuil à 1 au lieu de K, dans la polarité déclarée au §8.2 (au-dessus de 1, ça recule ; Q = 1 compté
 # direct : le bain A passe à 15 direct / 10 inverse). PRÉVU : nombres (sens ; N3 à S5 : plus aucun équilibre).
 "seuil-a-un": ("nombres", [(M, CRIT, "  const c = compare(qri(s), dec(10, -1)) > 0 ? 1 : -1; /* SABOTAGE : le seuil à 1, au-dessus ça recule */")]),
 # 7 — Q_{r,i} à UN chiffre significatif (2,5 → « 2 », 1,0×10⁻² → « 1×10⁻² »). PRÉVU : nombres (N1 dès S1,
 # N3 à S5 : « 2 » ≠ « 2,5 »).
 "un-chiffre-significatif": ("nombres", [(M, "  const mantisse = `${a}{,}${b}`;", "  const mantisse = `${a}`; /* SABOTAGE : un seul chiffre significatif */")]),
 # 8 — un sixième cran, 2,5×10⁻¹ (deux états d'équilibre au bain B). PRÉVU : nombres RESTERA VERTE — N3 est
 # recompté sur les cinq crans de la PORTE, qui ne visite jamais 2,5×10⁻¹ ; c'est fuite-inter-etapes (« les
 # crans d'oxydant ») qui rougira. Attendu : ROUGE AILLEURS.
 "cran-en-plus": ("nombres", [(M, "export const CRANS = [\"1.0e-3\", \"1.0e-2\", \"2.5e-2\", \"1.0e-1\", \"5.0e-1\"] as const;", "export const CRANS = [\"1.0e-3\", \"1.0e-2\", \"2.5e-2\", \"1.0e-1\", \"2.5e-1\", \"5.0e-1\"] as const; /* SABOTAGE : un sixième cran */"), (M, "  \"5.0e-1\": dec(50, -2),\n};", "  \"2.5e-1\": dec(25, -2), /* SABOTAGE */\n  \"5.0e-1\": dec(50, -2),\n};")]),
 # 9 — `ecart` décimal (« au moins 34,6 ordres de grandeur », virgule : un point décimal ferait rougir
 # frontiere à sa place). PRÉVU : nombres seule (le RETOUR de S2 garde « au moins 34 »).
 "ecart-decimal": ("nombres", [(P, "  return e.entier === 0 ? \"moins d’un ordre de grandeur\" : `au moins ${e.entier} ordres de grandeur`;", "  return e.entier === 0 ? \"moins d’un ordre de grandeur\" : `au moins ${e.decades.toFixed(1).replace(\".\", \",\")} ordres de grandeur`; /* SABOTAGE : l'écart décimal */")]),

 # ─────────────────────────── les PIXELS (§11.2) ───────────────────────────
 # 10 — le pivot de l'AXE glisse avec le mélange (0,3 décade par décade de Q_{r,i} : 5,8 px à S1). La bande
 # n'est pas touchée (sinon bande-de-travail rougirait avec) ; la flèche de l'axe suit le pivot déplacé.
 "pivot-glisse": ("position-k", [(R, "    const xK = Xo(e.logK);\n    pivot(xK, yAxe, encre, surface);", "    const xK = Xo(e.logK + 0.3 * (e.logQ ?? 0)); /* SABOTAGE : le pivot glisse avec le mélange */\n    pivot(xK, yAxe, encre, surface);")]),
 # 11 — l'échelle de l'axe resserrée au bord : la dernière décade (41 → 42) à moitié. Au bord DROIT
 # seulement : la porte prend la PREMIÈRE graduation comme origine de ses décades (`decAxe`) — resserrer le
 # bord gauche décalerait toutes les positions et ferait rougir position-k/position-qri avec (pas « seule »).
 "axe-resserre-au-bord": ("axe-decades", [(R, "    const Xo = (v: number) => xA0 + (v - AXE.min) * pxDec;", "    const Xo = (v: number) => xA0 + (Math.min(v, AXE.max - 1) - AXE.min) * pxDec + Math.max(0, v - (AXE.max - 1)) * pxDec * 0.5; /* SABOTAGE : l'axe resserré à son bord droit */")]),
 # 12 — le repère plafonné aux bords de l'axe. Réécrit : Q_{r,i} vit dans [10⁻²·⁷ ; 10⁵·⁷] et l'axe va de 10⁻⁴
 # à 10⁴² — un plafond AUX bornes serait inerte (AMBIGU). Plafond à deux décades des bornes : A 10⁻³/5×10⁻¹
 # (10⁻²·⁷, S1) est dessiné à 10⁻², 6,7 px trop à droite. La bande n'est pas touchée.
 "repere-plafonne": ("position-qri", [(R, "      const xQ = Xo(e.logQ);", "      const xQ = Xo(Math.max(AXE.min + 2, Math.min(AXE.max - 2, e.logQ))); /* SABOTAGE : le repère plafonné près des bords de l'axe */")]),
 # 13 — la flèche du verdict retournée (de K vers le repère), sur l'axe ET dans la bande.
 "fleche-retournee": ("fleche-du-verdict", [(R, FL_AXE, FL_AXE.replace("fleche(xQ, yAxe + 17, xK, yAxe + 17,", "fleche(xK, yAxe + 17, xQ, yAxe + 17,") + " /* SABOTAGE : flèche retournée (axe) */"), (R, FL_BANDE, FL_BANDE.replace("fleche(xQb, yBande + 17, xKb, yBande + 17,", "fleche(xKb, yBande + 17, xQb, yBande + 17,") + " /* SABOTAGE : flèche retournée (bande) */")]),
 # 14 — « oxydé » attaché à la lame quel que soit le verdict (`reactivite-metal-fixe` dans le code).
 # PRÉVU : becher-et-roles à S3 révélée (bain B, inverse : « oxydé » sur la LAME).
 "oxyde-sur-la-lame": ("becher-et-roles", [(R, "      const direct = e.verdict === \"direct\";", "      const direct = !!e.verdict; /* SABOTAGE : « oxydé » sur la lame, quel que soit le verdict */")]),
 # 15 — afficher `sens`, une flèche, ou une étiquette de rôle AVANT le pari : trois mesures séparées.
 # 15a — la lecture `sens` énoncée avant le pari, à toutes les étapes.
 "sens-avant-le-pari": ("avant-pari", [(P, "const TOUJOURS: readonly string[] = [\"equation\", \"k\", \"melange\"];", "const TOUJOURS: readonly string[] = [\"equation\", \"k\", \"melange\", \"sens\"]; /* SABOTAGE : `sens` avant le pari */")]),
 # 15b — la flèche du verdict (accent) sur l'axe avant le pari. PRÉVU : avant-pari (px d'accent) ;
 # fleche-du-verdict aussi (« une flèche d'accent AVANT le pari »).
 "fleche-avant-le-pari": ("avant-pari", [(R, FL_AXE, FL_AXE.replace("e.accent && ", "") + " /* SABOTAGE : la flèche avant le pari */")]),
 # 15c — l'étiquette « oxydé » visible avant le pari (dès S3, où les rôles sont permis), posée sur la lame ;
 # sans accent (les flèches d'électrons restent muettes) : c'est l'étiquette seule qu'on mesure.
 "role-avant-le-pari": ("avant-pari", [(P, "{ el: refs.roleOxyde.current, p: en(\"role-oxyde\", rolesVisibles),", "{ el: refs.roleOxyde.current, p: revele ? en(\"role-oxyde\", rolesVisibles) : en(\"lame\") /* SABOTAGE */,"), (P, "{revele && rolesAutorises && verdictCourant !== \"equilibre\" && <span>oxydé</span>}", "{rolesAutorises && verdictCourant !== \"equilibre\" && <span>oxydé</span>}{/* SABOTAGE : « oxydé » avant le pari */}")]),
 # 16 — `expression` ou `qri` EN LECTURE à S4 avant le pari : deux mesures séparées. Le dessin n'est pas
 # touché (la marque de S4 est le sabotage 33). Contre-essai de 16 : la passe propre (voir l'en-tête).
 "expression-lue-a-S4": ("avant-pari", [(P, "  if (lecture === \"expression\" || lecture === \"qri\") return etapeId !== ID_S4;", "  if (lecture === \"expression\") return true; /* SABOTAGE : l'expression lue à S4 avant le pari */\n  if (lecture === \"qri\") return etapeId !== ID_S4;")]),
 "qri-lu-a-S4": ("avant-pari", [(P, "{lit(\"qri\") && ligneLecture(\"qri\",", "{(lit(\"qri\") || etape.id === ID_S4 /* SABOTAGE : Q_{r,i} lu à S4 avant le pari */) && ligneLecture(\"qri\",")]),
 # 17 — deux mesures séparées.
 # 17a — `bain` ouvert PENDANT le pari de S3. PRÉVU : ROUGE AILLEURS — la porte range « un contrôle ouvert
 # avant l'engagement » sous avant-pari (`avantPari` : « contrôles [bain] ») ; sa fuite-inter-etapes d'avant
 # le pari ne lit que la présence de la bande.
 "bain-ouvert-pendant-S3": ("fuite-inter-etapes", [(P, OUVRE, "  const ouvre = (c: string) => (pari.etapeOuverte || (etape.id === M.PLAN[2].id && c === \"bain\")) && etape.controles.includes(c); /* SABOTAGE : bain ouvert pendant le pari de S3 */")]),
 # 17b — le cran C offert dès S3 (après sa révélation). PRÉVU : fuite-inter-etapes (« le bain offre [A,B,C] »).
 "cran-C-offert-a-S3": ("fuite-inter-etapes", [(P, "    return M.BAINS.filter((b) => vus.has(b));", "    return M.BAINS.filter((b) => vus.has(b) || (b === \"C\" && vus.has(\"B\"))); /* SABOTAGE : le cran C offert dès S3 */")]),
 # 18 — la formule graduée, UNE MESURE PAR ÉTAPE, dans le retour JUSTE (la porte ne révèle que lui : un
 # mot posé dans un retour faux n'atteindrait pas la porte — AMBIGU).
 "etain-a-S2": ("formule-graduee", J("etain-a-S2", '"retour": "Le plus « défavorable »', "parce que « le zinc gagne toujours ».", "parce que « le zinc gagne toujours », comme l'étain.", "            ")),
 "exposant-a-S3": ("formule-graduee", J("exposant-a-S3", r'"retour": "$Q_{r,i} = 10$, et $K', "Change les quantités et tu le verras.", "Change les quantités et tu le verras, exposant compris.", "            ")),
 "equilibre-a-S4": ("formule-graduee", J("equilibre-a-S4", '"retour": "L\'expression juste donne', "donc le quotient plus grand.", "donc le quotient plus grand, loin de l'équilibre.", "            ")),
 # 18d — « 1,0×10⁻⁵ » dans le retour juste de S1. PRÉVU : ROUGE AILLEURS — la porte n'a pas cette chaîne dans
 # sa table GRADUEE ; elle la range sous frontiere (§9.10, la même chaîne est au 23).
 "dix-puissance-moins-5-a-S1": ("formule-graduee", J("dix-puissance-moins-5-a-S1", '"retour": "Proportionnellement', "C'est le sens direct qui l'emporte.", r"C'est le sens direct qui l'emporte, même à $1{,}0\\times10^{-5}$ mol/L.", "            ")),
 # 19 — une équation à flèche simple (le bain A : `flechesChimiques` ne mesure qu'à S1).
 "fleche-simple": ("fleches-chimiques", [(M, EQ_A, r'    equationTex: "Zn_{(s)} + Cu^{2+}_{(aq)} \\rightarrow Zn^{2+}_{(aq)} + Cu_{(s)}", /* SABOTAGE : flèche simple */')]),
 # 20 — un bécher peint hors jetons (ses parois). Deux teintes, parce que la sonde en a trois zones :
 # 20a — le BLEU de la spec (« parce que c'est du sulfate de cuivre »), rgb(40,110,220). PRÉVU : MANQUÉ —
 # calculé sur la sonde `classer` : cos(chroma, accent #00746A) ≈ 0,75, entre 0,6 (hors palette) et 0,85
 # (accent) : ni l'un ni l'autre. La sonde a un cône mort de ~30° autour de la teinte d'accent.
 "becher-bleu-sulfate": ("palette", [(R, PAROIS, "    // le bécher, en encre : deux parois et le fond (ouvert en haut)\n    c.strokeStyle = \"rgb(40,110,220)\"; /* SABOTAGE : un bécher bleu, « parce que c'est du sulfate de cuivre » */")]),
 # 20b — une teinte franchement hors jetons, rgb(200,60,40) (cos < 0) : la famille sait-elle rougir ?
 "becher-hors-teinte": ("palette", [(R, PAROIS, "    // le bécher, en encre : deux parois et le fond (ouvert en haut)\n    c.strokeStyle = \"rgb(200,60,40)\"; /* SABOTAGE : un bécher rouge brique */")]),
 # 21 — three.js dans le module de la scène. Import STATIQUE dans quotient-rendu.ts, module lui-même chargé
 # au clic : un `import("three")` dynamique courrait contre la seule mesure, prise juste après « prête »
 # (AMBIGU si le morceau arrive après). Même défaut : three exécuté quand le panneau s'ouvre.
 "import-three": ("pas-de-3d", [(R, "import { tailleTexte } from \"./texte\";", "import { tailleTexte } from \"./texte\";\nimport { REVISION as __revTrois } from \"three\"; /* SABOTAGE */"), (R, "  const ctx = canvas.getContext(\"2d\");", "  canvas.dataset.rev = __revTrois; /* SABOTAGE : three chargé avec la scène */\n  const ctx = canvas.getContext(\"2d\");")]),
 # 22 — Q_{r,i} et K superposés à S5, SANS `disposer` (posés tous deux sur l'ancre de K après son passage).
 "etiquettes-superposees-S5": ("etiquettes", [(P, "    s.lier(places.flatMap((b) => (b?.filet ? [b.filet] : [])));", "    s.lier(places.flatMap((b) => (b?.filet ? [b.filet] : [])));\n    if (etape.id === M.PLAN[4].id) { poser(refs.qri.current, en(ancreK, logQ !== null)); poser(refs.k.current, en(ancreK)); } /* SABOTAGE : Q_{r,i} et K superposés à S5, sans disposer */")]),

 # ─────────── 23 — la FRONTIÈRE (§9), UNE MESURE PAR FORME, dans la `suite` de S1 ───────────
 "frontiere-E-degre": ("frontiere", F("frontiere-E-degre", "Le E° du couple n'y est pour rien.")),
 "frontiere-nernst": ("frontiere", F("frontiere-nernst", "Sans la relation de Nernst.")),
 "frontiere-potentiel-standard": ("frontiere", F("frontiere-potentiel-standard", "Sans potentiel standard.")),
 "frontiere-esh": ("frontiere", F("frontiere-esh", "Aucune référence à l'ESH.")),
 "frontiere-plus-noble": ("frontiere", F("frontiere-plus-noble", "Le cuivre est le plus noble.")),
 "frontiere-delta-g": ("frontiere", F("frontiere-delta-g", r"Ni $\\Delta G$.")),
 "frontiere-enthalpie": ("frontiere", F("frontiere-enthalpie", "Ni enthalpie.")),
 "frontiere-entropie": ("frontiere", F("frontiere-entropie", "Ni entropie.")),
 "frontiere-regle-du-gamma": ("frontiere", F("frontiere-regle-du-gamma", "Oublie la règle du gamma.")),
 "frontiere-serie-electrochimique": ("frontiere", F("frontiere-serie-electrochimique", "Oublie la série électrochimique.")),
 "frontiere-avancement": ("frontiere", F("frontiere-avancement", "Sans avancement.")),
 "frontiere-tau": ("frontiere", F("frontiere-tau", r"Sans $\\tau$.")),
 "frontiere-x-max": ("frontiere", F("frontiere-x-max", "Sans $x_{max}$.")),
 "frontiere-reactif-limitant": ("frontiere", F("frontiere-reactif-limitant", "Sans réactif limitant.")),
 "frontiere-chaleur": ("frontiere", F("frontiere-chaleur", "Sans chaleur.")),
 "frontiere-exothermique": ("frontiere", F("frontiere-exothermique", "Rien d'exothermique.")),
 "frontiere-joule": ("frontiere", F("frontiere-joule", "Aucun joule.")),
 "frontiere-pile": ("frontiere", F("frontiere-pile", "Ce n'est pas une pile.")),
 "frontiere-anode": ("frontiere", F("frontiere-anode", "Aucune anode.")),
 "frontiere-cathode": ("frontiere", F("frontiere-cathode", "Aucune cathode.")),
 "frontiere-borne": ("frontiere", F("frontiere-borne", "Aucune borne.")),
 "frontiere-courant": ("frontiere", F("frontiere-courant", "Aucun courant.")),
 "frontiere-faraday": ("frontiere", F("frontiere-faraday", "Sans Faraday.")),
 "frontiere-pont-salin": ("frontiere", F("frontiere-pont-salin", "Sans pont salin.")),
 "frontiere-ph": ("frontiere", F("frontiere-ph", "Le pH n'y est pour rien.")),
 "frontiere-k-a": ("frontiere", F("frontiere-k-a", "Ni $K_A$.")),
 "frontiere-precipite": ("frontiere", F("frontiere-precipite", "Aucun précipité.")),
 "frontiere-k-s": ("frontiere", F("frontiere-k-s", "Ni $K_s$.")),
 "frontiere-pente": ("frontiere", F("frontiere-pente", "Aucune pente.")),
 "frontiere-en-fonction-du-temps": ("frontiere", F("frontiere-en-fonction-du-temps", "Rien en fonction du temps.")),
 "frontiere-plus-ou-moins": ("frontiere", F("frontiere-plus-ou-moins", "À ± près.")),
 "frontiere-incertitude": ("frontiere", F("frontiere-incertitude", "Sans incertitude.")),
 "frontiere-tp": ("frontiere", F("frontiere-tp", "Ce n'est pas un TP.")),
 "frontiere-protocole": ("frontiere", F("frontiere-protocole", "Aucun protocole.")),
 # PRÉVU : MANQUÉ pour les deux suivantes — la porte n'a AUCUNE sonde des trois ensembles de nombres du
 # §9.10 (concentrations, K, quotients) : `frontiere()` ne lit que ses 36 motifs, le point décimal, et
 # l'unité sur qri/k. « Une forme qui ne fait rien rougir est une sonde manquante » (§11.4, 23).
 "frontiere-concentration-hors-crans": ("frontiere", F("frontiere-concentration-hors-crans", r"Essaie aussi $[Cu^{2+}]_i = 2{,}0\\times10^{-3}$ mol/L.")),
 "frontiere-k-hors-des-trois": ("frontiere", F("frontiere-k-hors-des-trois", "Pour une autre réaction, $K = 3{,}0$.")),
 "frontiere-1e-6": ("frontiere", F("frontiere-1e-6", r"Pas $1{,}0\\times10^{-6}$.")),
 "frontiere-1e-5": ("frontiere", F("frontiere-1e-5", r"Pas $1{,}0\\times10^{-5}$.")),

 # ─────────────────── les HUIT NEUFS de la vague 1 (24–31) ───────────────────
 # 24 — une unité collée à une lecture sans unité. Dans le nœud : PRÉVU frontiere, et nombres aussi (la
 # chaîne n'est plus égale). Contre-essai de 24 : la passe propre (unités des radios et de `melange`).
 "unite-sur-qri": ("frontiere", [(P, "math(M.texQri(etatCourant)))}", r"math(`${M.texQri(etatCourant)}\\ \\text{mol/L}`))}{/* SABOTAGE : une unité sur Q_{r,i} */}")]),
 "unite-sur-k": ("frontiere", [(P, "math(kSeul))}", r"math(`${kSeul}\\ \\text{mol/L}`))}{/* SABOTAGE : une unité sur K */}")]),
 # 24c — l'unité IMMÉDIATEMENT ADJACENTE au nœud de K (hors du `dd`), forme que le §9.10 interdit aussi.
 # PRÉVU : MANQUÉ — la sonde lit l'intérieur du nœud seulement.
 "unite-adjacente-a-k": ("frontiere", [(P, "      </dd>\n    </div>", "      </dd>\n      {cleL === \"k\" && <span className=\"text-primary\">mol/L</span>}{/* SABOTAGE : l'unité juste à côté du nœud de K */}\n    </div>")]),
 # 25 — le bain B avec la seule lame d'étain : le dépôt de plomb retiré du dessin ET du DOM (son repère).
 "depot-absent": ("becher-et-roles", [(P, "  const deuxSolides = M.bainADeuxSolides(etat.bain);", "  const deuxSolides: boolean = false; /* SABOTAGE : le bain B avec la seule lame */")]),
 # 26 — l'échelle de la BANDE resserrée à son bord (la dernière décade à moitié ; bord droit, même raison
 # qu'au 11 : la porte date les pastilles depuis le bord GAUCHE de la bande).
 "bande-resserree-au-bord": ("bande-de-travail", [(R, "    const Xb = (v: number) => xB0 + (v - bMin) * pxDecB;", "    const Xb = (v: number) => xB0 + (Math.min(v, bMax - 1) - bMin) * pxDecB + Math.max(0, v - (bMax - 1)) * pxDecB * 0.5; /* SABOTAGE : la bande resserrée à son bord droit */")]),
 # 27 — la largeur de la bande varie avec le bain : dix décades au bain B, six ailleurs. Choisi pour
 # qu'aucun Q_{r,i} atteignable ne change de côté du bord (B : tous dedans à ±4 comme à ±5 ; A, C : tous
 # dehors) — sinon la flèche et le chevron rougiraient avec.
 "bande-largeur-variable": ("bande-de-travail", [(R, "    const bMin = e.logK - DEMI_BANDE, bMax = e.logK + DEMI_BANDE;", "    const demiB = e.bain === \"B\" ? 5 : 3; /* SABOTAGE : la largeur de la bande varie avec le bain */\n    const bMin = e.logK - demiB, bMax = e.logK + demiB;"), (R, "    const pxDecB = (xB1 - xB0) / (2 * DEMI_BANDE);", "    const pxDecB = (xB1 - xB0) / (2 * demiB); /* SABOTAGE */")]),
 # 28 — les deux marques de S3 rapprochées dans la bande (Q_{r,i} = 10 au bain B, tiré à 20 % de son écart à
 # K : ~4,8 px à 390 px, ~6,6 px à 1 280). Restreint à Q = 10 : appliqué à tout le bain B, Q = 4 tomberait à
 # ~2,2 px de K et cote-et-verdict rougirait avec. PRÉVU : bande-de-travail (390 px : < 16 ; 1 280 : pastille
 # à ~26 px de sa place) ; la flèche de 6 px peut faire rougir fleche-du-verdict en plus.
 "marques-S3-rapprochees": ("bande-de-travail", [(R, "      const xQb = Xb(e.logQ);", "      const xQb = Xb(e.bain === \"B\" && Math.abs(e.logQ - 1) < 1e-9 ? e.logK + (e.logQ - e.logK) * 0.2 : e.logQ); /* SABOTAGE : les deux marques de S3 rapprochées à ~5 px */")]),
 # 29 — la pastille plafonnée dans la bande au lieu du chevron. Deux mesures :
 # 29a — plafonnée EXACTEMENT au bord (la lettre de la spec). PRÉVU, à la lecture de `regles` : la pastille
 # centrée sur le bord n'est PAS « dedans » (a > x0 + 1) et sa moitié hors du trait est lue comme un CHEVRON
 # du bon côté ; le texte du chevron (sr-only) reste juste. La famille rougira sans doute quand même, mais
 # par ACCIDENT : le bord lu recule de ~3 px et « pivot de la bande à … de son bord » tombe hors de 1,5 px.
 # À lire dans sab-pastille-plafonnee-au-bord.log : si le message n'est pas « plafonnée », la sonde confond.
 "pastille-plafonnee-au-bord": ("bande-de-travail", [(R, DANS_BANDE, "    if (e.logQ >= bMin - 1e9) { /* SABOTAGE : la pastille plafonnée au bord de la bande, plus de chevron */\n      const xQb = Xb(Math.max(bMin, Math.min(bMax, e.logQ)));")]),
 # 29b — plafonnée à une demi-décade en retrait du bord : une pastille que la sonde lit comme telle.
 "pastille-plafonnee-en-retrait": ("bande-de-travail", [(R, DANS_BANDE, "    if (e.logQ >= bMin - 1e9) { /* SABOTAGE : la pastille plafonnée en retrait du bord, plus de chevron */\n      const xQb = Xb(Math.max(bMin + 0.5, Math.min(bMax - 0.5, e.logQ)));")]),
 # 30 — `produit` ouvert au pari de S3 (l'équilibre du bain B atteignable dès S3). Deux mesures :
 # 30a — PENDANT le pari, à la lettre. PRÉVU : ROUGE AILLEURS [avant-pari] (même raison qu'au 17a).
 "produit-ouvert-pendant-S3": ("fuite-inter-etapes", [(P, "<div className=\"flex flex-col gap-5\">{etape.controles.filter(ouvre).map((c) => groupes[c]?.())}</div>", "<div className=\"flex flex-col gap-5\">{[...etape.controles.filter(ouvre), ...(etape.id === M.PLAN[2].id && !pari.etapeOuverte ? [\"produit\"] : [])].map((c) => groupes[c]?.())}</div>{/* SABOTAGE : produit ouvert pendant le pari de S3 */}")]),
 # 30b — la table d'origine (§7.6 D) : `produit` dans les contrôles de S3 du descripteur, ouvert à la
 # révélation. PRÉVU : fuite-inter-etapes (« contrôles [bain,produit] ») et etapes (le descripteur).
 "produit-ouvert-a-S3": ("fuite-inter-etapes", [(D, "      \"controles\": [\n        \"bain\"\n      ],", "      \"_sabotage\": \"produit-ouvert-a-S3\",\n      \"controles\": [\n        \"bain\",\n        \"produit\"\n      ],")]),
 # 31 — CONTRE-ESSAI : l'équation à la manière de 2017 N, \underset{(2)}{\overset{(1)}{\rightleftarrows}}
 # (bain A, mesuré à S1). RIEN ne doit rougir ; si fleches-chimiques rougit, c'est la sonde qui est fausse.
 "contre-essai-2017N": ("VERT", [(M, EQ_A, EQ_A.replace(r"{\\rightleftharpoons}}", r"{\\rightleftarrows}}") + " /* SABOTAGE (contre-essai) : la double flèche de 2017 N */")]),

 # ─────────────────── les QUATRE NEUFS de la seconde passe (32–35) ───────────────────
 # 32 — un faux compte de décades, dans le retour JUSTE de S4 (« à 10, deux décades plus à gauche » : le seul
 # des deux retours qui en portent un que la porte révèle). Deux variantes, séparées.
 "decades-nombre-faux": ("decades-affirmees", J("decades-nombre-faux", '"retour": "L\'expression juste donne', "à $10$, deux décades plus à gauche.", "à $10$, trois décades plus à gauche.", "            ")),
 "decades-direction-fausse": ("decades-affirmees", J("decades-direction-fausse", '"retour": "L\'expression juste donne', "à $10$, deux décades plus à gauche.", "à $10$, deux décades plus à droite.", "            ")),
 # 33 — le dessin de Q_{r,i} à S4 avant l'engagement. Trois mesures :
 # 33a — la source unique découplée : `logQ` toujours calculé → la marque sur l'axe, son étiquette, le
 # chevron de bande. PRÉVU : avant-pari (pastille sur l'axe) ; bande-de-travail aussi (le chevron).
 "marque-a-S4": ("avant-pari", [(P, "  const logQ = lit(\"qri\") ? M.log10Q(M.qri(etatCourant)) : null;", "  const logQ: number | null = M.log10Q(M.qri(etatCourant)); /* SABOTAGE : la marque de Q_{r,i} à S4 avant le pari */")]),
 # 33b — l'ÉTIQUETTE « Q_{r,i} = 1,0×10³ » seule, visible (posée près de K), sans marque ni chevron.
 # PRÉVU : MANQUÉ — `avantPari` ne lit, des étiquettes, que les deux rôles ; `rattachement` ne vérifie une
 # étiquette de valeur que si sa pastille existe.
 "etiquette-qri-a-S4": ("avant-pari", [(P, "{ el: refs.qri.current, p: en(ancreQri, logQ !== null),", "{ el: refs.qri.current, p: logQ !== null ? en(ancreQri) : en(ancreK) /* SABOTAGE */,"), (P, "{logQ !== null && math(`Q_{r,i} = ${M.texQri(etatCourant)}`)}", "{math(`Q_{r,i} = ${M.texQri(etatCourant)}`) /* SABOTAGE : l'étiquette de Q_{r,i} à S4 avant le pari */}")]),
 # 33c — le CHEVRON de bande seul (à gauche, là où le mettrait Q_{r,i} = 10³), aux pixels. PRÉVU : ROUGE
 # AILLEURS — la porte range cette mesure-là sous bande-de-travail (« une pastille ou un chevron dans la
 # bande AVANT le pari de S4 »), pas sous avant-pari.
 "chevron-a-S4": ("avant-pari", [(R, "      return; // S4 avant le pari : ni pastille ni chevron dans la bande non plus (F4)", "      c.fillStyle = encre; c.beginPath(); c.moveTo(xB0 - 9, yBande); c.lineTo(xB0, yBande - 6); c.lineTo(xB0, yBande + 6); c.closePath(); c.fill(); /* SABOTAGE : le chevron à S4 avant le pari */\n      return;")]),
 # 34 — `produit` ouvert pendant le pari de S5. PRÉVU : ROUGE AILLEURS [avant-pari] (même raison qu'au 17a).
 "produit-ouvert-pendant-S5": ("fuite-inter-etapes", [(P, OUVRE, "  const ouvre = (c: string) => (pari.etapeOuverte || (etape.id === M.PLAN[4].id && c === \"produit\")) && etape.controles.includes(c); /* SABOTAGE : produit ouvert pendant le pari de S5 */")]),
 # 35 — S4 posé sur l'ANCIEN état ([Cu²⁺] = 10⁻³, [Ag⁺] = 10⁻¹), les textes gardés : le chevron dirait
 # « 16 décades », Q_{r,i} = 0,10. PRÉVU : decades-affirmees et nombres ; etapes aussi (le descripteur).
 "S4-ancien-etat": ("decades-affirmees+nombres", [(D, "        \"bain\": \"C\",\n        \"c_produit\": \"1.0e-1\",\n        \"c_oxydant\": \"1.0e-2\"", "        \"_sabotage\": \"S4-ancien-etat\",\n        \"bain\": \"C\",\n        \"c_produit\": \"1.0e-3\",\n        \"c_oxydant\": \"1.0e-1\"")]),
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
