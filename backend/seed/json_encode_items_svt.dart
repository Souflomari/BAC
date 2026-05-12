// Phase 4.5 encoder: quiz items for the 25 SVT chapters.
//
// ~8 items per chapter × 25 = ~200 items. Mix of mcq and numeric.
// UUID series: 66666666-aaaa-* per HANDOFF §7.
//
// Output: backend/supabase/migrations/039_items_svt.sql

import 'dart:convert';
import 'dart:io';

Map<String, dynamic> _mcq(String stem, List<String> choices, int correctIdx, String explFr, {bool latex = true}) =>
    {'q': {'stem': stem, 'choices': choices, 'correct_index': correctIdx, 'latex': latex}, 'e': {'text_fr': explFr, 'steps': const []}, 'type': 'mcq'};

Map<String, dynamic> _num(String stem, num value, String explFr, {num tolerance = 0, bool latex = true}) =>
    {'q': {'stem': stem, 'correct_value': value, 'tolerance': tolerance, 'latex': latex}, 'e': {'text_fr': explFr, 'steps': const []}, 'type': 'numeric'};

// Map skill_code → (skill_uuid, item-list).
// UUIDs from migration 036.
final Map<String, Map<String, dynamic>> _skills = {
  // Math (5)
  'svt_arith_geom_seq': {'uuid': '33333333-dddd-0000-0000-000000000001', 'items': [
    _mcq("Raison de \$5, 10, 15, 20\$ :", ['3', '4', '5', '6'], 2, "Différence constante 5."),
    _mcq("Suite arithmétique \$u_0=2, r=3\$. \$u_4\$ ?", ['8', '14', '24', '162'], 1, "\$u_4 = 2 + 4 \\times 3 = 14\$."),
    _num("Somme \$1+2+\\dots+50\$.", 1275, "\$50 \\times 51/2 = 1275\$."),
    _mcq("Raison de \$2, 6, 18, 54\$ :", ['2', '3', '4', '6'], 1, "\$6/2 = 3\$."),
    _num("\$u_n = 2 \\cdot 3^n\$. \$u_5\$ ?", 486, "\$2 \\times 243\$."),
    _mcq("Suite arithmétique de raison négative :", ['croissante', 'décroissante', 'constante', "n'existe pas"], 1, "\$r < 0\$ → décroissante."),
    _mcq("Limite de \$q^n\$ pour \$|q| < 1\$ :", ['0', '1', "\$q\$", '∞'], 0, "Convergence vers 0."),
    _num("Capital initial 1000 DH à 5%. Après 2 ans ?", 1102.5, "\$1000 \\times 1{,}05^2 = 1102{,}5\$.", tolerance: 0.5),
  ]},
  'svt_limit_calc': {'uuid': '33333333-dddd-0000-0000-000000000002', 'items': [
    _num("\$\\lim_{x \\to 2} x^2 + 1\$.", 5, "Substitution directe."),
    _num("\$\\lim_{x \\to 1} (x^2-1)/(x-1)\$.", 2, "Factoriser : \$x+1 \\to 2\$."),
    _mcq("\$\\lim_{x \\to +\\infty} 1/x\$ :", ['0', '1', '∞', "n'existe pas"], 0, "Tend vers 0."),
    _num("\$\\lim_{x \\to 0} \\sin x / x\$.", 1, "Limite usuelle."),
    _mcq("\$\\lim_{x \\to +\\infty} e^x/x^2\$ :", ['0', '1', '∞', '\$e\$'], 2, "Croissances comparées."),
    _num("\$\\lim_{x \\to 3} (x^2 - 9)/(x - 3)\$.", 6, "Factoriser : \$x+3 \\to 6\$."),
    _mcq("Forme \$0/0\$ indique :", ['limite nulle', 'limite infinie', 'indétermination', 'pas de limite'], 2, "Forme indéterminée."),
    _num("\$\\lim_{x \\to +\\infty} (3x+1)/(x+2)\$.", 3, "Coeff dominants."),
  ]},
  'svt_deriv_apps': {'uuid': '33333333-dddd-0000-0000-000000000003', 'items': [
    _num("Dérivée de \$3x^2\$ en \$x=2\$.", 12, "\$6x = 12\$."),
    _mcq("Dérivée de \$\\sin x\$ :", ['\$\\sin x\$', '\$\\cos x\$', '\$-\\cos x\$', '\$-\\sin x\$'], 1, "\$(\\sin)' = \\cos\$."),
    _num("Si \$f(x) = x^3 - 3x\$, \$f'(2)\$ ?", 9, "\$3x^2 - 3 = 12 - 3 = 9\$."),
    _mcq("À un max local d'une fonction dérivable :", ["\$f' > 0\$", "\$f' = 0\$", "\$f' < 0\$", "\$f = 0\$"], 1, "Tangente horizontale."),
    _mcq("Dérivée de \$e^x\$ :", ["\$x e^{x-1}\$", "\$e^x\$", "\$e/x\$", "1"], 1, "Auto-dérivation."),
    _num("Dérivée de \$\\ln x\$ en \$x = e\$.", 0.368, "\$1/x = 1/e\$.", tolerance: 0.01),
    _mcq("Si \$f' > 0\$ sur \$I\$, \$f\$ est :", ['constante', 'croissante', 'décroissante', 'nulle'], 1, "Dérivée positive."),
    _num("Dérivée de \$(2x+1)^3\$ en \$x = 0\$.", 6, "\$3(2x+1)^2 \\cdot 2 = 6\$ en 0."),
  ]},
  'svt_exp_ln_combined': {'uuid': '33333333-dddd-0000-0000-000000000004', 'items': [
    _num("\$\\ln(e^4)\$ vaut ?", 4, "\$\\ln(e^x) = x\$."),
    _mcq("\$e^0\$ vaut :", ['0', '1', '\$e\$', '∞'], 1, "Définition."),
    _num("Solution de \$e^x = 5\$. Donner \$\\ln 5 \\approx ?\$ à 0,01 près.", 1.61, "\$\\ln 5\$.", tolerance: 0.02),
    _mcq("\$\\ln(ab)\$ vaut :", ["\$\\ln a + \\ln b\$", "\$\\ln a \\cdot \\ln b\$", "\$\\ln(a) - \\ln(b)\$", "\$a + b\$"], 0, "Propriété fondamentale."),
    _num("Demi-vie pour \$\\lambda = 0{,}1\$ : \$\\ln 2/\\lambda\$ ?", 6.93, "\$0{,}693/0{,}1\$.", tolerance: 0.05),
    _mcq("\$\\lim_{x \\to +\\infty} e^{-x}\$ :", ['0', '1', '∞', "\$e\$"], 0, "Tend vers 0."),
    _mcq("\$\\ln 1\$ vaut :", ['0', '1', '\$e\$', '∞'], 0, "Définition."),
    _num("\$e^{\\ln 7}\$ vaut ?", 7, "\$e^{\\ln x} = x\$."),
  ]},
  'svt_integral_basics': {'uuid': '33333333-dddd-0000-0000-000000000005', 'items': [
    _num("\$\\int_0^2 x\\,dx\$ vaut ?", 2, "\$[x^2/2]_0^2 = 2\$."),
    _num("\$\\int_0^1 x^2\\,dx\$ vaut ?", 0.333, "\$1/3\$.", tolerance: 0.005),
    _mcq("Primitive de \$1/x\$ :", ['\$\\ln x\$', '\$-1/x^2\$', '\$x\$', '\$1\$'], 0, "Primitive standard."),
    _num("\$\\int_0^\\pi \\sin x\\,dx\$.", 2, "\$[-\\cos x]_0^\\pi = 1 - (-1) = 2\$."),
    _mcq("Primitive de \$e^x\$ :", ['\$x e^x\$', '\$e^x + C\$', '\$x e\$', '\$1\$'], 1, "Auto-primitive."),
    _num("\$\\int_1^e 1/x\\,dx\$.", 1, "\$\\ln e - \\ln 1 = 1\$."),
    _mcq("Si \$\\int_0^3 f = 7\$ et \$\\int_3^5 f = 2\$ alors \$\\int_0^5 f\$ :", ['5', '7', '9', '14'], 2, "Chasles : 7+2=9."),
    _num("Primitive de \$2x\$ qui vaut 1 en 0 ?", 1, "F(x) = x² + C, F(0) = C = 1."),
  ]},
  // Physique-Chimie (8)
  'svt_newton_apps': {'uuid': '33333333-dddd-0000-0000-000000000011', 'items': [
    _mcq("Force = ?", ['\$m v\$', '\$m a\$', '\$m g h\$', '\$1/2 m v^2\$'], 1, "2ème loi de Newton."),
    _num("Poids d'un objet 5 kg sur Terre (g=10). En N ?", 50, "P = mg = 50."),
    _mcq("Unité de force :", ['kg', 'N', 'J', 'W'], 1, "Newton."),
    _num("Accélération d'un bloc 2 kg avec F = 10 N.", 5, "\$a = F/m\$."),
    _mcq("Si \$\\sum F = 0\$, l'objet :", ['accélère', 'décélère', 'repos ou MRU', 'tombe'], 2, "1ère loi."),
    _mcq("Action-réaction (3ème loi) :", ['parallèles', 'mêmes sens', 'opposées', 'différentes valeurs'], 2, "Mêmes intensité, sens opposés."),
    _num("Bloc 10 kg sur plan à 30° (g=10). Accélération selon plan (sans frottement) ?", 5, "\$g \\sin 30° = 5\$."),
    _mcq("La masse est une mesure de :", ['poids', 'inertie', 'volume', 'gravité'], 1, "Tendance à conserver son mouvement."),
  ]},
  'svt_energy': {'uuid': '33333333-dddd-0000-0000-000000000012', 'items': [
    _num("\$E_c\$ d'un objet 2 kg à 5 m/s.", 25, "\$0{,}5 \\times 2 \\times 25\$."),
    _num("\$E_p\$ d'un objet 5 kg à hauteur 4 m (g=10).", 200, "\$mgh = 5 \\times 10 \\times 4\$."),
    _mcq("Sans frottement, l'énergie mécanique est :", ['nulle', 'décroissante', 'constante', 'croissante'], 2, "Conservation."),
    _num("Vitesse au sol pour chute libre h=5m (g=10).", 10, "\$v = \\sqrt{2gh} = 10\$."),
    _mcq("Unité de l'énergie :", ['N', 'J', 'W', 'kg'], 1, "Joule."),
    _num("Énergie potentielle élastique d'un ressort k=100 N/m comprimé de 10 cm.", 0.5, "\$0{,}5 \\times 100 \\times 0{,}01\$."),
    _mcq("Théorème de l'énergie cinétique :", ["\$\\Delta E_c = W_\\text{total}\$", "\$E_c = E_p\$", "\$\\Delta E_c = 0\$", "\$E_c = m g h\$"], 0, "Variation = somme travaux."),
    _num("Puissance d'un moteur qui fournit 1000 J en 10 s.", 100, "\$P = E/t\$."),
  ]},
  'svt_waves': {'uuid': '33333333-dddd-0000-0000-000000000013', 'items': [
    _num("\$\\lambda\$ pour \$v = 340\\,\\text{m/s}\$ et \$f = 100\\,\\text{Hz}\$ ?", 3.4, "\$v/f\$."),
    _mcq("Le son est :", ['transversal', 'longitudinal', 'EM', 'visible'], 1, "Compressions/raréfactions."),
    _num("Distance d'éclair : 6 s entre éclair et tonnerre (v=340).", 2040, "\$340 \\times 6\$.", tolerance: 5),
    _mcq("Célérité de la lumière dans le vide :", ['340 m/s', '\$3 \\times 10^8\$ m/s', '1500 m/s', '∞'], 1, "Constante c."),
    _num("Fréquence d'une lumière à 600 nm (c = 3e8) en \$10^{14}\$ Hz.", 5, "\$f = c/\\lambda\$."),
    _mcq("Quand \$f\$ augmente (v fixe), \$\\lambda\$ :", ['augmente', 'diminue', 'reste constante', "s'annule"], 1, "\$\\lambda \\propto 1/f\$."),
    _mcq("Diffraction maximale quand fente est :", ['large', '≈ \$\\lambda\$', 'minuscule', 'longue'], 1, "Comparable à la longueur d'onde."),
    _num("Période pour 50 Hz, en ms ?", 20, "\$T = 1/f = 20\\,\\text{ms}\$."),
  ]},
  'svt_radioactivity_basics': {'uuid': '33333333-dddd-0000-0000-000000000014', 'items': [
    _mcq("Émission \$\\alpha\$ = particule :", ['électron', '\$^4_2\\text{He}\$', 'photon', 'positron'], 1, "Noyau d'hélium."),
    _mcq("Après 3 demi-vies, reste :", ['1/3', '1/6', '1/8', '1/9'], 2, "\$1/2^3 = 1/8\$."),
    _num("Si \$t_{1/2} = 10\\,\\text{ans}\$, \$\\lambda\$ ? (en /an, 0,01 près)", 0.069, "\$\\ln 2/10\$.", tolerance: 0.005),
    _mcq("Désintégration \$\\beta^-\$ : Z varie de :", ['-1', '0', '+1', '+2'], 2, "Neutron → proton + e⁻."),
    _mcq("Datation au C14, t½ ?", ['100 ans', '1000 ans', '5730 ans', '1 million d\'années'], 2, "Demi-vie C14."),
    _num("Échantillon à 25%. Combien de demi-vies ?", 2, "\$1/4 = 1/2^2\$."),
    _mcq("Unité d'activité radioactive :", ['Bq', 'Gy', 'Sv', 'Ci'], 0, "Becquerel = désint./s."),
    _num("Si \$\\lambda = 0{,}1\$/jour, demi-vie en jours (0,1 près) ?", 6.93, "\$\\ln 2/0{,}1\$.", tolerance: 0.1),
  ]},
  'svt_rc_circuit': {'uuid': '33333333-dddd-0000-0000-000000000015', 'items': [
    _num("\$\\tau\$ pour R=1kΩ, C=100µF en ms ?", 100, "\$RC = 10^3 \\times 10^{-4}\$ s = 100 ms."),
    _mcq("À \$5\\tau\$, charge à environ :", ['50%', '63%', '95%', '>99%'], 3, "Régime établi."),
    _mcq("Énergie d'un condensateur U :", ['CU', '\$(1/2) CU^2\$', '\$U/C\$', '\$U^2/C\$'], 1, "Formule standard."),
    _num("Charge sur un condensateur C=10µF à U=12V ? (en µC)", 120, "\$Q = CU\$."),
    _mcq("Décharge : à \$t = \\tau\$, u vaut :", ['U/2', '\$U/e\$', '0', '\$U\$'], 1, "\$U e^{-1}\$."),
    _num("Energie stockée à 12V dans C=100µF ? (en mJ)", 7.2, "\$0{,}5 \\times 10^{-4} \\times 144 = 7{,}2 \\times 10^{-3}\$ J."),
    _mcq("Décharge dissipe l'énergie sous forme :", ['lumineuse', 'mécanique', 'thermique (Joule)', 'chimique'], 2, "Effet Joule dans R."),
    _mcq("τ = ?", ['R/C', 'R+C', 'RC', '1/(RC)'], 2, "Constante de temps."),
  ]},
  'svt_ph': {'uuid': '33333333-dddd-0000-0000-000000000016', 'items': [
    _num("pH d'une solution \$[H_3O^+] = 10^{-3}\$.", 3, "\$-\\log\$."),
    _mcq("À 25°C, pH + pOH :", ['7', '10', '14', "\$\\log 10\$"], 2, "\$K_e = 10^{-14}\$."),
    _num("pH d'une solution NaOH à 0,01 mol/L ?", 12, "[OH] = 0,01, pH = 14 - 2 = 12."),
    _mcq("pH < 7 :", ['neutre', 'acide', 'basique', 'aucune'], 1, "Définition."),
    _num("[OH⁻] si pH = 11 ? (en \$10^{-3}\$ mol/L)", 1, "pH=11 → [H₃O⁺]=10⁻¹¹, [OH⁻]=10⁻³."),
    _mcq("Acide fort \$C = 0{,}1\\,\\text{mol/L}\$. pH ?", ['0', '1', '2', '7'], 1, "\$-\\log 0{,}1 = 1\$."),
    _mcq("À pH = pKa :", ['acide majoritaire', 'base majoritaire', 'égalité [HA]=[A⁻]', "rien"], 2, "Henderson-Hasselbalch."),
    _num("pH de l'eau pure à 25°C ?", 7, "Neutre."),
  ]},
  'svt_redox_basics': {'uuid': '33333333-dddd-0000-0000-000000000017', 'items': [
    _mcq("Oxydation = ?", ['gain e⁻', 'perte e⁻', 'gain H', "rien"], 1, "Définition."),
    _mcq("À l'anode :", ['réduction', 'oxydation', 'rien', 'dissolution'], 1, "An-Ox."),
    _num("fem Cu-Zn (Daniell) en V (à 0,01 près).", 1.10, "\$0{,}34 + 0{,}76\$."),
    _num("Q pour I=1A pendant 1h en C.", 3600, "\$Q = It\$."),
    _mcq("Constante de Faraday vaut :", ['1 C', '96 500 C/mol', '6 \\cdot 10^{23}', '8,31 J/K'], 1, "Valeur classique."),
    _mcq("Réducteur :", ['gagne e⁻', 'perd e⁻', "ni l'un ni l'autre", 'transfert H'], 1, "Donne ses électrons → s'oxyde lui-même."),
    _num("Moles d'électrons pour 96 500 C ?", 1, "Définition de F."),
    _mcq("Couple Fe²⁺/Fe : Fe est :", ['oxydant', 'réducteur', 'neutre', 'acide'], 1, "Fe peut perdre 2e⁻."),
  ]},
  'svt_organic_basics': {'uuid': '33333333-dddd-0000-0000-000000000018', 'items': [
    _mcq("Estérification :", ['rapide', 'lente et limitée', 'totale', 'instantanée'], 1, "Caractéristiques."),
    _mcq("Produit acide + alcool :", ['ester + eau', 'ester + H₂', 'sel + eau', 'savon'], 0, "Estérification."),
    _mcq("Saponification = ester + :", ['eau', 'acide', 'soude (NaOH)', 'sel'], 2, "Réaction totale."),
    _mcq("Rendement estérification 1:1 avec K=4 :", ['33%', '50%', '67%', '100%'], 2, "\$\\xi = 2/3\$."),
    _mcq("Catalyseur d'estérification :", ['NaOH', 'H₂SO₄', 'H₂O', 'aucun'], 1, "Acide concentré."),
    _mcq("Effet de T sur équilibre estérification :", ['favorise', 'défavorise', 'aucun (athermique)', 'annule'], 2, "\$\\Delta H \\approx 0\$."),
    _mcq("Pour augmenter rendement :", ['baisser T', 'enlever eau', 'enlever acide', 'augmenter P'], 1, "Le Chatelier."),
    _mcq("Triglycéride = ester de :", ['glycérol + 3 acides gras', '3 glycérols + acide', "glucose + acide", 'rien'], 0, "Définition biologique."),
  ]},
  // SVT bio/geo (12) — SME REVIEW
  'svt_genetique_humaine': {'uuid': '33333333-dddd-0000-0000-000000000021', 'items': [
    _mcq("Croisement AA × aa → F1 :", ['AA', 'aa', 'Aa (100%)', 'mixte'], 2, "100% hétérozygote."),
    _mcq("Ratio F2 monohybride phénotypique :", ['1:1', '3:1', '9:3:3:1', '1:2:1'], 1, "2ème loi de Mendel."),
    _mcq("Ratio F2 dihybride (gènes indépendants) :", ['1:1', '3:1', '9:3:3:1', '4:1'], 2, "3ème loi."),
    _mcq("Daltonisme est récessif lié au :", ['autosome', 'X', 'Y', 'mitochondrie'], 1, "Liaison X."),
    _mcq("Génotype d'un individu groupe O :", ['IA IA', 'IA i', 'ii', 'IB IB'], 2, "Récessif ii."),
    _mcq("Parents A et B peuvent avoir un enfant O ?", ['jamais', 'si Aa × Bb', 'toujours', 'si AB × ii'], 1, "Allèles i × i."),
    _mcq("Hétérozygote = ?", ['AA', 'aa', 'Aa', 'aucun'], 2, "Deux allèles différents."),
    _mcq("Allèle dominant :", ["s'exprime si homozygote", "s'exprime toujours sauf si masqué", "s'exprime dès qu'il est présent", "ne s'exprime jamais"], 2, "Dans Aa, A masque a."),
  ]},
  'svt_genetique_populations': {'uuid': '33333333-dddd-0000-0000-000000000022', 'items': [
    _mcq("Hardy-Weinberg : \$f(AA)\$ vaut :", ['p', 'q', '\$p^2\$', '2pq'], 2, "Homozygote dominant."),
    _mcq("Si \$p = 0{,}6\$, \$q\$ vaut :", ['0,3', '0,4', '0,6', '1'], 1, "\$p + q = 1\$."),
    _num("Si \$q^2 = 0{,}01\$, \$q\$ ?", 0.1, "Racine carrée."),
    _num("\$f(Aa)\$ si \$p = q = 0{,}5\$.", 0.5, "\$2 p q = 2 \\times 0{,}25\$."),
    _mcq("Condition de H-W :", ['population petite', 'sélection forte', 'panmixie', 'mutations fréquentes'], 2, "Accouplement au hasard."),
    _mcq("Écart à H-W indique :", ['rien', 'erreur de mesure', 'force évolutive', 'population idéale'], 2, "Force évolutive à l'œuvre."),
    _num("Mucoviscidose \$1/2500\$. Porteurs (en %, 0,1 près) ?", 3.9, "\$2pq \\approx 2 \\times 0{,}98 \\times 0{,}02\$.", tolerance: 0.3),
    _mcq("Dérive génétique est :", ['déterministe', 'aléatoire', 'sélective', 'environnementale'], 1, "Hasard, petites pops."),
  ]},
  'svt_diversification_genetique': {'uuid': '33333333-dddd-0000-0000-000000000023', 'items': [
    _mcq("Méiose produit :", ['2 cellules 2n', '2 cellules n', '4 cellules n', '4 cellules 2n'], 2, "4 gamètes haploïdes."),
    _mcq("Brassage interchromosomique se produit :", ['prophase I', 'anaphase I', 'prophase II', 'mitose'], 1, "Séparation aléatoire des homologues."),
    _mcq("Crossing-over (brassage intrachro) :", ['prophase I', 'anaphase II', 'métaphase II', 'cytokinèse'], 0, "Échange entre chromatides homologues."),
    _num("Pour n=3 paires, nombre de combinaisons gamétiques inter ?", 8, "\$2^3 = 8\$."),
    _mcq("Chez l'humain (n=23), combinaisons gamétiques :", ['8', '46', '8 millions', '7 \\cdot 10^{13}'], 2, "\$2^{23}\$."),
    _mcq("Combinaisons après fécondation chez humain :", ['8 millions', '\$8 \\times 10^6\$', '\$2^{46}\$', '∞'], 2, "Carré de gamètes."),
    _mcq("La méiose produit des gamètes :", ['identiques', 'différents', 'tous diploïdes', 'sans noyau'], 1, "Diversité génétique."),
    _mcq("Crossing-over augmente la diversité car :", ['change le nombre de chromosomes', 'crée de nouvelles combinaisons', 'duplique les gènes', 'aucune raison'], 1, "Recombinaisons."),
  ]},
  'svt_evolution': {'uuid': '33333333-dddd-0000-0000-000000000024', 'items': [
    _mcq("Source ultime de variation :", ['sélection', 'reproduction', 'mutations', 'environnement'], 2, "Création de nouveauté."),
    _mcq("Sélection naturelle (Darwin) implique :", ['hasard', 'variation + adaptation différentielle', 'mutations seules', 'rien'], 1, "Mécanisme central."),
    _mcq("Dérive génétique :", ['déterministe', 'aléatoire', 'sélective', 'mutationnelle'], 1, "Effet hasard, petites pops."),
    _mcq("Spéciation allopatrique :", ['contact direct', 'séparation géographique', 'polyploïdie', 'auto-fécondation'], 1, "Isolement géographique."),
    _mcq("Critère d'espèce le plus utilisé :", ['morphologie', 'isolement reproductif', 'taille', 'habitat'], 1, "Concept biologique (Mayr)."),
    _mcq("Pinsons de Galápagos :", ['toujours pareils', 'spéciation adaptative', 'aucune diversité', 'fossiles'], 1, "13 espèces dérivées."),
    _num("Âge de l'humanité (Homo sapiens) en milliers d'années ?", 300, "Émergence en Afrique.", tolerance: 50),
    _mcq("Évolution humaine s'arrête-t-elle ?", ['oui', 'non, mais lente', 'oui depuis 100 ans', 'oui depuis 1000 ans'], 1, "Continue : lactase, etc."),
  ]},
  'svt_communication_nerveuse': {'uuid': '33333333-dddd-0000-0000-000000000025', 'items': [
    _num("Potentiel de repos d'un neurone, en mV (signe positif).", 70, "-70 mV en réalité.", tolerance: 5),
    _mcq("PA = ?", ['lent et amplitude variable', 'rapide et tout-ou-rien', 'continu', 'lent et continu'], 1, "Loi du tout ou rien."),
    _mcq("Codage de l'intensité du stimulus :", ['amplitude du PA', 'durée du PA', 'fréquence des PA', 'forme du PA'], 2, "Tout-ou-rien, donc fréquence."),
    _mcq("Synapse chimique utilise :", ['onde directe', 'neurotransmetteur', 'champ magnétique', 'glucose'], 1, "Médiateur chimique."),
    _mcq("Myéline augmente la vitesse car :", ['isole', 'amplifie', 'propagation saltatoire', 'rien'], 2, "Saut de nœud en nœud."),
    _mcq("Sclérose en plaques :", ['perte de mémoire', 'perte de myéline', 'manque d\'O₂', 'génétique pure'], 1, "Démyélinisation."),
    _mcq("Réflexe myotatique implique :", ['cerveau seul', 'moelle épinière', 'cervelet', 'aucun'], 1, "Arc réflexe."),
    _mcq("Dépolarisation =", ['entrée K⁺', 'entrée Na⁺', 'sortie Na⁺', 'rien'], 1, "Canaux Na⁺ ouverts."),
  ]},
  'svt_communication_hormonale': {'uuid': '33333333-dddd-0000-0000-000000000026', 'items': [
    _mcq("Une hormone agit :", ['localement', 'à distance via le sang', 'sans messager', 'sur tous'], 1, "Définition."),
    _mcq("L'insuline est sécrétée par :", ['foie', 'pancréas', 'thyroïde', 'estomac'], 1, "Cellules β."),
    _mcq("Glycémie haute → :", ['insuline', 'glucagon', 'adrénaline', 'rien'], 0, "Insuline baisse glycémie."),
    _mcq("Diabète de type 1 :", ['résistance insuline', 'destruction cellules β', 'excès insuline', 'manque glucose'], 1, "Auto-immune."),
    _mcq("Diabète de type 2 :", ['destruction cellules β', 'résistance insuline', 'excès insuline', 'manque insuline'], 1, "Cellules ne répondent plus."),
    _mcq("Rétrocontrôle négatif :", ['amplifie', 'stabilise', 'détruit', 'amplifie'], 1, "Boucle de stabilisation."),
    _mcq("Hypophyse :", ['glande maître', 'glande secondaire', 'pas une glande', 'rein'], 0, "Coordonne les autres."),
    _mcq("Adrénaline est libérée en :", ['repos', 'sommeil', 'stress aigu', 'digestion'], 2, "Réaction fight-or-flight."),
  ]},
  'svt_immunite': {'uuid': '33333333-dddd-0000-0000-000000000027', 'items': [
    _mcq("Immunité innée est :", ['lente', 'spécifique', 'rapide non-spécifique', 'avec mémoire'], 2, "Première ligne."),
    _mcq("Anticorps produits par :", ['LT', 'LB (plasmocytes)', 'macrophages', 'érythrocytes'], 1, "LB activés."),
    _mcq("LT cytotoxiques :", ['produisent anticorps', 'détruisent cellules infectées', 'absorbent O₂', 'phagocytent'], 1, "Réponse cellulaire."),
    _mcq("Vaccin :", ['guérit la maladie', 'crée mémoire immunitaire', 'augmente symptômes', 'aucun effet'], 1, "Immunité prophylactique."),
    _mcq("VIH attaque :", ['globules rouges', 'LT4', 'LB', 'macrophages'], 1, "Récepteur CD4."),
    _mcq("SIDA = ?", ['VIH avec immunité forte', 'destruction immunité acquise', 'guérison spontanée', 'allergie'], 1, "Effondrement du système immunitaire."),
    _mcq("Mémoire immunitaire = ?", ['cellules pérennes mémoires', 'protéines en permanence', 'mutations', 'rien'], 0, "Cellules à longue durée de vie."),
    _mcq("Réponse secondaire (à 2ème contact) :", ['identique', 'plus lente', 'plus rapide et forte', 'absente'], 2, "Grâce à la mémoire."),
  ]},
  'svt_tectonique_plaques': {'uuid': '33333333-dddd-0000-0000-000000000028', 'items': [
    _mcq("Lithosphère = ?", ['noyau interne', 'croûte + manteau supérieur rigide', 'manteau ductile', 'asthénosphère'], 1, "Plaques."),
    _mcq("Sous la lithosphère :", ['noyau', 'asthénosphère', 'air', 'croûte'], 1, "Manteau ductile."),
    _mcq("Vitesse typique d'une plaque :", ['1-10 cm/an', '1 m/jour', '1 m/s', '1 mm/siècle'], 0, "Quelques cm/an."),
    _mcq("Dorsale océanique = frontière :", ['convergente', 'divergente', 'transformante', 'aucune'], 1, "Création de croûte."),
    _mcq("Subduction = frontière :", ['convergente', 'divergente', 'transformante', 'inactive'], 0, "Convergence."),
    _mcq("Faille San Andreas est :", ['transformante', 'divergente', 'convergente', 'noyau'], 0, "Glissement latéral."),
    _mcq("Plaque océanique vs continentale :", ['continentale plus dense', 'océanique plus dense', 'mêmes densités', 'sans rapport'], 1, "Océan plonge."),
    _mcq("Théorie tectonique proposée par :", ['Newton', 'Darwin', 'Wegener', 'Lavoisier'], 2, "1912, dérive des continents."),
  ]},
  'svt_geochronologie': {'uuid': '33333333-dddd-0000-0000-000000000029', 'items': [
    _mcq("Principe de superposition :", ['supérieure ancienne', 'inférieure ancienne', 'aléatoire', 'rien'], 1, "Empilement chronologique."),
    _mcq("Datation au C14 max :", ['1000 ans', '10 000 ans', '50 000 ans', '1 million d\'années'], 2, "~9 demi-vies."),
    _mcq("Pour des roches très anciennes :", ['C14', 'K-Ar ou U-Pb', 'pas possible', 'paléontologie'], 1, "Longues demi-vies."),
    _num("Âge de la Terre en milliards d'années ?", 4.57, "Datation U-Pb sur météorites.", tolerance: 0.1),
    _mcq("Couple le plus ancien utilisable :", ['C14', 'K-Ar', 'U-Pb', 'Rb-Sr'], 2, "Demi-vie 4,5 Ga."),
    _mcq("Extinction K-T (dinosaures) :", ['10 000 ans', '1 million d\'années', '66 millions d\'années', '1 milliard'], 2, "Météorite Chicxulub."),
    _mcq("Échantillon C14 à 1/8 d'activité. Âge approximatif (5730 × n) :", ['5730 ans', '11 460 ans', '17 190 ans', '57 300 ans'], 2, "3 demi-vies."),
    _mcq("Principe de recoupement :", ['parallélisme', 'qui coupe est postérieur', 'inversion', 'rien'], 1, "Loi de Steno."),
  ]},
  'svt_metamorphisme': {'uuid': '33333333-dddd-0000-0000-00000000002a', 'items': [
    _mcq("Métamorphisme = transformation :", ['par fusion', 'à l\'état solide', 'érosion', 'altération chimique'], 1, "Sans atteindre la fusion."),
    _mcq("Métamorphisme régional est lié à :", ['contact magmatique', 'subduction', 'collision tectonique', 'tout ce qui précède'], 2, "Collisions, chaînes."),
    _mcq("Métamorphisme de subduction est :", ['HP-HT', 'BP-HT', 'HP-BT', 'BP-BT'], 2, "Haute P, T modérée."),
    _mcq("Faciès métamorphique de haute P :", ['schiste vert', 'amphibolite', 'éclogite', 'granulite'], 2, "Indique subduction."),
    _mcq("Roche métamorphique de schiste argileux :", ['gneiss', 'micaschiste', 'marbre', 'quartzite'], 1, "Progression."),
    _mcq("Minéraux indicateurs de P-T :", ['inutiles', 'fournissent les conditions', 'tous identiques', 'aucun'], 1, "Thermobarométrie."),
    _mcq("Marbre = métamorphisme de :", ['granite', 'argile', 'calcaire', 'basalte'], 2, "Récristallisation du CaCO₃."),
    _mcq("Quartzite = métamorphisme de :", ['calcaire', 'grès quartzeux', 'argile', 'basalte'], 1, "Quartz recristallisé."),
  ]},
  'svt_energie_cellulaire': {'uuid': '33333333-dddd-0000-0000-00000000002b', 'items': [
    _mcq("Photosynthèse a lieu dans :", ['mitochondries', 'chloroplastes', 'noyau', 'ribosomes'], 1, "Organite des végétaux."),
    _mcq("Produit final de la photosynthèse :", ['CO₂', 'glucose + O₂', 'ATP seul', 'eau'], 1, "Sucre + dioxygène."),
    _mcq("Respiration cellulaire produit :", ['CO₂ + H₂O + ATP', 'O₂', 'glucose', 'lumière'], 0, "Oxydation du glucose."),
    _mcq("Bilan ATP par glucose respiré :", ['2', '~36', '100', '1000'], 1, "Très efficace."),
    _mcq("Glycolyse a lieu dans :", ['mitochondrie', 'cytoplasme', 'noyau', 'chloroplaste'], 1, "Première étape."),
    _mcq("Cycle de Krebs :", ['cytoplasme', 'matrice mitochondriale', 'membrane plasma', 'chloroplaste'], 1, "Centre du métabolisme."),
    _mcq("ATP est produit par :", ['chimiosmose (chaîne respiratoire)', 'simple diffusion', 'photolyse', 'rien'], 0, "Gradient H⁺ + ATP synthase."),
    _mcq("Fermentation est rendement :", ['supérieur', 'égal', 'inférieur (2 ATP)', 'nul'], 2, "18× moins que respiration."),
  ]},
  'svt_ecosystemes': {'uuid': '33333333-dddd-0000-0000-00000000002c', 'items': [
    _mcq("Producteurs primaires :", ['herbivores', 'plantes vertes', 'carnivores', 'humains'], 1, "Autotrophes."),
    _mcq("Pourcentage d'énergie transmis par niveau trophique :", ['~1%', '~10%', '~50%', '~100%'], 1, "Règle des 10%."),
    _mcq("Décomposeurs :", ['mangent producteurs', 'recyclent matière morte', 'photosynthèse', 'rien'], 1, "Bouclent les cycles."),
    _mcq("Écosystème = ?", ['vivant seul', 'milieu seul', 'biocénose + biotope', 'climat'], 2, "Définition."),
    _mcq("Pyramide d'énergie : pourquoi peu de niveaux ?", ['hasard', 'énergie épuisée', 'compétition', 'rien'], 1, "Loi des 10%."),
    _mcq("Effet de serre :", ['piégeage IR par CO₂ et autres', 'reflexion lumière', 'absorption UV', 'aucun'], 0, "Mécanisme thermique."),
    _mcq("CO₂ atmosphérique a augmenté à cause de :", ['volcans', 'respiration', 'combustion fossiles', 'aucun'], 2, "Activité humaine industrielle."),
    _mcq("Cycle du carbone : réservoir le plus grand ?", ['atmosphère', 'biosphère', 'océans', 'sols'], 2, "CO₂ dissous, énorme."),
  ]},
};

