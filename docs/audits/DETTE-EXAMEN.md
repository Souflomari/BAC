# La dette d'examen — ce qu'un sujet vérifié demande et que la notion ne montre pas

**Relevé du 2026-09-27.** Trois audits en lecture seule, un par bloc de notions, ont posé la
même question à chaque `bank.yaml` (les sujets nationaux transcrits, statut vérifié) : *chaque
technique qu'une question de ce sujet exige est-elle MONTRÉE au travail dans un exemple de la
leçon, et TESTÉE par au moins un item ou un point d'arrêt ?* Les rapports détaillés, avec pour
chaque constat la ligne de banque citée, les lignes de leçon lues et un correctif minimal :

- `docs/audits/dette-examen/maths.md` — les 14 notions de maths ;
- `docs/audits/dette-examen/pc-1.md` — 12 notions de PC (aspects énergétiques → ondes EM) ;
- `docs/audits/dette-examen/pc-2.md` — 12 notions de PC (ondes mécaniques → transformations).

SVT n'est pas auditée : elle est gelée. Philosophie n'a pas de banque au même format.

## D'où vient la question

Le cas $\Delta = 0$ d'équations-différentielles (`DECISIONS-EN-ATTENTE.md` §30) : le seul cas
qu'un sujet vérifié atteste, **énoncé** par la leçon, jamais **montré** au travail, jamais
**testé**. La leçon avait l'air complète ; l'élève rencontrait la technique pour la première fois
dans l'épreuve notée. *La question n'avait été posée qu'à une notion ; elle est posée ici aux
trente-huit notions qui ont une banque.*

## Deux sortes de trou

- **GAP-A** — la technique n'est ni montrée dans la leçon, ni testée.
- **GAP-B** — énoncée sans être travaillée, OU travaillée sans être jamais testée (le cas le plus
  fréquent : la prose a été ajoutée après coup, les items jamais).

