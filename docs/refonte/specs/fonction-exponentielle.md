# Spec v3 : la fonction exponentielle (`maths/fonction-exponentielle`)

> Plan d'auteur pour la leçon pilote `/pilote/exponentielle`, suite directe de `/pilote/logarithme`.
> Règles : [`07-regles-du-format.md`](../07-regles-du-format.md) ; fichiers et champs :
> [`08-kit-de-lecon.md`](../08-kit-de-lecon.md) ; modèle de ton et de rythme :
> `web/src/components/pilote/logarithme-moteur.js`. Fiche : bible A7 (`docs/bible/01-maths.md`).
> L'auteur suit ce plan étape par étape ; il rédige les textes, il ne décide ni l'ordre, ni les
> paris, ni les leurres. Tout nombre cité ici est à **recalculer par le code** (`exponentielle-outils.js`).

---

## 0. La leçon livrée (état au 2026-11-24)

Ce plan a été écrit avant la leçon. La leçon livrée (`web/src/components/pilote/exponentielle-moteur.js`) compte **53 étapes** : la relecture pédagogique et visuelle du 2026-11-24 en a fusionné, retiré ou déplacé plusieurs. **Le fichier de la leçon fait foi** ; les sections 1 à 8 ci-dessous restent le plan d'origine (raisons, sources, leurres), avec ses comptes d'étapes d'alors. L'ordre livré :

| # | Partie | Étapes (clés, dans l'ordre) |
|---|---|---|
| 0 | Ce qu’il faut savoir | `savoir`, `sav-rappel` |
| 1 | L’énigme | `bernoulli`, `semestre`, `fortune`, `curseur`, `plafond` |
| 2 | Défaire ln | `defaire`, `k-curseur`, `cent`, `exp-nom`, `aller-retour` |
| 3 | Le miroir | `diag`, `domaine-exp`, `asymptotes`, `pliage`, `passage` |
| 4 | Les règles de exp | `somme-produit`, `preuve-produit`, `notation`, `e2x` |
| 5 | Les équations | `ek`, `k-negatif`, `ek-ineq`, `inequation`, `systeme`, `v-equations` |
| 6 | La dérivée | `rappel`, `reflet-pente`, `pente-hauteur`, `derivee`, `eu`, `h0`, `v-derivee` |
| 7 | La tangente | `tangente0`, `preuve-tangente` |
| 8 | Retour à l’énigme | `retour-plafond`, `retour-limite`, `croissance` |
| 9 | Les limites | `course`, `x-sur-ex`, `x-ex-moins` |
| 10 | Au bac | `bac`, `bac-sol`, `bac-copie`, `bac-ineq`, `bac-2`, `bac-2-suite`, `bac-2-ineq` |
| 11 | Bilan | `q1`, `q2`, `q3`, `fin` |

## 1. Périmètre

### 1.1 Capacités officielles couvertes

| Filière | Id | Libellé (cadre 2025, mot pour mot) | Où |
|---|---|---|---|
| PC, SVT | `sexp 1.2.20` | Maitriser la résolution des équations, des inéquations et des systèmes comportant des exponentiels népériens. | séance 1, parties 5 et 9 |
| PC, SVT | `sexp 1.2.21` | Maitriser les limites de base de la fonction exponentielle népérienne et les appliquer. | séance 1, parties 3, 6, 7 |
| PC, SVT | `sexp 1.2.22` | Etudier des fonctions ou des composées de fonctions figurant au programme et les représenter graphiquement (…). | séance 1 (courbe, signe, tangente) ; étude complète en séance 2 |
| SM | `sm 1.3.13` | Résoudre des équations, des inéquations et des systèmes exponentiels. | séance 1 |
| SM | `sm 1.3.14` | Utiliser les limites de base de la fonction exponentielle népérienne. | séance 1 |
| SM | `sm 1.3.16` | Etudier des fonctions ou des fonctions composées (…) et les représenter graphiquement (…). | séance 1 partiel ; séance 2 |
| SM | `sm 1.3.12` | Maitriser le calcul exponentiel à base donnée | séance 2 (aˣ = e^{x ln a}) |
| SM | `sm 1.3.15` | Maitriser le calcul sur les puissances réelles. | séance 2 (x^α) |
| SM | `sm 1.3.8` | Utiliser les formules de dérivation pour la détermination des fonctions primitives (…). | séance 2 (u′e^u) |

Capacités réutilisées, enseignées ailleurs (prérequis, non testées seules ici) : dérivée de la
réciproque `sexp 1.2.11`, `sm 1.3.7` (sert à établir (eˣ)′ = eˣ) ; TVI `sexp 1.2.4`, `sm 1.2.4` (sert
à montrer que ln prend toute valeur) ; dérivée d'une composée `sexp 1.2.6`, `sm 1.3.2` (sert à (e^u)′).

### 1.2 Découpage en deux séances (comme le logarithme)

- **Séance 1, « Pourquoi exp »** (cette leçon, 58 étapes) : exp réciproque de ln, le miroir, les
  règles, équations, inéquations et systèmes, (eˣ)′ = eˣ, (e^u)′ = u′e^u, la tangente y = x + 1,
  les limites de base (en ±∞, (eˣ − 1)/x, eˣ/x, x e^{−x}), le retour à Bernoulli, une équation du bac.
- **Séance 2, « exp comme fonction »** (leçon à venir, annoncée au bilan) : étude complète au format
  problème (branches infinies, asymptote oblique, position relative, réciproque), limites
  habillées ((e^{kx} − 1)/x, eˣ − x), primitives de u′e^u ; **SM seulement** : aˣ = e^{x ln a},
  (aˣ)′ = ln a · aˣ, x^α, racine n-ième.

### 1.3 Hors programme, qu'on n'enseigne pas

Définition de exp par une série ou par l'équation y′ = y avec théorème d'existence ; e irrationnel ou
transcendant ; développements limités ; exp complexe (relève de `nombres-complexes-2`, notation e^{iθ}
seulement) ; puissances réelles et aˣ en PC/SVT (cadre SExp, note de lecture : « ni puissances
réelles ») ; la convergence de (1 + 1/n)ⁿ par le binôme (on la montre par ln′(1) = 1, partie 8).

### 1.4 Filières

| | PC, SVT | SM |
|---|---|---|
| Séance 1 | entière | entière |
| Séance 2 | sans aˣ ni x^α | avec aˣ, x^α, racine n-ième |
| Calcul | calculatrice non programmable : valeurs approchées admises (ln 3 ≈ 1,10) | sans calculatrice : résultats exacts (ln 3 reste ln 3) ; les énoncés donnent les approximations |

Les exercices de séance 1 ne distinguent pas les filières, sauf la consigne d'arrondi (champ `filieres`
seulement sur le gabarit 14).

---

## 2. L'énigme et son retour

