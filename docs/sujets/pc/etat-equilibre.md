# `etat-equilibre` — État d'équilibre d'un système ($Q_r$, constante $K$, taux d'avancement)

> Annales examen national, PC-SPC (BIOF). Transcriptions **non vérifiées** —
> voir `README.md` §3 pour le protocole. Provenance sur chaque entrée.
>
> Statut de couverture : **une entrée dédiée sourcée** (2015 normale). Elle
> exploite explicitement le **taux d'avancement final** $\tau$, le **quotient de
> réaction à l'équilibre** $Q_{r,\text{éq}}(C, \tau)$ et la constante d'acidité
> $pK_A$ (constante d'équilibre $K$). Recoupe `reactions-acido-basiques` et
> `transformations-deux-sens`.

---

## 2015 — session normale — Exercice 1 (Chimie), Deuxième partie (§1)
Source: https://www.alloschool.com/element/94472
Statut: transcrit (non vérifié)

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS 28 · Barème : Exercice 1 = 7 points ; **Deuxième partie** =
  4,75 points ; le §1 (réaction avec l'eau) transcrit ici = 2,25 points
  (0,75 × 3)
- Images lues (reproductibilité) : `.../course-422/upload-70340/0002-big.jpg`
  (données) ; `.../0003-big.jpg` (questions §1 et §2)
- Pages du scan : 2 et 3 (sur 7)
- Portée : **Deuxième partie, §1** (réaction acide benzoïque / eau — état
  d'équilibre). Le **§2** (estérification acide benzoïque + éthanol, catalyseur
  $\text{H}_2\text{SO}_4$, rendement) recoupe `controle-catalyse` /
  `transformations-deux-sens` ; la **Première partie** (électrolyse du chlorure
  de sodium) relève de `electrolyse`.

**Étude de la réaction de l'acide benzoïque avec l'eau (état d'équilibre).**

*But de la partie (transcrit) :* déterminer la constante d'acidité du couple
$(\text{C}_6\text{H}_5\text{COOH}/\text{C}_6\text{H}_5\text{COO}^-)$ et étudier la
réaction de l'acide benzoïque avec l'éthanol.

**Données :**
- Toutes les mesures ont été faites à $25\ ^\circ\text{C}$ ;
- $M(\text{C}_6\text{H}_5\text{COOH}) = 122\ \text{g}\cdot\text{mol}^{-1}$ ;
- $M(\text{C}_2\text{H}_5\text{OH}) = 46\ \text{g}\cdot\text{mol}^{-1}$ ;
- Masse volumique de l'éthanol pur : $\rho = 0{,}78\ \text{g}\cdot\text{L}^{-1}$
  *(le scan porte « $0;78\ \text{g.L}^{-1}$ » ; l'unité physiquement cohérente
  serait $\text{g}\cdot\text{mL}^{-1}$ — à confirmer sur le corrigé ; non utilisée
  dans le §1 transcrit ici)* ;
- $M(\text{C}_6\text{H}_5\text{COOC}_2\text{H}_5) = 150\ \text{g}\cdot\text{mol}^{-1}$
  (benzoate d'éthyle) ;
- Conductivités molaires ioniques :
  $\lambda_{\text{C}_6\text{H}_5\text{COO}^-} = 3{,}23\cdot10^{-3}\ \text{S}\cdot\text{m}^2\cdot\text{mol}^{-1}$,
  $\lambda_{\text{H}_3\text{O}^+} = 35\cdot10^{-3}\ \text{S}\cdot\text{m}^2\cdot\text{mol}^{-1}$ ;
- Conductivité d'une solution diluée : $\sigma = \sum \lambda_i\cdot[X_i]$
  ($[X_i]$ concentration effective de l'espèce ionique, $\lambda_i$ sa
  conductivité molaire ionique) ; on néglige l'action des ions $\text{HO}^-$ sur
  la conductivité.

On considère une solution $(S)$ d'acide benzoïque de concentration molaire
$C = 10\ \text{mol}\cdot\text{m}^{-3}$ et de volume $V$. La mesure de la
conductivité $\sigma$ de la solution $(S)$ donne : $\sigma = 2{,}76\cdot10^{-2}\
\text{S}\cdot\text{m}^{-1}$ à $25\ ^\circ\text{C}$. On modélise la transformation
qui se produit entre l'eau et l'acide benzoïque par l'équation de la réaction :
$$\text{C}_6\text{H}_5\text{COOH}_{(aq)} + \text{H}_2\text{O}_{(l)} \;\rightleftharpoons\; \text{C}_6\text{H}_5\text{COO}^-_{(aq)} + \text{H}_3\text{O}^+_{(aq)}$$

1. **1-1.** (0,75) Montrer que le taux d'avancement final de la réaction est
   $\tau = 0{,}072$.
2. **1-2.** (0,75) Trouver l'expression du quotient de la réaction à l'équilibre
   $Q_{r,\text{éq}}$ en fonction de $C$ et $\tau$.
3. **1-3.** (0,75) Déduire la valeur de la constante $pK_A$ du couple
   $(\text{C}_6\text{H}_5\text{COOH}/\text{C}_6\text{H}_5\text{COO}^-)$.

> §2 (résumé, non détaillé ici) : préparation du benzoate d'éthyle à partir de
> $m_{ac} = 2{,}44\ \text{g}$ d'acide benzoïque + $V_{al} = 10\ \text{mL}$
> d'éthanol pur + quelques gouttes d'acide sulfurique concentré (**catalyseur**),
> chauffage à reflux ; questions : rôle du catalyseur, équation
> semi-développée, rendement (obtient $m_e = 2{,}25\ \text{g}$ d'ester),
> réactif de substitution pour améliorer le rendement. → cross-list
> `controle-catalyse` / `transformations-deux-sens` / `esterification-hydrolyse`.

---

## Contenu « état d'équilibre » présent dans les transcriptions existantes

- **2019 N — Ex I Partie 2** (acide benzoïque), sous `reactions-acido-basiques.md` :
  - Q4 : expression de la constante d'équilibre $K$ en fonction de $C$ et $\tau$ ;
  - Q5 : signification de $K$ ;
  - Q3.2 : taux d'avancement final $\tau = \dfrac{\sigma}{C(\lambda_1 + \lambda_2)}$.

- **2021 N — Ex I Partie 2** (acide carboxylique), sous
  `reactions-acido-basiques.md` :
  - Q2.2 : taux d'avancement final $\tau \approx 1{,}32\ \%$ ;
  - Q2.3 : quotient de réaction à l'équilibre
    $Q_{r,\text{éq}} \approx 1{,}77 \cdot 10^{-5}$ en fonction de $C_a$ et $\tau$.

- **2020 N — Ex I Partie 1** (ammoniac), sous `reactions-acido-basiques.md` :
  - Q2.3 : taux d'avancement final $\tau$ ;
  - Q2.4 : quotient de réaction à l'équilibre $Q_{r,\text{éq}} = 1{,}65 \cdot 10^{-5}$.

> Recoupe aussi `transformations-deux-sens` (réactions limitées, sens direct /
> inverse). **Résolu (v0.3)** : l'entrée dédiée **2015 N** ci-dessus fournit un
> exercice national centré sur l'état d'équilibre ($\tau$, $Q_{r,\text{éq}}$,
> $pK_A$).
