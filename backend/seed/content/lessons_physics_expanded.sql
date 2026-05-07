-- ============================================================
-- Physics lesson cards expansion: 3 additional cards per skill (cards 4–6)
-- Content style: physical intuition first (Walter Lewin), worked BAC problems
--   (Hachette/Nathan Terminale PC + Moroccan BAC past papers).
-- Safe to re-run: only appends if card count < 6.
-- ============================================================

-- =====================
-- 24. Cinématique (kinematics)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Mouvement parabolique : indépendance des axes",
      "body_fr": "Voici l''idée clé de Galilée, confirmée par expérience : une balle lancée horizontalement et une balle lâchée en chute libre tombent **au sol exactement en même temps**, quelle que soit la vitesse initiale horizontale. Les mouvements horizontal et vertical sont totalement indépendants.\n\nSur l''axe $x$ : $a_x = 0$, donc $v_x = v_0$ (constant) et $x = v_0 t$.\nSur l''axe $y$ : $a_y = -g$, donc $v_y = -gt$ et $y = -\\frac{1}{2}gt^2$.\n\n**L''élimination de $t$** donne la trajectoire : $y = -\\frac{g}{2v_0^2}x^2$ — une parabole.\n\n**Piège BAC :** En lancement oblique avec angle $\\alpha$, les composantes initiales sont $v_{0x} = v_0 \\cos\\alpha$ et $v_{0y} = v_0 \\sin\\alpha$."
    },
    {
      "type": "example",
      "title_fr": "Chute libre et lancer horizontal",
      "body_fr": "**Problème.** Un projectile est lancé horizontalement depuis une falaise de 45 m de hauteur avec $v_0 = 15$ m/s. Calculer le temps de chute et la portée horizontale. ($g = 10$ m/s²)\n\n**Solution.**\n\n*Axe vertical :* $y(t) = -\\frac{1}{2}gt^2 = -5t^2$. Le sol est atteint quand $y = -45$ m :\n$-5t^2 = -45 \\Rightarrow t^2 = 9 \\Rightarrow t = 3$ s.\n\n*Axe horizontal :* $x = v_0 t = 15 \\times 3 = 45$ m.\n\n*Vitesse à l''impact :* $v_x = 15$ m/s, $v_y = -gt = -30$ m/s. $v = \\sqrt{15^2 + 30^2} = 15\\sqrt{5} \\approx 33{,}5$ m/s.\n\n*Angle :* $\\tan\\theta = \\frac{|v_y|}{v_x} = 2$, $\\theta \\approx 63°$ sous l''horizontale."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC PC Maroc 2022 (adapté).** Une balle est lancée avec $v_0 = 20$ m/s à $\\alpha = 30°$ au-dessus de l''horizontale depuis le sol.\n\n1) Écrire les équations horaires $x(t)$ et $y(t)$.\n2) Calculer la hauteur maximale atteinte.\n3) Calculer la portée totale (distance horizontale à l''atterrissage).\n\n**Solution.** 1) $v_{0x} = 20\\cos30° = 10\\sqrt{3}$ m/s, $v_{0y} = 20\\sin30° = 10$ m/s.\n$x(t) = 10\\sqrt{3} \\cdot t$, $y(t) = 10t - 5t^2$.\n\n2) Hauteur max : $v_y = 0 \\Rightarrow 10 - 10t = 0 \\Rightarrow t = 1$ s. $y_{\\max} = 10 - 5 = 5$ m.\n\n3) Atterrissage : $y = 0 \\Rightarrow t(10 - 5t) = 0 \\Rightarrow t = 2$ s. Portée : $x = 10\\sqrt{3} \\times 2 = 20\\sqrt{3} \\approx 34{,}6$ m."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000024'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 25. Lois de Newton (newtons_laws)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Plan incliné et tension : méthode du bilan",
      "body_fr": "La méthode BAC pour tout problème de dynamique :\n\n**Étape 1 — Choisir le système** (la masse sur laquelle on applique Newton).\n\n**Étape 2 — Choisir un repère** adapté (souvent l''axe $x$ le long du mouvement).\n\n**Étape 3 — Bilan des forces** : poids $\\vec{P} = m\\vec{g}$, réaction normale $\\vec{N}$ (perpendiculaire au support), tension $\\vec{T}$ (si câble), frottement $\\vec{f}$ (si indiqué).\n\n**Étape 4 — Projeter** $\\sum \\vec{F} = m\\vec{a}$ sur chaque axe.\n\n**Étape 5 — Résoudre** le système d''équations.\n\n**Sur un plan incliné d''angle $\\alpha$ :** La composante du poids selon la pente est $mg\\sin\\alpha$ et la réaction normale est $N = mg\\cos\\alpha$."
    },
    {
      "type": "example",
      "title_fr": "Ascenseur : bilan des forces",
      "body_fr": "**Problème.** Un homme de 80 kg est dans un ascenseur. Quelle est la force exercée par le sol sur lui : (a) en montée à vitesse constante, (b) en accélération $a = 2$ m/s² vers le haut, (c) en décélération $a = 3$ m/s² (freinant en montée) ? ($g = 10$ m/s²)\n\n**Solution.** $\\sum F_y = ma$ (axe vers le haut positif) → $N - mg = ma$ → $N = m(g + a)$.\n\n**(a)** $a = 0$ (vitesse constante) : $N = 80 \\times 10 = 800$ N (poids normal).\n\n**(b)** $a = +2$ m/s² : $N = 80 \\times 12 = 960$ N (on se sent plus lourd).\n\n**(c)** $a = -3$ m/s² (décélération en montée) : $N = 80 \\times 7 = 560$ N (on se sent plus léger).\n\n**Leçon Walter Lewin :** La balance dans l''ascenseur mesure $N$, pas le poids — c''est pourquoi on se ''sent'' plus lourd ou plus léger lors des accélérations."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC PC Maroc 2023 (adapté).** Un bloc de 5 kg est posé sur un plan incliné à 30°, sans frottement. Un câble horizontal le retient.\n\n1) Faire le bilan des forces sur le bloc.\n2) Calculer la tension $T$ dans le câble et la réaction normale $N$.\n\n**Solution.** Forces : $\\vec{P}$ (poids, vers le bas), $\\vec{N}$ (normal au plan, perpendiculaire à la surface), $\\vec{T}$ (horizontale, vers le haut du plan).\n\nAxe $x$ (le long du plan, vers le haut) : $T\\cos30° - mg\\sin30° = 0$ (à l''arrêt, $a = 0$).\n$T = \\frac{mg\\sin30°}{\\cos30°} = mg\\tan30° = 5 \\times 10 \\times \\frac{1}{\\sqrt{3}} \\approx 28{,}9$ N.\n\nAxe $y$ (perpendiculaire au plan) : $N - mg\\cos30° - T\\sin30° = 0$.\n$N = 5 \\times 10 \\times \\frac{\\sqrt{3}}{2} + 28{,}9 \\times 0{,}5 \\approx 43{,}3 + 14{,}4 = 57{,}7$ N."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000025'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 26. Énergie mécanique (energy)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Théorème travail-énergie et puissance",
      "body_fr": "Le **théorème de l''énergie cinétique** (TEC) : la variation d''énergie cinétique est égale à la somme des travaux de toutes les forces :\n$$\\Delta E_k = E_{k_f} - E_{k_i} = \\sum W_{\\text{forces}}$$\nSi seules les forces conservatives travaillent (poids, ressort) : $E_m = E_k + E_p = \\text{constante}$.\nSi frottement présent : $E_{m_f} - E_{m_i} = W_{\\text{frottement}} < 0$ (l''énergie mécanique diminue).\n\n**Puissance :** $P = \\frac{W}{\\Delta t} = \\vec{F} \\cdot \\vec{v}$ (produit scalaire force-vitesse). Unité : Watt (W).\n\n**Rendement :** $\\eta = \\frac{P_{\\text{utile}}}{P_{\\text{absorbée}}} \\leq 1$."
    },
    {
      "type": "example",
      "title_fr": "Conservation de l''énergie mécanique",
      "body_fr": "**Problème.** Une bille de 100 g lâchée depuis $h = 2$ m. Calculer sa vitesse au bas de la chute (sans frottement).\n\n**Solution.** En l''absence de frottement, $E_m$ est conservée :\n$E_{m_i} = E_{m_f}$\n$mgh + 0 = 0 + \\frac{1}{2}mv^2$ (en bas : $h = 0$, $v_i = 0$)\n$v = \\sqrt{2gh} = \\sqrt{2 \\times 10 \\times 2} = \\sqrt{40} = 2\\sqrt{10} \\approx 6{,}32$ m/s\n\n**Remarque clé :** La masse $m$ s''annule — la vitesse ne dépend pas de la masse (Galilée avait raison). Une balle de fer et une balle de mousse lâchées de la même hauteur arrivent en bas avec la même vitesse (en l''absence d''air)."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC PC 2022 (adapté).** Un skateur (70 kg) descend une pente de 5 m de hauteur. Des frottements de force constante $f = 50$ N s''exercent sur une distance $d = 12$ m.\n\n1) Calculer l''énergie mécanique perdue par frottement.\n2) En déduire la vitesse en bas de la pente.\n\n**Solution.** 1) Travail des frottements : $W_f = -f \\times d = -50 \\times 12 = -600$ J.\n\n2) TEC : $E_{m_f} - E_{m_i} = W_f$.\n$\\frac{1}{2}mv_f^2 - mgh = -600$\n$\\frac{1}{2} \\times 70 \\times v_f^2 = 70 \\times 10 \\times 5 - 600 = 3500 - 600 = 2900$ J\n$v_f^2 = \\frac{2 \\times 2900}{70} = \\frac{5800}{70} \\approx 82{,}9$\n$v_f \\approx 9{,}1$ m/s"
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000026'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 27. Propriétés des ondes (wave_properties)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Interférences et diffraction",
      "body_fr": "**Interférences :** Quand deux ondes cohérentes se superposent, elles peuvent se renforcer (interférences constructives) ou s''annuler (interférences destructives).\n\n- Constructives : $\\delta = k\\lambda$ ($k$ entier) → chemin de différence multiple de $\\lambda$\n- Destructives : $\\delta = (k + \\frac{1}{2})\\lambda$\n\n**Diffraction :** Une onde contourne un obstacle ou se disperse en passant par une fente. La déviation est notable quand la largeur de la fente $a$ est comparable à $\\lambda$. Angle de déviation : $\\sin\\theta \\approx \\frac{\\lambda}{a}$ (premier minimum).\n\n**Expérience de Young (doubles fentes) :** Interfrange $i = \\frac{\\lambda D}{d}$ où $D$ est la distance écran-fentes et $d$ l''espacement entre fentes. Permet de mesurer $\\lambda$."
    },
    {
      "type": "example",
      "title_fr": "Fentes de Young — calcul de l''interfrange",
      "body_fr": "**Problème.** Dans une expérience de Young, deux fentes espacées de $d = 0{,}5$ mm sont placées à $D = 1$ m d''un écran. On utilise une lumière de $\\lambda = 600$ nm. Calculer l''interfrange.\n\n**Solution.** $i = \\frac{\\lambda D}{d} = \\frac{600 \\times 10^{-9} \\times 1}{0{,}5 \\times 10^{-3}} = \\frac{6 \\times 10^{-7}}{5 \\times 10^{-4}} = 1{,}2 \\times 10^{-3}$ m $= 1{,}2$ mm.\n\nSi on mesure $i = 1{,}2$ mm, on peut déduire $\\lambda = \\frac{id}{D} = 600$ nm (lumière orange-rouge).\n\n**Application inverse :** Cette technique est utilisée pour mesurer précisément des longueurs d''onde ou des distances très faibles (ex : en métrologie)."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC PC 2023 (adapté).** Une onde sinusoïdale de fréquence $f = 500$ Hz se propage dans l''air ($v = 340$ m/s).\n\n1) Calculer la longueur d''onde $\\lambda$.\n2) Deux sources en phase sont séparées de $d = 0{,}68$ m. Un point $P$ est à $r_1 = 3{,}4$ m de la source 1 et $r_2 = 4{,}08$ m de la source 2. Y a-t-il interférence constructive ou destructive en $P$ ?\n\n**Solution.** 1) $\\lambda = \\frac{v}{f} = \\frac{340}{500} = 0{,}68$ m.\n\n2) Différence de marche : $\\delta = |r_2 - r_1| = |4{,}08 - 3{,}4| = 0{,}68$ m $= 1 \\times \\lambda$.\n\nComme $\\delta = k\\lambda$ avec $k = 1$ entier : **interférences constructives** en $P$."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000027'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 28. Ondes sonores et lumineuses (sound_light)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Effet Doppler et spectres lumineux",
      "body_fr": "**Effet Doppler :** Quand une source sonore s''approche, les fronts d''onde se compriment → fréquence perçue plus haute (sifflement aigu). Quand elle s''éloigne, ils s''étirent → fréquence plus basse. Formule :\n$$f_{\\text{perçu}} = f_0 \\frac{v \\pm v_{\\text{obs}}}{v \\mp v_{\\text{source}}}$$\n(signe + si rapprochement, - si éloignement).\n\n**Spectres lumineux :**\n- Spectre d''émission : raies brillantes sur fond noir — caractéristique de l''élément\n- Spectre d''absorption : raies sombres sur fond coloré — même raies qu''en émission\n- Loi de Wien : $\\lambda_{\\max} T = 2{,}898 \\times 10^{-3}$ m·K (couleur d''une étoile selon sa température)"
    },
    {
      "type": "example",
      "title_fr": "Décalage vers le rouge cosmologique",
      "body_fr": "**Problème.** Une galaxie éloignée montre la raie H-alpha normalement à $\\lambda_0 = 656$ nm décalée vers $\\lambda = 722$ nm. Calculer la vitesse de récession.\n\n**Solution.** Décalage Doppler (vitesse non relativiste) :\n$\\frac{\\Delta\\lambda}{\\lambda_0} = \\frac{v}{c}$\n$\\Delta\\lambda = 722 - 656 = 66$ nm\n$v = c \\times \\frac{66}{656} = 3 \\times 10^8 \\times 0{,}1006 \\approx 3{,}02 \\times 10^7$ m/s $\\approx 0{,}1c$\n\n**Contexte :** Edwin Hubble a utilisé ce principe en 1929 pour montrer que l''univers est en expansion — toutes les galaxies lointaines s''éloignent de nous."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC PC 2022 (adapté).** Une ambulance émet un son à $f_0 = 440$ Hz et roule vers un observateur fixe à $v_s = 30$ m/s ($v_{\\text{son}} = 340$ m/s).\n\n1) Calculer la fréquence perçue par l''observateur.\n2) Après le passage de l''ambulance, quelle fréquence perçoit-il ?\n3) Calculer l''écart de fréquence entre avant et après.\n\n**Solution.** 1) Source se rapproche, observateur fixe :\n$f = f_0 \\frac{v}{v - v_s} = 440 \\times \\frac{340}{340-30} = 440 \\times \\frac{340}{310} \\approx 483$ Hz.\n\n2) Source s''éloigne : $f = 440 \\times \\frac{340}{370} \\approx 404$ Hz.\n\n3) Écart : $483 - 404 = 79$ Hz — perceptible à l''oreille !"
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000028'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 29. Circuits RC et RL (rc_rl_circuits)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Charge et décharge : constante de temps",
      "body_fr": "**Circuit RC :** Quand on ferme l''interrupteur, le condensateur se charge exponentiellement. La **constante de temps** $\\tau = RC$ est le temps mis pour atteindre 63 % de la charge finale (ou 37 % de la tension initiale lors d''une décharge).\n\n- Charge : $U_C(t) = E(1 - e^{-t/\\tau})$\n- Décharge : $U_C(t) = U_0 e^{-t/\\tau}$\n- Courant lors de la charge : $i(t) = \\frac{E}{R} e^{-t/\\tau}$\n\n**Circuit RL :** $\\tau = L/R$. L''inductance s''oppose aux variations de courant (comme un condensateur s''oppose aux variations de tension).\n\nRègle pratique : après $5\\tau$, le circuit est pratiquement à l''équilibre (99,3 %)."
    },
    {
      "type": "example",
      "title_fr": "Circuit RC : charge et énergie",
      "body_fr": "**Problème.** $R = 10$ k$\\Omega$, $C = 100$ $\\mu$F, $E = 12$ V. Calculer $\\tau$, puis $U_C$ et $i$ à $t = \\tau$.\n\n**Solution.** $\\tau = RC = 10^4 \\times 10^{-4} = 1$ s.\n\nÀ $t = \\tau$ :\n$U_C(\\tau) = 12(1 - e^{-1}) = 12 \\times 0{,}632 = 7{,}58$ V\n$i(\\tau) = \\frac{E}{R} e^{-1} = \\frac{12}{10^4} \\times 0{,}368 = 4{,}42 \\times 10^{-4}$ A $= 0{,}442$ mA\n\n**Énergie stockée dans le condensateur à $t = \\tau$ :**\n$W_C = \\frac{1}{2}CU_C^2 = \\frac{1}{2} \\times 10^{-4} \\times 7{,}58^2 \\approx 2{,}87 \\times 10^{-3}$ J"
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC PC 2023 (adapté).** Un condensateur $C = 50$ $\\mu$F est initialement chargé à $U_0 = 10$ V. On le connecte à une résistance $R = 2$ k$\\Omega$.\n\n1) Écrire l''équation différentielle régissant la décharge.\n2) Donner $U_C(t)$ et $\\tau$.\n3) À quel instant $U_C$ vaut-il $5$ V ?\n\n**Solution.** 1) La loi des mailles : $U_C + Ri = 0$. Or $i = -C\\frac{dU_C}{dt}$ (décharge), donc :\n$U_C - RC\\frac{dU_C}{dt} = 0 \\Rightarrow \\frac{dU_C}{dt} = \\frac{U_C}{RC}$... attention au signe : $RC\\frac{dU_C}{dt} + U_C = 0$.\n\n2) $U_C(t) = 10 e^{-t/\\tau}$ avec $\\tau = RC = 2000 \\times 50 \\times 10^{-6} = 0{,}1$ s.\n\n3) $10 e^{-t/0{,}1} = 5 \\Rightarrow e^{-10t} = 0{,}5 \\Rightarrow t = \\frac{\\ln 2}{10} \\approx 0{,}0693$ s $\\approx 69{,}3$ ms."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000029'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 30. Oscillations RLC (rlc_oscillations)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Résonance et facteur de qualité",
      "body_fr": "Dans un circuit RLC série soumis à une tension sinusoïdale de fréquence $f$, l''intensité est maximale à la **fréquence de résonance** $f_0 = \\frac{1}{2\\pi\\sqrt{LC}}$. À la résonance, la tension aux bornes de $R$ est maximale, et $U_L = U_C$ (ils se compensent).\n\n**Facteur de qualité :** $Q = \\frac{L\\omega_0}{R} = \\frac{1}{R}\\sqrt{\\frac{L}{C}}$. Plus $Q$ est grand, plus la résonance est sélective (pic fin).\n\n**Bande passante :** L''intervalle de fréquences où l''intensité est supérieure à $I_0/\\sqrt{2}$ vaut $\\Delta f = f_0/Q$.\n\n**Analogie mécanique :** RLC $\\leftrightarrow$ masse-ressort amorti. $L \\leftrightarrow m$, $C \\leftrightarrow 1/k$, $R \\leftrightarrow$ frottement visqueux."
    },
    {
      "type": "example",
      "title_fr": "Calcul de la fréquence de résonance",
      "body_fr": "**Problème.** Un circuit RLC série : $R = 50$ $\\Omega$, $L = 0{,}1$ H, $C = 10$ $\\mu$F. Calculer $f_0$, $Q$, et la bande passante.\n\n**Solution.**\n$f_0 = \\frac{1}{2\\pi\\sqrt{LC}} = \\frac{1}{2\\pi\\sqrt{0{,}1 \\times 10^{-5}}} = \\frac{1}{2\\pi \\times 10^{-3}} \\approx 159$ Hz\n\n$\\omega_0 = 2\\pi f_0 \\approx 1000$ rad/s\n\n$Q = \\frac{L\\omega_0}{R} = \\frac{0{,}1 \\times 1000}{50} = 2$\n\n$\\Delta f = \\frac{f_0}{Q} = \\frac{159}{2} \\approx 79{,}5$ Hz\n\n**Interprétation :** $Q = 2$ est un facteur de qualité modéré — la résonance est peu sélective. Un récepteur radio nécessite $Q > 100$ pour distinguer les stations."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC PC 2022 (adapté).** Un circuit RLC série est alimenté par $u(t) = 10\\cos(2000\\pi t)$ V. À la résonance, $U_R = 10$ V, $U_C = 50$ V.\n\n1) Calculer $I_0$, $R$, et $Z_C$ à la résonance.\n2) En déduire $C$.\n3) Calculer $Q$.\n\n**Solution.** 1) À la résonance, $U = U_R = 10$ V (tension maximale aux bornes de $R$).\n$I_0 = \\frac{U_R}{R}$. $U_C = X_C \\times I_0 = 50$ V, $X_C = \\frac{U_C}{I_0} = 5R$.\n\nOr $U = I_0 R = 10$ V → $I_0 = \\frac{10}{R}$. Et $50 = X_C \\times \\frac{10}{R} = \\frac{10 X_C}{R}$, donc $X_C = 5R$.\n\nSans autre information, $R$ n''est pas déterminé seul. Si $R = 2$ $\\Omega$ (donné), alors $I_0 = 5$ A, $X_C = 10$ $\\Omega$.\n\n2) $C = \\frac{1}{X_C \\omega_0} = \\frac{1}{10 \\times 2000\\pi} \\approx 15{,}9$ $\\mu$F.\n\n3) $Q = \\frac{U_C}{U} = \\frac{50}{10} = 5$."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000030'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 31. Réactions acido-basiques (acid_base)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "pH, pKa et diagramme de prédominance",
      "body_fr": "Pour un couple acide/base $AH/A^-$ de constante $K_a$ :\n$$\\text{pH} = \\text{pK}_a + \\log\\frac{[A^-]}{[AH]}$$\n(équation de Henderson-Hasselbalch)\n\n**Règle de prédominance :**\n- Si pH $<$ pKa : la forme acide $AH$ prédomine\n- Si pH $>$ pKa : la forme basique $A^-$ prédomine\n- Si pH $=$ pKa : $[AH] = [A^-]$ (demi-équivalence)\n\n**Diagramme de prédominance :** droite horizontale avec pKa au centre, forme acide à gauche, forme basique à droite.\n\n**pH d''une solution d''acide faible :** $\\text{pH} = \\frac{1}{2}(\\text{pKa} - \\log C)$ (formule simplifiée, valide si $K_a \\ll C$)."
    },
    {
      "type": "example",
      "title_fr": "Calcul de pH et taux d''avancement",
      "body_fr": "**Problème.** Solution d''acide acétique $CH_3COOH$ de concentration $C = 0{,}1$ mol/L. pKa = 4,75. Calculer le pH et le taux d''avancement $\\tau$.\n\n**Solution.** pH $= \\frac{1}{2}$(pKa $- \\log C) = \\frac{1}{2}(4{,}75 - \\log 0{,}1) = \\frac{1}{2}(4{,}75 + 1) = \\frac{5{,}75}{2} = 2{,}87$.\n\nTaux d''avancement : $\\tau = \\frac{[H_3O^+]}{C} = \\frac{10^{-2{,}87}}{0{,}1} = \\frac{1{,}35 \\times 10^{-3}}{0{,}1} = 1{,}35\\%$.\n\n**Conclusion :** L''acide acétique est un acide faible — seulement 1,35 % des molécules sont dissociées."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC PC 2023 (adapté).** On titre 20 mL d''une solution d''ammoniac $NH_3$ de concentration $C_b$ inconnue par une solution d''HCl à 0,1 mol/L. L''équivalence est atteinte à $V_e = 15$ mL. pKa($NH_4^+/NH_3$) = 9,2.\n\n1) Calculer $C_b$.\n2) Calculer le pH à la demi-équivalence.\n3) Calculer le pH à l''équivalence (solution de $NH_4Cl$).\n\n**Solution.** 1) $n_{HCl} = n_{NH_3} \\Rightarrow 0{,}1 \\times 0{,}015 = C_b \\times 0{,}020 \\Rightarrow C_b = 0{,}075$ mol/L.\n\n2) À la demi-équivalence : $[NH_3] = [NH_4^+]$, donc pH $=$ pKa $= 9{,}2$.\n\n3) À l''équivalence : $C(NH_4^+) = \\frac{0{,}1 \\times 0{,}015}{0{,}035} \\approx 0{,}043$ mol/L. pH $= \\frac{1}{2}$(14 $-$ pKa $- \\log C) = \\frac{1}{2}(14 - 9{,}2 + \\log 0{,}043) \\approx 5{,}2$."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000031'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 32. Réactions d'oxydoréduction (redox)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Piles électrochimiques et potentiel standard",
      "body_fr": "Une **pile électrochimique** convertit l''énergie chimique en énergie électrique via une réaction redox spontanée.\n\n**Constitution :** Deux demi-piles (couples redox) reliées par un pont salin.\n- Anode (−) : siège de l''oxydation (perd des électrons)\n- Cathode (+) : siège de la réduction (gagne des électrons)\n\n**Potentiel standard** $E°$ : plus un couple est oxydant (fort $E°$), plus il tend à se réduire. La réaction spontanée fait réduire le couple de $E°$ le plus élevé.\n\n**F.e.m. de la pile :** $E = E°_{cathode} - E°_{anode}$ (doit être positif pour réaction spontanée).\n\n**Équation de Nernst :** $E = E° + \\frac{0{,}06}{n}\\log\\frac{[Ox]}{[Red]}$ (à 25°C, $n$ = nombre d''électrons échangés)."
    },
    {
      "type": "example",
      "title_fr": "Pile Daniell : écriture et f.e.m.",
      "body_fr": "**Pile Daniell :** Zn/Zn²⁺ || Cu²⁺/Cu. $E°(Zn^{2+}/Zn) = -0{,}76$ V, $E°(Cu^{2+}/Cu) = +0{,}34$ V.\n\n**Réaction spontanée :** Le couple Cu²⁺/Cu a le plus grand $E°$ → Cu²⁺ est réduit (cathode +). Zn est oxydé (anode −).\n\n- Oxydation (anode) : $Zn \\to Zn^{2+} + 2e^-$\n- Réduction (cathode) : $Cu^{2+} + 2e^- \\to Cu$\n- Globale : $Zn + Cu^{2+} \\to Zn^{2+} + Cu$\n\n**F.e.m.** $E = 0{,}34 - (-0{,}76) = 1{,}10$ V.\n\n**Énergie libérée :** $W = nFE = 2 \\times 96500 \\times 1{,}10 \\approx 212{,}3$ kJ/mol de Zn oxydé."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC PC 2022 (adapté).** Identifier les oxydants et réducteurs, équilibrer la réaction, et calculer la f.e.m. :\n\nCouple 1 : $MnO_4^-/Mn^{2+}$, $E° = +1{,}51$ V\nCouple 2 : $Fe^{3+}/Fe^{2+}$, $E° = +0{,}77$ V\n\n**Solution.** $MnO_4^-$ est l''oxydant fort (plus grand $E°$) ; $Fe^{2+}$ est le réducteur.\n\nDemi-équations :\n- Réduction : $MnO_4^- + 8H^+ + 5e^- \\to Mn^{2+} + 4H_2O$\n- Oxydation : $Fe^{2+} \\to Fe^{3+} + e^-$ (× 5)\n\nÉquation globale (5 électrons échangés) :\n$MnO_4^- + 5Fe^{2+} + 8H^+ \\to Mn^{2+} + 5Fe^{3+} + 4H_2O$\n\n**F.e.m. :** $E = 1{,}51 - 0{,}77 = 0{,}74$ V (réaction spontanée car $E > 0$)."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000032'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;