**L'énigme (partie 1).** 1683 : Jacob Bernoulli étudie les intérêts composés [V]. Un capital de 1
prêté à 100 % par an devient 2. Capitalisé deux fois (50 % chaque semestre) : 2,25. Chaque mois :
2,61. Chaque jour : 2,71. **Capitaliser de plus en plus souvent fait-il fortune ?** L'élève parie,
puis fait glisser n : le capital (1 + 1/n)ⁿ plafonne vers 2,718… Il reconnaît les chiffres : c'est e,
le nombre où l'aire sous 1/x vaut 1. **D'où deux questions laissées ouvertes : pourquoi jamais
au-dessus de e ? et pourquoi e, le nombre de ln, dans un problème de banque ?**

**Le retour (partie 8).** Les deux questions tombent avec les outils de la leçon :
1. jamais au-dessus : 1 + 1/n ≤ e^{1/n} (la tangente, partie 7), donc (1 + 1/n)ⁿ ≤ e ;
2. exactement e : ln((1 + 1/n)ⁿ) = n ln(1 + 1/n) est le taux d'accroissement de ln en 1, qui tend
   vers ln′(1) = 1 (vu dans la leçon ln) ; donc (1 + 1/n)ⁿ = e^{n ln(1+1/n)} tend vers e¹.

Le fil rouge : « la pente de exp est sa hauteur » (partie 6) est la croissance du capital de
Bernoulli capitalisé à chaque instant (la courbe limite de l'escalier est y = eᵗ).

---

## 3. La chaîne des idées

1. Ce qu'on sait de ln (rappel) → 2. l'énigme pose e → 3. une fonction qui défait ln existe
car ln prend toute valeur réelle une seule fois → 4. son graphe est le reflet de celui de ln
(domaine, signe, limites, points-clés en découlent) → 5. elle change les + en × (règles, notation
eˣ) → 6. elle garde l'ordre (équations, inéquations, aucune condition d'existence) → 7. son reflet
donne sa pente : (eˣ)′ = eˣ, puis (e^u)′, puis (eʰ − 1)/h → 1 → 8. la tangente en 0 donne
eˣ ≥ x + 1, d'où eˣ/x → +∞ → 9. ces deux outils résolvent l'énigme → 10. le bac.

**Figure-clé : le miroir** (scène `miroir`, 11 étapes, un changement chacune) : `point`, `diag`,
`pliage`, `passage`, `domaine-exp`, `asymptotes` (partie 3), `k-curseur` en amont (partie 2),
`reflet-pente`, `derivee` (partie 6), `tangente0`, `preuve-tangente` (partie 7). Ses trois paris :
`domaine-exp`, `asymptotes`, `reflet-pente`.

### 3.1 Les parties (`BEATS`)

| # | name | court | étapes |
|---|---|---|---|
| 0 | Ce qu'il faut savoir | Savoir | 2 |
| 1 | L'énigme | Énigme | 6 |
| 2 | Défaire ln | Défaire | 6 |
| 3 | Le miroir | Miroir | 6 |
| 4 | Les règles de exp | Règles | 6 |
| 5 | Les équations | Équations | 6 |
| 6 | La dérivée | Dérivée | 7 |
| 7 | La tangente et les limites | Tangente | 5 |
| 8 | Retour à l'énigme | Retour | 3 |
| 9 | Au bac | Bac | 7 |
| 10 | Bilan | Bilan | 4 |

58 étapes. Notation des actions : **Q** question (une option `ok`, indice et second essai) ;
**P** pari de prédiction (sans `ok`, `reveal` tranche) ; **V** `verifie` ; **D** `deriv` ;
**M** manipulation (`ctl`). Dans les options : ✓ juste ; ✗ fausse, suivie de la conception affrontée
puis de l'idée du retour (B2 : nommer l'erreur, donner le bon geste ; l'indice est la question qui
ramène à ce geste).

### 3.2 Les scènes

| Scène | Origine | Ce qu'elle montre |
|---|---|---|
| `savoir` | copie adaptée du pilote logarithme | le test ln(e²), puis trois rappels sur ln |
| `interets` | **nouvelle** | voir ci-dessous |
| `miroir` | **nouvelle** | voir ci-dessous |
| `table` | copie adaptée du pilote logarithme | la table des puissances de 2, lue de haut en bas (pas → valeur) |
| `expo` | copie adaptée de `radioactivite-scenes-b.js` | la courbe de exp, une droite y = k, l'ensemble solution surligné sur l'axe |
| `taux` | copie adaptée du pilote logarithme | sécante puis tangente, avec f = exp et x₀ = 0 |
| `bac` | copie adaptée du pilote logarithme | la parabole du trinôme en t, la zone t ≤ 0 hachurée |
| `quiz`, `end` | copies du pilote logarithme | les trois pièges ; le bilan |

Les scènes du pilote logarithme vivent dans sa fermeture `monterPilote` : on les **copie** dans
`exponentielle-scenes-a.js` / `-b.js`, on ne les importe pas.

**Scène nouvelle `interets`** (décision du propriétaire, 07 §3.3).
- Montre : un repère temps t ∈ [0 ; 1] an, capital v ∈ [0 ; 3] ; l'escalier du capital pour n périodes
  (palier k à la hauteur (1 + 1/n)^k) ; la valeur finale écrite au bout ; en option, la droite
  pointillée y = e et la courbe y = eᵗ.