Convention de comptage des audits : une technique travaillée **seulement** dans un exercice
sommet (`exercises.yaml`, r-bac / r-variation) compte comme montrée pour les deux audits PC, et
comme NON montrée pour l'audit de maths — c'est la convention que le cas $\Delta=0$ a imposée
(il y était travaillé dans le sommet, et c'était bien un trou). *Les deux conventions sont
écrites dans les rapports ; les totaux ne s'additionnent donc pas à l'identique.*

## Le compte

| bloc | notions | entrées de banque lues | trous | dont GAP-A |
|---|---|---|---|---|
| maths | 14 | 67 | 29 | 17 |
| PC (1) | 12 | 87 | 25 | 8 |
| PC (2) | 12 | 87 | 25 | 7 |
| **total** | **38** | **241** | **79** | **32** |

## Ce que l'audit a trouvé qui n'était pas un trou mais une ERREUR

1. **Aspects énergétiques — le signe du travail du couple de rappel.** La leçon appelait
   « travail du couple de rappel, pour tordre le fil de $0$ à $\theta$ » l'aire $+\frac12 C\theta^2$,
   puis écrivait trois lignes plus bas $W(M_{rappel}) = -\Delta E_p$. Le sujet 2015 R interroge ce
   signe. **Corrigé** (`8dab3097`).
2. **Chute dans un fluide — « la pente à l'origine vaut $g$ ».** Vrai dans l'air ; faux dans les
   cinq sujets (≈ 6 points) qui font tomber une bille dans un liquide avec la poussée
   d'Archimède, où $a_0 = g\,(1-\rho_f/\rho_s)$ — et c'est précisément $a_0$, lu sur la tangente,
   que ces sujets exploitent pour trouver $\rho_f$. **Corrigé** (vague A) — et la vague 1 a trouvé
   que le premier correctif avait oublié l'exemple travaillé, la figure et le tableau d'Euler.
3. Des NOTES DE PORTÉE devenues fausses : `reactions-acido-basiques/lesson.md` exclut le tableau
   d'avancement d'un titrage à $V \neq V_E$ que huit sujets vérifiés exigent ; des en-têtes de
   `bank.yaml` renvoient à des rungs qui n'enseignent pas ce qu'ils disent (maths.md, « stale
   notes » ; pc-2.md, fin). *Une note de portée est une affirmation sur le corpus : elle vieillit
   comme les autres.*

## Les dix premiers, par bloc (le détail est dans les rapports)

**Maths.** Équations du second degré dans ℂ jamais testées (~12 entrées) · branche parabolique
$\lim f(x)/x$ (10 questions) · primitive de $u'/u$ et $u'/u^2$ (6) · contraction par l'inégalité
des accroissements finis et borne géométrique (7) · transport de structure par isomorphisme (8
entrées sur 9) · petit théorème de Fermat sans rung · projeté orthogonal du centre d'une sphère
(4 entrées sur 5) · bijection réciproque jamais testée (9) · suites implicites $f_n(x_n)=0$ (4) ·
$\frac{e^h-1}{h}$ et $\frac{\ln(1+x)}{x}$ lus comme taux d'accroissement (5).

**PC (1).** Chute avec Archimède (GAP-A, ~6 pts) · noyaux désintégrés $N_0 - N(t)$ et datation
(7 entrées) · résistance interne $r$ lue sur le plateau (RL, 7) · équation différentielle en
$u_R(t)$ (RL, GAP-A, 4) · $\tau$ par la tangente puis $k$ (4) · droite $\ln N = f(t)$ (GAP-A) ·
recomposer vitesse et angle en vol (4) · rupture du courant (RL) · signe du travail de torsion
(corrigé) · frottement quadratique (3).

**PC (2).** La chaîne $C$, pH $\to\tau\to Q_{r,\text{éq}}\to\mathrm{p}K_A$ jamais testée (~10
entrées) · tableau d'avancement d'un titrage à $V\neq V_E$ (8) · énergie dissipée entre deux
instants (RLC, 8) · oscillogramme : divisions × sensibilité, enseigné seulement dix chapitres plus
tard (7) · $\tau$ sur une courbe DÉCROISSANTE (RC, 5) · équation différentielle de RC jamais
testée (11 entrées sur 13) · base faible dans l'eau (GAP-A) · poulie et charge couplées ·
charge à courant constant (GAP-A) · les deux autres sens de la chaîne de Faraday (piles, 4).

## Ce qui est payé, et quand

| vague | notions | état |
|---|---|---|
| — | aspects-énergétiques (erreur de signe) | corrigé, `8dab3097` |
| — | équations-différentielles ($\Delta=0$) | payé, `b70f9a41` + `b6f95676` |
| **A** | chute-mouvements-plans (C1, C2, C3, C4) · décroissance-radioactive (D1, D2, D3) · réactions-acido-basiques (chaîne pK_A, titrage, base faible) | **payé** — prose et items par deux auteurs distincts, vague 1 (pédagogie + fidélité) appliquée par six auteurs ; HANDOFF §11.214, trois questions de cadre au propriétaire (`DECISIONS-EN-ATTENTE.md` §31) |
| **B1** | nombres-complexes-1 (second degré, Viète) · dérivabilité (branches paraboliques, réciproque, demi-tangente) · suites (contraction, suites implicites, homographiques) · calcul intégral ($u'/u$, $u'/u^2$, $F(x)=\int_a^x f$) | **payé** — vague 1 (pédagogie + fidélité) appliquée, `6144d9de` → `fa925179` ; DECISIONS-EN-ATTENTE §32 |
| **B2** | exponentielle + logarithme (limites de référence en taux) · géométrie (projeté $H$) · arithmétique (Fermat, R6b) · structures (transport — prose `d3663bda`) | **payé** (`62111cb4`, `76868e70`, `14f986bd`) ; items du transport et loi binomiale : **en reprise** (cliquets) ; vague 1 non encore commandée |
| — | arithmétique : **systèmes de numération** (capacités SM 2.1.4–2.1.6) | **lacune hors audit** — aucun chapitre, aucun item, aucune annale ; §32 |
| C et suivantes | le reste des trois rapports | **dette écrite** |

*La règle de reprise* : un trou GAP-B « travaillé mais jamais testé » se paie par un item, sans
prose ; un GAP-A demande un exemple travaillé ET un item ; une note de portée contredite par un
sujet vérifié se corrige avant d'écrire quoi que ce soit — sinon la leçon continue d'affirmer
qu'elle n'a pas à faire ce qu'on lui demande.
