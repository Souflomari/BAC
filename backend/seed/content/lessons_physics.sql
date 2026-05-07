-- ============================================================
-- Physics lesson content: theory, formulas, examples per skill
-- Uses dollar-quoting for JSONB values containing LaTeX/SVG
-- ============================================================

-- 1. Cinematique (kinematics)
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Mouvement rectiligne",
      "body_fr": "Un mouvement rectiligne est un mouvement dont la trajectoire est une droite.\n\nOn distingue :\n- Le mouvement rectiligne uniforme (MRU) : la vitesse est constante\n- Le mouvement rectiligne uniformement varie (MRUV) : l'acceleration est constante\n\nLe vecteur position $\\vec{OM}$ repere la position du mobile sur la trajectoire. La vitesse instantanee est la derivee du vecteur position par rapport au temps."
    },
    {
      "type": "formula",
      "title_fr": "Equations horaires du MRUV",
      "body_fr": "Pour un mouvement rectiligne uniformement varie :\n\nPosition :\n$$x(t) = x_0 + v_0 t + \\frac{1}{2} a t^2$$\n\nVitesse :\n$$v(t) = v_0 + a t$$\n\nRelation sans le temps :\n$$v^2 - v_0^2 = 2a(x - x_0)$$\n\nOu $x_0$ est la position initiale, $v_0$ la vitesse initiale, et $a$ l'acceleration."
    },
    {
      "type": "example",
      "title_fr": "Chute libre verticale",
      "body_fr": "Un objet est lache sans vitesse initiale d'une hauteur $h = 20$ m.\n\nOn prend $g = 10$ m/s$^2$.\n\nEquation du mouvement : $y(t) = h - \\frac{1}{2}g t^2$\n\nTemps de chute : $y(t_c) = 0 \\Rightarrow t_c = \\sqrt{\\frac{2h}{g}} = \\sqrt{\\frac{2 \\times 20}{10}} = 2$ s\n\nVitesse a l'arrivee : $v = g \\cdot t_c = 10 \\times 2 = 20$ m/s"
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000024';

-- 2. Lois de Newton
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Les trois lois de Newton",
      "body_fr": "1ere loi (Inertie) : Dans un referentiel galileen, si la somme des forces est nulle, le centre d'inertie est en MRU ou au repos.\n\n2eme loi (PFD) : $\\sum \\vec{F} = m \\vec{a}$\nLa somme des forces appliquees a un systeme est egale au produit de sa masse par son acceleration.\n\n3eme loi (Action-reaction) : Si un corps A exerce une force sur B, alors B exerce sur A une force de meme intensite, de meme direction mais de sens oppose."
    },
    {
      "type": "formula",
      "title_fr": "Principe Fondamental de la Dynamique",
      "body_fr": "Le PFD dans un referentiel galileen :\n$$\\sum \\vec{F}_{ext} = m \\vec{a}_G$$\n\nForces courantes :\n- Poids : $\\vec{P} = m\\vec{g}$ avec $g \\approx 10$ N/kg\n- Reaction normale : $\\vec{N}$ perpendiculaire au support\n- Frottement : $\\vec{f} = -\\mu N \\vec{u}_v$ (oppose au mouvement)\n- Tension du fil : $\\vec{T}$ le long du fil\n\nProjection sur un axe : $\\sum F_x = m a_x$"
    },
    {
      "type": "example",
      "title_fr": "Plan incline avec frottement",
      "body_fr": "Un bloc de masse $m = 2$ kg glisse sur un plan incline d'angle $\\alpha = 30°$ avec un coefficient de frottement $\\mu = 0{,}2$.\n\nProjection sur l'axe du mouvement :\n$$ma = mg\\sin\\alpha - \\mu mg\\cos\\alpha$$\n$$a = g(\\sin\\alpha - \\mu\\cos\\alpha)$$\n$$a = 10(\\sin 30° - 0{,}2 \\times \\cos 30°)$$\n$$a = 10(0{,}5 - 0{,}173) = 3{,}27 \\text{ m/s}^2$$"
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000025';

-- 3. Energie mecanique
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Energie cinetique et potentielle",
      "body_fr": "L'energie cinetique d'un solide en translation :\n$$E_c = \\frac{1}{2}mv^2$$\n\nL'energie potentielle de pesanteur :\n$$E_{pp} = mgh$$\n\nOu $h$ est l'altitude par rapport a une reference choisie.\n\nL'energie mecanique est la somme :\n$$E_m = E_c + E_{pp} = \\frac{1}{2}mv^2 + mgh$$"
    },
    {
      "type": "formula",
      "title_fr": "Conservation et non-conservation",
      "body_fr": "Systeme conservatif (sans frottement) :\n$$E_m = \\text{constante}$$\n$$\\frac{1}{2}mv_A^2 + mgh_A = \\frac{1}{2}mv_B^2 + mgh_B$$\n\nSysteme non conservatif (avec frottement) :\n$$\\Delta E_m = W(\\vec{f})$$\n\nLe theoreme de l'energie cinetique :\n$$\\Delta E_c = \\sum W(\\vec{F}_{ext})$$"
    },
    {
      "type": "example",
      "title_fr": "Pendule simple",
      "body_fr": "Un pendule de longueur $L = 1$ m est ecarte d'un angle $\\theta_0 = 60°$ puis lache.\n\nHauteur initiale : $h = L(1 - \\cos\\theta_0) = 1(1 - \\cos 60°) = 0{,}5$ m\n\nPar conservation de $E_m$ au point le plus bas ($h = 0$) :\n$$mgh = \\frac{1}{2}mv^2$$\n$$v = \\sqrt{2gh} = \\sqrt{2 \\times 10 \\times 0{,}5} = \\sqrt{10} \\approx 3{,}16 \\text{ m/s}$$"
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000026';

-- 4. Proprietes des ondes
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Ondes mecaniques progressives",
      "body_fr": "Une onde mecanique est la propagation d'une perturbation dans un milieu materiel sans transport de matiere.\n\nCaracteristiques :\n- Onde transversale : la perturbation est perpendiculaire a la direction de propagation\n- Onde longitudinale : la perturbation est parallele a la propagation\n- Celeri : vitesse de propagation $v$ de l'onde dans le milieu\n\nUne onde periodique est caracterisee par sa periode $T$ et sa frequence $f = \\frac{1}{T}$."
    },
    {
      "type": "formula",
      "title_fr": "Relations fondamentales",
      "body_fr": "Longueur d'onde :\n$$\\lambda = v \\cdot T = \\frac{v}{f}$$\n\nRetard :\n$$\\tau = \\frac{d}{v}$$\n\nOu $d$ est la distance entre deux points et $v$ la celerite.\n\nDiffraction : elle se produit quand $\\lambda \\geq a$ (taille de l'ouverture).\n\nEcart angulaire :\n$$\\theta = \\frac{\\lambda}{a}$$"
    },
    {
      "type": "example",
      "title_fr": "Cuve a ondes",
      "body_fr": "Une onde se propage a la surface de l'eau avec une frequence $f = 20$ Hz. On mesure une distance de $15$ cm entre 6 cretes consecutives.\n\nLa distance entre 6 cretes = 5 longueurs d'onde :\n$$5\\lambda = 15 \\text{ cm} \\Rightarrow \\lambda = 3 \\text{ cm} = 0{,}03 \\text{ m}$$\n\nCelerite :\n$$v = \\lambda \\cdot f = 0{,}03 \\times 20 = 0{,}6 \\text{ m/s}$$"
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000027';

-- 5. Ondes sonores et lumineuses
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Son et lumiere",
      "body_fr": "Le son est une onde mecanique longitudinale qui necessite un milieu materiel.\n- Vitesse dans l'air : $v \\approx 340$ m/s\n- Domaine audible : $20$ Hz a $20 000$ Hz\n- Ultrasons : $f > 20$ kHz ; Infrasons : $f < 20$ Hz\n\nLa lumiere est une onde electromagnetique qui se propage dans le vide.\n- Vitesse dans le vide : $c = 3 \\times 10^8$ m/s\n- Spectre visible : $400$ nm (violet) a $800$ nm (rouge)"
    },
    {
      "type": "formula",
      "title_fr": "Dispersion et indice de refraction",
      "body_fr": "Indice de refraction :\n$$n = \\frac{c}{v}$$\n\nLoi de Snell-Descartes :\n$$n_1 \\sin i_1 = n_2 \\sin i_2$$\n\nLongueur d'onde dans un milieu :\n$$\\lambda_{milieu} = \\frac{\\lambda_0}{n}$$\n\nOu $\\lambda_0$ est la longueur d'onde dans le vide.\n\nNiveau d'intensite sonore : $L = 10 \\log \\frac{I}{I_0}$ (en dB)"
    },
    {
      "type": "example",
      "title_fr": "Diffraction de la lumiere",
      "body_fr": "Un faisceau laser de longueur d'onde $\\lambda = 633$ nm traverse une fente de largeur $a = 0{,}1$ mm. L'ecran est place a $D = 2$ m.\n\nEcart angulaire :\n$$\\theta = \\frac{\\lambda}{a} = \\frac{633 \\times 10^{-9}}{0{,}1 \\times 10^{-3}} = 6{,}33 \\times 10^{-3} \\text{ rad}$$\n\nLargeur de la tache centrale :\n$$L = 2D\\theta = 2 \\times 2 \\times 6{,}33 \\times 10^{-3} = 2{,}53 \\text{ cm}$$"
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000028';

-- 6. Circuits RC et RL
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Le dipole RC",
      "body_fr": "Un circuit RC est compose d'une resistance $R$ et d'un condensateur de capacite $C$.\n\nCharge du condensateur :\n- La tension $u_C$ augmente progressivement jusqu'a atteindre $E$ (fem du generateur)\n- Le courant $i$ diminue exponentiellement de $\\frac{E}{R}$ a $0$\n\nDecharge du condensateur :\n- $u_C$ diminue exponentiellement de $E$ a $0$\n- Le courant change de sens\n\nLa constante de temps $\\tau = RC$ caracterise la rapidite de la charge/decharge."
    },
    {
      "type": "formula",
      "title_fr": "Equations du circuit RC",
      "body_fr": "Charge :\n$$u_C(t) = E(1 - e^{-t/\\tau})$$\n$$i(t) = \\frac{E}{R} e^{-t/\\tau}$$\n\nDecharge :\n$$u_C(t) = E \\cdot e^{-t/\\tau}$$\n\nConstante de temps : $\\tau = RC$\n\nEnergie stockee dans le condensateur :\n$$E_C = \\frac{1}{2}Cu_C^2$$\n\nA $t = 5\\tau$, le regime permanent est atteint (a 99%)."
    },
    {
      "type": "example",
      "title_fr": "Determination de la constante de temps",
      "body_fr": "Un condensateur $C = 10$ $\\mu$F est charge a travers une resistance $R = 100$ k$\\Omega$ par un generateur $E = 12$ V.\n\n$\\tau = RC = 100 \\times 10^3 \\times 10 \\times 10^{-6} = 1$ s\n\nA $t = \\tau$ : $u_C = E(1 - e^{-1}) = 12 \\times 0{,}632 = 7{,}58$ V\n\nA $t = 3\\tau = 3$ s : $u_C = 12(1 - e^{-3}) = 12 \\times 0{,}950 = 11{,}4$ V\n\nRegime permanent a $t \\approx 5$ s."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000029';

-- 7. Oscillations RLC
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Circuit RLC serie",
      "body_fr": "Un circuit RLC serie contient une resistance $R$, une bobine d'inductance $L$, et un condensateur de capacite $C$.\n\nLe circuit presente des oscillations electriques :\n- Si $R = 0$ : oscillations libres non amorties (regime pseudo-periodique ideal)\n- Si $R$ faible : oscillations amorties (l'amplitude decroit)\n- Si $R$ grand : regime aperiodique (pas d'oscillations)\n\nL'energie oscille entre le condensateur ($E_C = \\frac{1}{2}Cu_C^2$) et la bobine ($E_L = \\frac{1}{2}Li^2$)."
    },
    {
      "type": "formula",
      "title_fr": "Equations du circuit RLC",
      "body_fr": "Equation differentielle :\n$$L\\frac{d^2q}{dt^2} + R\\frac{dq}{dt} + \\frac{q}{C} = 0$$\n\nPeriode propre (sans amortissement) :\n$$T_0 = 2\\pi\\sqrt{LC}$$\n\nPulsation propre :\n$$\\omega_0 = \\frac{1}{\\sqrt{LC}}$$\n\nEn regime force, la resonance se produit quand la frequence du generateur egale la frequence propre : $f = f_0$."
    },
    {
      "type": "example",
      "title_fr": "Oscillations libres",
      "body_fr": "Un circuit RLC avec $L = 0{,}1$ H, $C = 100$ $\\mu$F, $R = 0$.\n\nPeriode propre :\n$$T_0 = 2\\pi\\sqrt{LC} = 2\\pi\\sqrt{0{,}1 \\times 100 \\times 10^{-6}}$$\n$$T_0 = 2\\pi\\sqrt{10^{-5}} = 2\\pi \\times 3{,}16 \\times 10^{-3}$$\n$$T_0 \\approx 19{,}9 \\text{ ms}$$\n\nFrequence propre : $f_0 = \\frac{1}{T_0} \\approx 50{,}3$ Hz"
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000030';

-- 8. Reactions acido-basiques
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Acides et bases selon Bronsted",
      "body_fr": "Selon Bronsted :\n- Un acide est une espece capable de ceder un proton $H^+$\n- Une base est une espece capable de capter un proton $H^+$\n\nCouple acide/base : $AH/A^-$\nDemi-equation : $AH \\rightleftharpoons A^- + H^+$\n\nExemples :\n- $HCl/Cl^-$ (acide fort)\n- $CH_3COOH/CH_3COO^-$ (acide faible)\n- $NH_4^+/NH_3$\n\nLe pH mesure l'acidite : $pH = -\\log[H_3O^+]$"
    },
    {
      "type": "formula",
      "title_fr": "pH et constante Ka",
      "body_fr": "Produit ionique de l'eau :\n$$K_e = [H_3O^+][HO^-] = 10^{-14}$$ a 25 C\n\nConstante d'acidite :\n$$K_a = \\frac{[A^-][H_3O^+]}{[AH]}$$\n\n$$pK_a = -\\log K_a$$\n\nRelation de Henderson-Hasselbalch :\n$$pH = pK_a + \\log\\frac{[A^-]}{[AH]}$$\n\nA l'equivalence d'un dosage : $C_A V_A = C_B V_B$"
    },
    {
      "type": "example",
      "title_fr": "Dosage acide-base",
      "body_fr": "On dose $V_A = 20$ mL d'acide ethanoique de concentration $C_A$ par une solution de soude $C_B = 0{,}1$ mol/L.\n\nLe volume a l'equivalence est $V_{BE} = 15$ mL.\n\nA l'equivalence : $C_A V_A = C_B V_{BE}$\n$$C_A = \\frac{C_B V_{BE}}{V_A} = \\frac{0{,}1 \\times 15}{20} = 0{,}075 \\text{ mol/L}$$\n\nLe pH a la demi-equivalence ($V_B = 7{,}5$ mL) :\n$$pH = pK_a \\approx 4{,}75$$\n(car $[AH] = [A^-]$)"
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000031';

-- 9. Reactions d'oxydoreduction
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Oxydation et reduction",
      "body_fr": "Une reaction d'oxydoreduction met en jeu un transfert d'electrons :\n\n- Oxydation : perte d'electrons (l'espece est un reducteur)\n- Reduction : gain d'electrons (l'espece est un oxydant)\n\nCouple oxydant/reducteur : $Ox/Red$\nDemi-equation : $Ox + ne^- \\rightleftharpoons Red$\n\nExemples :\n- $Cu^{2+}/Cu$ : $Cu^{2+} + 2e^- \\rightleftharpoons Cu$\n- $Zn^{2+}/Zn$ : $Zn^{2+} + 2e^- \\rightleftharpoons Zn$\n- $MnO_4^-/Mn^{2+}$ en milieu acide"
    },
    {
      "type": "formula",
      "title_fr": "Piles et electrolyse",
      "body_fr": "Force electromotrice d'une pile :\n$$E = E_{cathode} - E_{anode}$$\n\nQuantite d'electricite :\n$$Q = n \\cdot F \\cdot z$$\n\nOu $n$ est la quantite de matiere, $F = 96500$ C/mol (constante de Faraday), $z$ le nombre d'electrons echanges.\n\nRelation avec le courant :\n$$Q = I \\cdot t$$\n\nMasse deposee lors de l'electrolyse :\n$$m = \\frac{M \\cdot I \\cdot t}{z \\cdot F}$$"
    },
    {
      "type": "example",
      "title_fr": "Pile Daniell",
      "body_fr": "La pile Daniell : $Zn | Zn^{2+} || Cu^{2+} | Cu$\n\nA l'anode (oxydation) : $Zn \\rightarrow Zn^{2+} + 2e^-$\nA la cathode (reduction) : $Cu^{2+} + 2e^- \\rightarrow Cu$\n\nBilan : $Zn + Cu^{2+} \\rightarrow Zn^{2+} + Cu$\n\nSi la pile debite un courant $I = 0{,}5$ A pendant $t = 1$ h :\n$$Q = I \\times t = 0{,}5 \\times 3600 = 1800 \\text{ C}$$\n$$n_{Cu} = \\frac{Q}{zF} = \\frac{1800}{2 \\times 96500} = 9{,}33 \\times 10^{-3} \\text{ mol}$$\n$$m_{Cu} = n \\times M = 9{,}33 \\times 10^{-3} \\times 63{,}5 = 0{,}59 \\text{ g}$$"
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000032';