- Paramètres : `n` (entier), `stair` (0→1, tracé de l'escalier), `fin` (étiquette de la valeur),
  `ghost` (escaliers n = 1 et n = 2 en discret), `plaf` (droite y = e, étiquette « 2,718… »),
  `courbe` (y = eᵗ), `tab` (petit tableau n → capital : 1, 2, 4, 12, 52, 365).
- L'élève manipule : un curseur à crans n ∈ {1, 2, 3, 4, 6, 12, 52, 365, 1000, 8760, 525 600} ; la
  scène écrit « n = 12 : capital ≈ 2,613 ». Le curseur est verrouillé tant que le pari `fortune`
  n'est pas posé (comme `e` dans le logarithme, G-01-012).

**Scène nouvelle `miroir`** (la figure-clé).
- Montre : un repère orthonormé (même unité sur les deux axes, x ∈ [−3,5 ; 7,5], y ∈ [−2,8 ; 4,8]),
  la droite y = x, la courbe de ln (couleur de ln du pilote logarithme : `k-a`) et son reflet, la
  courbe de exp (`k-ink`).
- Paramètres : `lnc`, `diag`, `a` et `pA`, `pA2`, `perp` (un point, son reflet, le segment
  perpendiculaire à y = x) ; `refl` (0→1 : chaque point (x, ln x) glisse vers (ln x, x), la courbe se
  plie) ; `pts` (les paires (1 ; 0)/(0 ; 1) et (e ; 1)/(1 ; e)) ; `zone`, `zoneR` (bande x ≤ 0
  hachurée, puis son reflet y ≤ 0) ; `asym` (x = 0 pour ln, y = 0 pour exp) ; `k`, `kOn` (droite
  y = k, point d'intersection avec ln, son abscisse eᵏ) ; `b`, `tanB`, `tanB2` (tangente à ln en
  (b ; ln b), pente 1/b, puis son reflet, pente b) ; `xt`, `tanX` (point courant de exp, étiquettes
  « hauteur » et « pente ») ; `tg0` (la tangente y = x + 1).
- L'élève manipule : le curseur k (partie 2) et le curseur xt (partie 6).

---

### Partie 0 : Ce qu'il faut savoir (scène `savoir`)

- **`savoir`** · `ctl:'saut'` · un test : réussi du premier coup, on passe le rappel (comme le pilote
  logarithme). **V** « ln(e²) ? » ✓ 2. ✗ 1 : ln(aⁿ) = (ln a)ⁿ → l'exposant descend devant,
  2 ln e = 2. ✗ e² : croire que ln « ne change rien » à une puissance de e → ln compte l'exposant.
- **`sav-rappel`** · trois rappels, un par ligne de scène : ln(ab) = ln a + ln b ; ln est
  strictement croissante sur ]0,+∞[, ln 1 = 0, ln e = 1 ; ln x n'existe que pour x > 0. Pas
  d'action.

### Partie 1 : L'énigme (scène `interets`)

- **`bernoulli`** · tag `1683` · `n:1, stair:1, fin:1` · le problème : 1 prêté à 100 % devient 2 en
  un an. Pas d'action.
- **`semestre`** · `n:2, ghost:0` · capitaliser deux fois, c'est payer des intérêts sur les intérêts.
  **Q** « 50 % au bout de six mois, puis 50 % du nouveau capital : après un an ? » ✓ 2,25
  (1,5 × 1,5). ✗ 2 : croire que couper l'année ne change rien (intérêt simple) → la seconde moitié
  porte sur 1,5, pas sur 1. ✗ 4 : appliquer 100 % à chaque semestre → 50 % par semestre, ×1,5 deux
  fois. `reveal` : l'escalier à deux marches.
- **`fortune`** · `ghost:1` · la question de Bernoulli. **P** « Chaque mois, chaque jour, chaque
  seconde : le capital après un an… » options : « grandit sans limite » / « s'approche d'un
  plafond » / « grandit, mais de moins en moins vite, sans plafond ». Retour identique : « Pari noté.
  Fais l'expérience. » (forme de `a24` du logarithme).
- **`curseur`** · **M** `ctl:'n'` · `need` : n ≥ 365 atteint (ou « Montre-moi » après deux essais ou
  20 s) · chaque période multiplie par 1 + 1/n, n fois : tex (1 + 1/n)ⁿ. L'élève voit 2,44 ; 2,61 ;
  2,69 ; 2,71 ; puis 2,7169 (n = 1000), 2,7181 (n = 8760).
- **`cent-pas`** · `n:100` · e était déjà dans la leçon ln. **Q** « Avec n = 100, le capital est
  1,01¹⁰⁰ : tes pas de 1 %. Dans la leçon ln, l'aire valait à peu près les pas ÷ 100. Alors
  1,01¹⁰⁰ ≈ ? » ✓ environ 2,70 (100 pas → aire ≈ 1 → le nombre où l'aire vaut 1, e). ✗ environ 101 :
  confondre les pas et la valeur → les pas s'additionnent, la valeur se multiplie. ✗ environ 2 :
  2 est au pas 70 → 100 pas mènent plus loin.
- **`plafond`** · `n:525600, plaf:1` · texte dépendant du pari `fortune` (forme de `egales`) : le
  plafond est 2,718…, c'est e ; capitaliser à chaque instant ne fait pas fortune. `fort` :
  « Pourquoi jamais au-dessus de e ? Et pourquoi e ? La leçon va répondre. » Pas d'action.

### Partie 2 : Défaire ln (scène `miroir`, ln seule)

- **`defaire`** · `lnc:1, kOn:1, k:0` · une fonction qui, à un nombre k, associe le x tel que
  ln x = k. **Q** « Pour k = 0, quel x ? » ✓ 1 (ln 1 = 0). ✗ 0 : croire que « défaire » ramène 0 à 0
  → c'est ln 1 qui vaut 0. ✗ « aucun, car ln 0 n'existe pas » : confondre l'entrée et la sortie de ln
  → on cherche le x dont le ln vaut 0, pas ln 0.
- **`k-curseur`** · **M** `ctl:'k'`, k ∈ [−2,5 ; 2] · la droite y = k coupe la courbe de ln en un
  seul point ; la scène écrit « ln x = 1,5 pour x ≈ 4,48 ». Idée : chaque hauteur est atteinte une
  fois, car ln est strictement croissante.
- **`cent`** · `k:2` · ln n'a pas de plafond. **Q** « Existe-t-il un nombre dont le ln vaut 100 ? »
  ✓ « Oui, un seul » (ln(2¹⁴⁵) = 145 ln 2 ≈ 100,5 > 100 > 0 = ln 1 ; ln continue et strictement
  croissante, TVI). ✗ « Non : ln monte de plus en plus doucement, il plafonne » : ralentir n'est pas
  plafonner → indice « Que vaut ln(2ⁿ) ? ». ✗ « Oui, plusieurs » : ln strictement croissante ne
  repasse pas deux fois par la même hauteur.
- **`toutes-valeurs`** · `k:-2` · vers le bas aussi : ln(1/2ⁿ) = −n ln 2. ln prend toute valeur
  réelle, une fois : ln réalise une [[bijection|bijection]] de ]0,+∞[ sur ℝ. Les deux limites
  de ln en découlent (+∞ en +∞, −∞ en 0⁺), tex. Pas d'action.
- **`exp-nom`** · `kOn:0` · la définition, comme réponse : la fonction exponentielle népérienne,
  notée exp, est la [[reciproque|réciproque]] de ln. `fort`, tex : pour tout réel x et tout y > 0,
  exp(x) = y ⇔ x = ln y. exp(0) = 1 et exp(1) = e (de `defaire` et de la leçon ln). Pas d'action.
- **`aller-retour`** · les deux identités. **V** « Laquelle est vraie pour tout réel x ? »
  ✓ ln(exp x) = x. ✗ exp(ln x) = x : elle exige x > 0 (ln(−2) n'existe pas). ✗ « les deux » : même
  retour. `apres` : tex des deux identités avec leur domaine.

### Partie 3 : Le miroir (scène `miroir`, figure-clé)

- **`point`** · `a:2, pA:1` puis `pA2:1` · exp(0,69) ≈ 2 : le point (2 ; 0,69) de ln devient le
  point (0,69 ; 2) de exp ; les coordonnées s'échangent. Pas d'action.
- **`diag`** · **Q** « Échanger les coordonnées de chaque point, c'est quelle transformation ? »
  ✓ la symétrie par rapport à la droite y = x. ✗ la symétrie par rapport à l'axe des ordonnées :
  elle change x en −x, elle n'échange rien. ✗ un quart de tour : il envoie (2 ; 0,69) en
  (−0,69 ; 2). `reveal` : `diag:1, perp:1` (le segment est perpendiculaire à y = x, son milieu est
  dessus).
- **`pliage`** · `refl:0→1` en 2,4 s, puis `expc:1` · `fort` : la courbe de exp est le reflet de
  celle de ln dans la droite y = x (A3 : courbes de deux réciproques). Pas d'action.
- **`passage`** · `pts:1` · **V** « Par quel point passe à coup sûr la courbe de exp ? » ✓ (0 ; 1).
  ✗ (0 ; 0) : croire e⁰ = 0 → le reflet de (1 ; 0) est (0 ; 1). ✗ (1 ; 0) : c'est le point de ln.
- **`domaine-exp`** · pari de la figure 1/3 · **Q** « ln n'existe que pour x > 0. Et exp ? »
  ✓ exp(x) existe pour tout réel x, et exp(x) > 0. ✗ exp n'existe que pour x > 0 : c'est ln qui a
  un domaine restreint → le reflet de la bande verticale x ≤ 0 est la bande horizontale y ≤ 0.
  ✗ exp existe partout et devient négative pour x < 0 : la courbe de exp ne descend jamais sous
  l'axe. `reveal` : `zone:1` puis `zoneR:1`. `apres` : tex « pour tout réel x, eˣ > 0 » (formule
  provisoire en exp(x), la notation eˣ arrive partie 4).
- **`asymptotes`** · pari de la figure 2/3 · **Q** « Vers 0, ln descend sans fin le long de l'axe
  vertical. Son reflet, quand x tend vers −∞ ? » ✓ exp(x) s'approche de 0 sans l'atteindre
  (asymptote y = 0). ✗ exp(x) tend vers −∞ : confondre la limite de ln et celle de son reflet → le
  reflet d'une descente le long de l'axe vertical est une approche de l'axe horizontal. ✗ exp
  s'arrête en x = 0 : exp est définie partout. `reveal` : `asym:1`. `apres` : tex
  lim_{x→−∞} exp x = 0, lim_{x→+∞} exp x = +∞ ; exp strictement croissante, reflet d'une courbe
  croissante (`sujet` : les limites de base).

### Partie 4 : Les règles de exp (scènes `table` puis `expo`)

- **`somme-produit`** · scène `table`, `demo` lu de haut en bas : pas 2 + pas 3 → 4 × 8 = 32 · ln
  change × en + ; exp, qui le défait, change + en ×. **Q** « exp(a + b) = ? » ✓ exp(a) × exp(b).
  ✗ exp(a) + exp(b) (bible A7, première conception) → indice « Teste a = b = 0 : exp(0 + 0) = 1, et
  exp 0 + exp 0 ? ». ✗ exp(a × b) : c'est l'erreur à l'envers → dans la table, additionner les pas
  multiplie les valeurs.
- **`preuve-produit`** · **D** puis Q (B3) · lignes données : A = exp a > 0 et B = exp b > 0 (r : on
  nomme les deux nombres) ; ln(AB) = ln A + ln B = a + b (r : la règle du produit de ln, puis
  ln(exp a) = a). Pari `label` « La ligne suivante ? » ✓ AB = exp(a + b) (r : la définition,
  y = exp x ⇔ x = ln y). ✗ ln(AB) = exp(a + b) : on a mélangé les deux côtés de l'équivalence.
  ✗ AB = a + b : on a oublié de défaire le ln. `apres` : tex exp(a + b) = exp a × exp b.
- **`notation`** · scène `expo`, `ex:1` · exp(2) = exp(1 + 1) = e × e = e² ; pour tout entier n,
  exp(n) = eⁿ. D'où la notation eˣ = exp(x) pour tout réel x. tex : e^{a+b} = eᵃeᵇ,
  e^{a−b} = eᵃ/eᵇ, (eᵃ)ⁿ = e^{na}. `fort` : les règles des puissances restent vraies. Pas d'action.
- **`oppose`** · **Q** « eᵃ × e^{−a} = e⁰ = 1. Donc e^{−a} = ? » ✓ 1/eᵃ. ✗ −eᵃ : un exposant
  négatif ne rend pas le nombre négatif, e^{−a} > 0. ✗ eᵃ : le signe de l'exposant compte,
  e^{−1} ≈ 0,37 et e¹ ≈ 2,72.
- **`e2x`** · **V** « e^{2x} est égal à… » ✓ (eˣ)². ✗ 2eˣ : e^{x+x} = eˣ × eˣ, pas eˣ + eˣ.
  ✗ e^{x²} : (eˣ)² = e^{2x}, l'exposant est multiplié par 2, pas élevé au carré.
- **`qui-varie`** · bible A7, quatrième conception (eˣ et xᵉ) · **V** « e³ et 3ᵉ : lequel est une
  valeur de la fonction exponentielle ? » ✓ e³ (base e fixe, exposant qui varie ; e³ ≈ 20,09).
  ✗ 3ᵉ : la base varie, l'exposant e est fixe : c'est une puissance (3ᵉ ≈ 19,81, un autre nombre).
  ✗ « les deux, c'est le même nombre » : 20,09 contre 19,81.

### Partie 5 : Les équations (scène `expo`)

- **`ordre`** · `ex:1` · exp garde l'ordre (strictement croissante) et ne prend chaque valeur qu'une
  fois. tex : eᵃ = eᵇ ⇔ a = b ; eᵃ < eᵇ ⇔ a < b. `fort` : aucune condition d'existence, eᵃ existe pour
  tout réel a. Pas d'action.
- **`ek`** · `kOn:1, k:5` · **Q** « eˣ = 5 ? » ✓ x = ln 5 (≈ 1,61). ✗ x = 5/e : lire eˣ comme e × x.
  ✗ x = e⁵ : sens inversé, e^{e⁵} n'est pas 5 → c'est ln qui défait exp. `reveal` : l'intersection,
  « x = ln 5 ».
- **`k-negatif`** · `k:-2` · bible A7, troisième conception · **Q** « eˣ = −2 ? » ✓ aucune solution
  (eˣ > 0). ✗ x = ln(−2) : ln(−2) n'existe pas. ✗ x = −ln 2 : e^{−ln 2} = 1/2, positif. `reveal` :
  la droite passe sous la courbe sans la couper.
- **`inequation`** · **Q** « e^{2x−1} < e^{x+3} ⇔ ? » ✓ x < 4. ✗ x > 4 : exp garde l'ordre, elle ne
  le renverse pas. ✗ « x < 4 et x > 1/2 » : transférer le réflexe de ln (conditions d'existence) à
  exp → eᵘ existe pour tout u. `reveal` : `sol` surligne ]−∞, 4[.
- **`systeme`** · **V** « eˣ × eʸ = e⁵ et eˣ / eʸ = e : (x ; y) ? » ✓ (3 ; 2) (x + y = 5,
  x − y = 1). ✗ (e³ ; e²) : les inconnues sont les exposants. ✗ « pas de solution, eˣ × eʸ ne se
  simplifie pas » : eˣ × eʸ = e^{x+y}.
- **`v-equations`** · **V** « Pour quels x a-t-on eˣ > 1 ? » ✓ x > 0 (eˣ > e⁰). ✗ x > 1 : e¹ = e,
  c'est e⁰ qui vaut 1. ✗ pour tout x : e^{−1} ≈ 0,37 < 1. `apres` : tex « eˣ − 1 a le signe de x »
  (servira partie 7 et au bac : `sexp` 2022 N, Q4b).

### Partie 6 : La dérivée (scènes `miroir`, `interets`, `taux`)

- **`rappel`** · scène `expo` · `sujet:'exp et ln, l'aller-retour'` · texte : mi-parcours, c'est le
  bon moment pour une pause ; un rappel avant de repartir. **V** « e^{3 ln 2} = ? » ✓ 8
  (3 ln 2 = ln 2³). ✗ 6 : 3 ln 2 = ln(2³), pas ln(3 × 2). ✗ 9 : l'exposant 3 porte sur 2 : 2³, pas 3².
- **`reflet-pente`** · pari de la figure 3/3 · scène `miroir`, `b:4, tanB:1` · la tangente à ln en
  (4 ; ln 4) a pour pente ln′(4) = 1/4. **Q** « Reflétée dans y = x, sa pente devient… » ✓ 4
  (avancer de 4, monter de 1 devient avancer de 1, monter de 4). ✗ −1/4 : un reflet dans y = x
  n'inverse pas le sens de montée. ✗ 1/4 : la droite change de direction. `reveal` : `tanB2:1` au
  point (ln 4 ; 4) : pente 4, hauteur 4.
- **`derivee`** · **D** puis Q · lignes données : exp′(x) = 1 / ln′(eˣ) (r : la dérivée de la
  réciproque de ton cours, (f⁻¹)′(y) = 1/f′(f⁻¹(y))). Pari « La ligne suivante ? » ✓ = 1/(1/eˣ) = eˣ.
  ✗ = 1/(1/x) = x : ln′ est évaluée au point reflété eˣ, pas en x. ✗ = x e^{x−1} (bible A7, deuxième
  conception) : eˣ n'est pas une puissance de x, la règle de xⁿ ne s'applique pas. `apres` : tex
  (eˣ)′ = eˣ ; `seq` : `xt` balaie [−1,5 ; 1,6], étiquettes « hauteur » et « pente » égales.
- **`croissance`** · scène `interets`, `n:525600, courbe:1` · `fort` : la pente de exp est sa
  hauteur : plus on a, plus on gagne. C'est le capital de Bernoulli capitalisé à chaque instant :
  l'escalier épouse y = eᵗ. (Lien A8 : y′ = y.) Pas d'action.
- **`eu`** · scène `expo` · la composée (A4) : (f∘u)′ = u′ × f′∘u, tex (e^u)′ = u′e^u. **Q**
  « (e^{3x})′ = ? » ✓ 3e^{3x}. ✗ e^{3x} : oublier u′. ✗ 3x e^{3x−1} : règle des puissances.
- **`h0`** · scène `taux`, `seq` h de 1,5 à 0,05 (taux affiché 2,32 → 1,03) · **Q** « (eʰ − 1)/h,
  quand h tend vers 0 : forme 0/0. La limite ? » ✓ 1 (c'est le taux d'accroissement de exp en 0, il
  tend vers exp′(0) = e⁰ = 1). ✗ 0 : une forme 0/0 n'est pas 0, elle demande un calcul. ✗ +∞ :
  diviser par un nombre qui tend vers 0 ne suffit pas, le numérateur tend aussi vers 0. `reveal`
  avant l'`apres` : l'animation de h. `apres` : tex lim_{h→0} (eʰ − 1)/h = 1.
- **`v-derivee`** · **V** « Pente de la courbe de exp en x = 2 ? » ✓ e² ≈ 7,39. ✗ 2 : c'est x, pas la
  pente. ✗ 2e ≈ 5,44 : la règle x e^{x−1}.

### Partie 7 : La tangente et les limites (scènes `miroir`, `expo`)

- **`tangente0`** · `miroir`, `tg0:1` · en 0 : pente e⁰ = 1, point (0 ; 1), tangente y = x + 1.
  **P** « La courbe est-elle au-dessus de sa tangente, en dessous, ou la traverse-t-elle en 0 ? »
  `reveal` : zoom, la courbe reste au-dessus et ne touche qu'en (0 ; 1). Retours : la suite tranche.
- **`preuve-tangente`** · **D** puis Q · lignes : g(x) = eˣ − x − 1 ; g′(x) = eˣ − 1. Pari « Le signe
  de g′(x) ? » ✓ négatif sur ]−∞, 0[, positif sur ]0, +∞[ (c'est `v-equations`). ✗ positif partout
  car eˣ > 0 : eˣ > 0 ne dit rien du signe de eˣ − 1 (généraliser « eˣ > 0 » à une expression).
  ✗ négatif partout : g′(1) = e − 1 > 0. `apres` : g est minimale en 0, g(0) = 0, donc tex
  eˣ ≥ x + 1 pour tout réel x.
- **`course`** · `expo`, `ratio:1`, curseur `xr` de 1 à 20 · **P** « eˣ contre x : quand x tend vers
  +∞, eˣ/x… » options : « tend vers +∞ » / « tend vers 1 : les deux tendent vers +∞ » / « tend vers
  0 ». `reveal` : la boîte affiche eˣ/x (x = 10 : ≈ 2203 ; x = 20 : ≈ 2,4 × 10⁷).
- **`preuve-course`** · **D** puis Q · ligne : e^{x/2} ≥ x/2 + 1 > x/2 (r : la tangente, avec x/2 à
  la place de x). Pari « Pour x > 0, la ligne suivante ? » ✓ eˣ > x²/4 (on élève au carré deux
  nombres positifs). ✗ eˣ > x/4 : (x/2)² = x²/4. ✗ e^{x/2} > x²/4 : on élève les deux membres,
  (e^{x/2})² = eˣ. `apres` : eˣ/x > x/4, donc tex lim_{x→+∞} eˣ/x = +∞.
- **`x-sur-ex`** · **V** « lim_{x→+∞} x e^{−x} ? » ✓ 0 (x e^{−x} = 1/(eˣ/x)). ✗ +∞ : croissances
  comparées à l'envers, eˣ l'emporte. ✗ 1 : « ∞/∞ = 1 » n'est pas une règle. Retour du ✓ : avec
  X = −x, on obtient aussi lim_{x→−∞} x eˣ = 0.

### Partie 8 : Retour à l'énigme (scène `interets`)

- **`retour-plafond`** · `plaf:1` · **D** puis Q · ligne : 1 + 1/n ≤ e^{1/n} (r : la tangente en
  x = 1/n). Pari « La ligne suivante ? » ✓ (1 + 1/n)ⁿ ≤ (e^{1/n})ⁿ = e. ✗ (1 + 1/n)ⁿ ≤ e^{1/n} : la
  puissance n s'applique aux deux membres. ✗ (1 + 1/n)ⁿ ≤ n e^{1/n} : (eᵃ)ⁿ = e^{na}, pas n eᵃ.
  `apres` : « jamais au-dessus de e, pour tout n ».
- **`retour-limite`** · **D** puis Q · lignes : ln((1 + 1/n)ⁿ) = n ln(1 + 1/n) ; avec h = 1/n,
  = (ln(1 + h) − ln 1)/h. Pari « Quand n tend vers +∞, cette quantité tend vers ? » ✓ ln′(1) = 1.
  ✗ 0 : forme 0/0 (comme `h0`). ✗ +∞ : n grandit, mais ln(1 + 1/n) rétrécit autant. `apres` :
  (1 + 1/n)ⁿ = e^{n ln(1 + 1/n)} tend vers e¹ = e (exp est continue, car dérivable). `fort` : l'énigme
  est résolue.
- **`retour-taux`** · `tab:1` · ce que ça a changé : toute croissance proportionnelle s'écrit avec e.
  **Q** « À 5 % par an, capitalisé à chaque instant, 1 devient après un an… » ✓ e^{0,05} ≈ 1,051.
  ✗ 1,05 : les intérêts sur les intérêts ajoutent un peu. ✗ e × 0,05 ≈ 0,14 : eˣ n'est pas e × x.
  Retour du ✓ : en PC, N(t) = N₀e^{−λt} est la même loi, en décroissance.

### Partie 9 : Au bac (scène `bac`) — voir §6

`bac`, `bac-sol`, `bac-retour`, `bac-copie`, `bac-2`, `bac-2-suite`, `bac-erreur`.

### Partie 10 : Bilan (scènes `quiz`, `end`)

- **`q1`** · la somme · **Q** « e^{2+3} = ? » ✓ e² × e³. ✗ e² + e³ (bible A7). ✗ e⁶ : ce sont les
  exposants d'un produit qui s'additionnent, pas qui se multiplient.
- **`q2`** · le signe · **Q** « Sur ℝ, (x − 2)eˣ a le signe de… » ✓ x − 2 (eˣ > 0 ne change pas le
  signe). ✗ « toujours positif, car eˣ > 0 » : un facteur positif ne rend pas le produit positif.
  ✗ eˣ − 2 : on ne fait pas entrer le −2 dans l'exponentielle.
- **`q3`** · la dérivée · **Q** « (e^{−x})′ = ? » ✓ −e^{−x}. ✗ e^{−x} : u′ = −1 oublié. ✗ −x e^{−x−1} :
  règle des puissances.
- **`fin`** · scène `end` (cinq lignes : exp réciproque de ln ; le miroir, eˣ > 0, asymptote y = 0 ;
  e^{a+b} = eᵃeᵇ ; (eˣ)′ = eˣ et eˣ ≥ x + 1 ; aucune condition d'existence, t = eˣ > 0) · la fin de
  séance (forme de `profileHTML`) : « Vérifie » réussies, les paris `fortune`, `domaine-exp`,
  `tangente0`, `course` rappelés, le lien vers les exercices, la séance 2 annoncée (§1.2), et le
  renvoi piège par piège (B7) : somme → gabarit 1 ; signe → 7 ; dérivée → 8 ; t > 0 → 5.

---

## 4. La pause et le rappel (A8)

La pause est proposée à la frontière des parties 5 et 6, dans le texte de l'étape **`rappel`**,
33ᵉ étape sur 58 (57 %, dans la fourchette 30 % à 70 %). Sa question « Vérifie » : **e^{3 ln 2} = ?**
(✓ 8 ; leurres 6 et 9, ci-dessus). Elle mêle la réciprocité (partie 2) et une règle de ln.

Contrôle A7 fait sur la liste : la plus longue suite d'étapes sans pari ni « Vérifie » est de 2
(`toutes-valeurs`, `exp-nom` ; `sav-rappel`, `bernoulli`). A6 : aucune option « je ne sais pas ».

---

## 5. Conceptions erronées → étape qui les affronte (B5)

| Conception | Source | Étapes |
|---|---|---|
| e^{a+b} = eᵃ + eᵇ | bible A7 | `somme-produit`, `q1` |
| (eˣ)′ = x e^{x−1} | bible A7 | `derivee`, `v-derivee`, `eu`, `q3` |
| eˣ > 0 oublié (dans un signe, une équation) | bible A7 | `domaine-exp`, `k-negatif`, `q2`, `bac-2-suite` |
| confondre eˣ et xᵉ | bible A7 | `qui-varie` |
| confondre aˣ et xᵃ (SM) | bible A7 | **séance 2** seulement (gabarit 14) : à trancher, §8 |
| e⁰ = 0, E(0) indéfini | `items.yaml` (valeurs-et-reciprocite) | `defaire`, `passage` |
| exp(ln x) = x pour tout x | idem | `aller-retour` |
| ln plafonne (pas de bijection sur ℝ) | `items.yaml` (bijection) | `cent` |
| exp définie sur ]0,+∞[ seulement | `items.yaml` (exp-signe-ou-domaine) | `domaine-exp`, `asymptotes` |
| lim_{−∞} eˣ = −∞ | `items.yaml` (limite-exp-moins-infini) | `asymptotes` |
| e^{2x} = 2eˣ ; e^{−a} = −eᵃ | `items.yaml` (somme-produit, oppose) | `e2x`, `bac-2`, `oppose` |
| eˣ lu comme e × x | ajouté ici | `ek`, `retour-taux` |
| conditions d'existence transférées de ln à exp | ajouté ici | `inequation`, `bac` |
| « eˣ > 0 » étendu à eˣ − 1 | `items.yaml` (exp-signe) | `preuve-tangente` |
| forme 0/0 prise pour 0 | `items.yaml` | `h0`, `retour-limite` |
| (e^u)′ = e^u | `items.yaml` | `eu`, `q3` |
| croissances comparées à l'envers | `items.yaml` | `x-sur-ex`, `course` |
| oublier de revenir de t à x ; garder t < 0 | `items.yaml` (resolution-exp) | `bac-retour`, `bac-erreur`, `bac-2-suite` |

---

## 6. Au bac (B6)

**L'exemple commenté** — bac SExp 2021, session normale, exercice 1, Q1a et Q1b, 0,5 point chacune
(`docs/sujets/maths/limites-continuite.md`, statut vérifié) : résoudre e^{2x} − 4eˣ + 3 = 0, puis
e^{2x} − 4eˣ + 3 ≤ 0.

- **`bac`** · scène `bac`, parabole y = t² − 4t + 3, `dom` hachure t ≤ 0 · « Premier geste ? »
  (forme de `bac` du logarithme : retours sans `ok`, `reveal`). Options : « Poser t = eˣ, avec
  t > 0 » (le bon réflexe : un trinôme déguisé, e^{2x} = (eˣ)²) ; « Prendre ln des deux membres »
  (ln 0 n'existe pas, et ln ne découpe pas une somme) ; « Écrire les conditions d'existence » (eˣ
  existe pour tout x : c'est le réflexe de ln, pas celui de exp).
- **`bac-sol`** · **D** : t = eˣ > 0 et e^{2x} = t² ; t² − 4t + 3 = 0 ; Δ = 16 − 12 = 4 ; t = 1 ou
  t = 3, toutes deux > 0 (`roots:1`).
- **`bac-retour`** · **Q** « t = 1 ou t = 3. Les solutions en x ? » ✓ x = 0 ou x = ln 3.
  ✗ x = 1 ou x = 3 : t = eˣ, il faut revenir à x. ✗ x = e ou x = e³ : eˣ = 3 ⇔ x = ln 3, pas e³.
  `apres` : S = {0 ; ln 3}.
- **`bac-copie`** · `html` (forme de `bac-copie` du logarithme), la rédaction attendue en cinq
  lignes, puis Q1b en trois : (t − 1)(t − 3) ≤ 0 ⇔ 1 ≤ t ≤ 3 ⇔ 1 ≤ eˣ ≤ 3 ⇔ 0 ≤ x ≤ ln 3,
  S = [0 ; ln 3]. Barème : 0,5 + 0,5 (cité du sujet). Pas d'action.

**Le second exemple, que l'élève complète** — du type exact des sujets (non tiré d'un sujet ; la
scène l'écrit « exercice type ») : e^{2x} + eˣ − 6 = 0.

- **`bac-2`** · **Q** « La première ligne ? » ✓ t² + t − 6 = 0 avec t = eˣ > 0. ✗ 2eˣ + eˣ − 6 = 0 :
  e^{2x} = (eˣ)², pas 2eˣ. ✗ 2x + x = ln 6 : ln ne découpe pas une somme.
- **`bac-2-suite`** · `rej` · **Q** « Racines t = 2 et t = −3. Donc ? » ✓ S = {ln 2}. ✗ S = {ln 2 ;
  ln(−3)} : ln(−3) n'existe pas, t = eˣ > 0 écarte −3. ✗ S = {ln 2 ; −ln 3} : e^{−ln 3} = 1/3, pas −3.

**La copie fautive** — sur la vraie Q1b (2021) :

- **`bac-erreur`** · **V** « Une copie écrit (t − 1)(t − 3) ≤ 0 ⇔ 1 ≤ t ≤ 3, puis conclut
  S = [1 ; 3]. Où est l'erreur ? » ✓ elle n'est pas revenue de t à x (1 ≤ eˣ ≤ 3 ⇔ 0 ≤ x ≤ ln 3).
  ✗ le signe du trinôme : il est bien négatif entre ses racines. ✗ il fallait écrire des conditions
  d'existence : eˣ existe pour tout x. Aucune phrase sur ce que « le correcteur » fait.

---

## 7. Les exercices générés (`components/pilote/exercices/exponentielle.js`)

Format de `logarithme.js` : réponse calculée, chaque leurre porte `fb` et `erreur`. Conventions des
sujets : intervalles ]a,b[ avec une virgule.

**Séance 1**

| # | id | Niveau | Tirage | Capacités | Erreurs attendues |
|---|---|---|---|---|---|
| 1 | `exp-regles` | 1 | p, q, r ∈ [−5 ; 5] ; écrire e^p e^q / e^r et (e^p)^q sous la forme e^k | `sexp 1.2.20`, `sm 1.3.13` | e^{a+b} = eᵃ + eᵇ ; eᵃeᵇ = e^{ab} ; e^{−a} = −eᵃ |
| 2 | `exp-ln-retour` | 1 | a ∈ {2, 3, 5}, k ∈ [−3 ; 4] ; e^{ln a}, ln(eᵏ), e^{k ln a}, e^{−ln a} | `sexp 1.2.20`, `sm 1.3.13` | e^{k ln a} = ka ; e^{−ln a} = −a ; exp(ln x) = x pour x ≤ 0 |
| 3 | `exp-equation` | 1 | e^{ax+b} = k, a ∈ {−3…3}∖{0}, b ∈ [−4 ; 4], k ∈ {−3, −1, 0, 2, 3, 5, 7} | `sexp 1.2.20`, `sm 1.3.13` | x = ln(−k) quand k ≤ 0 (au lieu de ∅) ; diviser par a oublié ; x = eᵏ |
| 4 | `exp-inequation` | 2 | e^{ax+b} < e^{cx+d} (ou ≥), a ≠ c, a − c négatif une fois sur deux | `sexp 1.2.20`, `sm 1.3.13` | sens renversé sans raison ; sens gardé en divisant par un négatif ; conditions d'existence ajoutées |
| 5 | `exp-trinome` | 3 | e^{2x} + βeˣ + γ = 0 de racines r₁, r₂ entières tirées dans {−4…−1, 1…5}, au moins une positive | `sexp 1.2.20`, `sm 1.3.13` | garder t < 0 (ln de négatif) ; e^{2x} = 2eˣ ; oublier de revenir de t à x |
| 6 | `exp-trinome-ineq` | 3 | même trinôme, ≤ 0 ou ≥ 0, racines 0 < r₁ < r₂ ou r₁ < 0 < r₂ | `sexp 1.2.20`, `sm 1.3.13` | S en t au lieu de x ; t ≤ 0 non écarté ; signe du trinôme inversé |
| 7 | `exp-signe` | 2 | signe de (x − a)eˣ, de e^{x} − k (k > 0) ou de x(e^{x/2} − 1) | `sexp 1.2.22`, `sm 1.3.16` | « toujours positif car eˣ > 0 » ; eˣ − k a le signe de x − k ; eˣ − 1 > 0 partout |
| 8 | `exp-derivee` | 2 | f(x) = (ax + b)e^{cx}, e^{ax²+b}, eˣ/(x + a) ; calculer f′(x₀) | `sexp 1.2.6`, `sexp 1.2.22`, `sm 1.3.16` | (e^u)′ = e^u ; (eˣ)′ = x e^{x−1} ; produit dérivé comme un produit des dérivées |
| 9 | `exp-limites` | 2 | une limite dans : eˣ et e^{−x} en ±∞, eˣ/xⁿ (n ≤ 3) en +∞, x e^{−x} en +∞, x eˣ en −∞, (eˣ − 1)/x en 0 | `sexp 1.2.21`, `sm 1.3.14` | lim_{−∞} eˣ = −∞ ; forme 0/0 prise pour 0 ; croissances comparées à l'envers |
| 10 | `exp-tangente` | 2 | tangente en a ∈ {−1, 0, 1, 2} ; position par rapport à y = x + 1 | `sexp 1.2.22`, `sm 1.3.16` | pente a au lieu de eᵃ ; ordonnée eᵃ oubliée ; courbe sous sa tangente |
| 11 | `exp-systeme` | 3 | eˣeʸ = e^p et eˣ/eʸ = e^q, ou eˣ + eʸ = s et e^{x+y} = P (racines de t² − st + P positives entières) | `sexp 1.2.20`, `sm 1.3.13` | inconnues prises pour eˣ, eʸ ; eˣ + eʸ = e^{x+y} |

**Séance 2** (`seance: 2`, annoncée comme telle, comme `logarithme.js`)

| # | id | Niveau | Tirage | Capacités | Erreurs attendues |
|---|---|---|---|---|---|
| 12 | `exp-limite-facteur` | 2 | (e^{kx} − 1)/x, k ∈ {−3, −2, 2, 3, 5} ; eˣ − kx en +∞ | `sexp 1.2.21`, `sm 1.3.14` | facteur k oublié (réponse 1) ; ∞ − ∞ pris pour 0 |
| 13 | `exp-etude` | 3 | f(x) = (x + a)eˣ ou x + b − eˣ : limites, f′, variations, asymptote | `sexp 1.2.22`, `sm 1.3.16` | lim_{−∞}(x + a)eˣ = −∞ ; signe de f′ sans eˣ > 0 ; asymptote oubliée |
| 14 | `exp-base-a` | 2 | a ∈ {2, 3, 5, 1/2} ; aˣ = e^{x ln a}, (aˣ)′, (x^a)′ ; `filieres: ['SM']` | `sm 1.3.12`, `sm 1.3.15` | (aˣ)′ = x a^{x−1} ; (x^a)′ = ln x · x^a ; aˣ défini pour a ≤ 0 |

---

## 8. À vérifier, et questions pour le relecteur

**Histoire (≤ 3 places).**
1. **Bernoulli, 1683** (ouverture `bernoulli`, `fortune` ; retour partie 8). [V] MacTutor,
   [The number e](https://mathshistory.st-andrews.ac.uk/HistTopics/e/) : en 1683, étudiant les
   intérêts composés, il cherche la limite de (1 + 1/n)ⁿ et montre par le binôme qu'elle est entre
   2 et 3. **À vérifier** : la bible (A7 ①) dit « entre 2,5 et 3 » ; Wikipédia
   ([e](https://en.wikipedia.org/wiki/E_(mathematical_constant)), note 11) situe la borne
   2½ < … < 3 dans une publication de 1690. Ne pas écrire de borne à l'élève tant que ce n'est pas
   tranché. Le cadrage « 1 prêté à 100 % » est [S] (exemple de Wikipédia, cohérent avec la note 11) ;
   le lieu (Bâle) n'est pas vérifié : tag `1683` seul.
2. **e déjà dans l'œuvre de Napier (1618)**, une table annexe de logarithmes naturels, « almost
   certainly » d'Oughtred [V MacTutor, même page ; Wikipédia, même formulation]. **Facultatif** : ne
   sert aucun pari (B8) ; à mettre dans la fiche `nombre-e`, pas dans le fil.
3. **Euler et la lettre e** : lettre à Goldbach de 1731 [V MacTutor] ; manuscrit de 1727 ou 1728 sur
   l'explosion des canons [S : Wikipédia seulement, MacTutor n'en parle pas]. Fiche `nombre-e`
   seulement.

**Exactitude.**
- Toutes les valeurs (1,01¹⁰⁰ ≈ 2,7048 ; (1 + 1/n)ⁿ pour chaque cran ; 145 ln 2 ≈ 100,5 ;
  e³ ≈ 20,09 et 3ᵉ ≈ 19,81 ; e^{0,05} ≈ 1,0513 ; taux de `h0` ; eˣ/x en 10 et 20) sont à produire par
  `exponentielle-outils.js`, aucune écrite à la main.
- La définition de exp comme réciproque de ln est celle de l'ancienne leçon et du cadre (qui ne
  définit rien) : **à vérifier contre le programme officiel** (pas le cadre d'examen).
- La continuité de exp est dite « car dérivable » (`retour-limite`) : admissible au niveau du cours,
  à confirmer.

**Pour le relecteur.**
1. Deux scènes nouvelles (`interets`, `miroir`) : décision du propriétaire (07 §3.3).
2. (e^u)′ est en séance 1 (dans le logarithme, (ln u)′ était en séance 2) : choix délibéré, parce
   que la dérivée de la réciproque et la composée sont déjà acquises (A3, A4). À confirmer.
3. B5 : « confondre aˣ et xᵃ » n'est affronté qu'en séance 2 (SM). Faut-il une étape SM en séance 1 ?
4. B7 : les gabarits de séance 2 testent des capacités que la séance 1 n'enseigne pas (même
   situation que `logarithme.js`). À trancher une fois pour toutes.
5. `bac` « premier geste » en pari sans `ok` (comme le logarithme) ou en question à bonne réponse ?
6. Le moteur sait-il verrouiller un curseur avant un pari et exiger une manipulation (`need`) pour
   `curseur` ? Le logarithme le fait pour `e` : même mécanisme à copier.
7. `sexp` n'a pas de capacité « calcul exponentiel » ; les gabarits 1 et 2 sont rattachés à
   `sexp 1.2.20`. À confirmer.

## 9. Décisions du relecteur (2026-11-23)

Réponses aux questions du §8, pour que l'auteur n'ait rien à trancher :

1. **Scènes nouvelles** `interets` et `miroir` : accordées.
2. **Bernoulli** : aucune borne chiffrée n'est montrée à l'élève, ni le lieu ; « 1683 » et le problème
   des intérêts composés suffisent. Euler reste dans une fiche de mot, hors du fil.
3. **(e^u)′ en séance 1** : oui.
4. **a^x contre x^a** : séance 2, filière SM. Noté comme limite connue de la règle B5 pour cette leçon.
5. **Exercices de séance 2** : marqués `seance: 2`, comme dans le logarithme.
6. **« Premier geste » au bac** : un pari de prédiction, comme dans le logarithme.
7. **Capacités des exercices de calcul** : rattachées à `maths-sexp 1.2.20`.
8. **« Continue car dérivable »** : accepté dans l'étape de retour.
9. **exp définie comme réciproque de ln** : c'est le choix de la leçon ; à confirmer dans le programme
   officiel avant la mise en ligne, sans bloquer l'écriture.