String _sqlEscape(String s) => s.replaceAll("'", "''");

void main() {
  final buf = StringBuffer();
  buf.writeln('-- Migration 039: SVT quiz items (Phase 4.5).');
  buf.writeln('-- ~8 items per chapter × 25 chapters = ~200 items.');
  buf.writeln('-- Auto-generated by json_encode_items_svt.dart.');
  buf.writeln('BEGIN;');
  buf.writeln();

  var counter = 0;
  for (final entry in _skills.entries) {
    final code = entry.key;
    final skillUuid = entry.value['uuid'] as String;
    final items = entry.value['items'] as List;
    buf.writeln("-- ===== $code (${items.length} items) =====");
    for (final raw in items) {
      final item = raw as Map<String, dynamic>;
      counter++;
      final hex = counter.toRadixString(16).padLeft(12, '0');
      final itemUuid = '66666666-aaaa-0000-0000-$hex';
      final type = item['type'] as String;
      final question = jsonEncode(item['q']);
      final explanation = jsonEncode(item['e']);
      final difficulty = 1; // default
      buf.writeln("INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)");
      buf.writeln("VALUES ('$itemUuid', '$skillUuid', '$type', $difficulty, 'fr', '${_sqlEscape(question)}'::jsonb, '${_sqlEscape(explanation)}'::jsonb, '{\"bac_style\"}')");
      buf.writeln("ON CONFLICT (id) DO NOTHING;");
    }
    buf.writeln();
  }

  buf.writeln('COMMIT;');
  File('backend/supabase/migrations/039_items_svt.sql').writeAsStringSync(buf.toString());
  stdout.writeln('Wrote backend/supabase/migrations/039_items_svt.sql ($counter items).');
}
