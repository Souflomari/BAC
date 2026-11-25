# 12 — Faits en attente : vérification sur sources premières

> Chantier 1 (`docs/revue-externe/MANDAT-LECONS.md` §4, branche `antigravity/faits-lecons`, rapport seul, aucun code).
> Chaque fait est établi sur une source première effectivement ouverte (adresse et page) ou, à défaut,
> porte explicitement la mention **« introuvable »** ou **« je n’ai pas pu ouvrir »**, sans rien inventer.

---

## 1. `exponentielle`, `suites` — Programme officiel marocain de 2e Bac (hors cadre d’examen)

- **Source ouverte** : *Programmes de mathématiques de la 2e année du cycle du baccalauréat* (MEN Maroc, octobre 2006), PDF `prog_2sx.pdf` : `http://mathksar.weebly.com/uploads/1/4/4/0/14403348/prog_2sx.pdf` (pages 1 à 11 lues directement ; la fin du document au-delà de la page 11 a été tronquée lors de l’extraction).
- **Définition de $\exp$ comme réciproque de $\ln$** :
  - **Confirmé (avec trois voies possibles au choix de l’enseignant)** en **Sciences Mathématiques A et B**, page 3 (*I. التحليل — الاشتقاق*) :
    > *« تقديم الدالة الأسية النبيرية إما كالدالة العكسية لدالة اللوغاريتم النبيري وإما كالحل الوحيد للمعادلة التفاضلية $y'=y$ و $y(0)=1$ أو كالحل الوحيد للمعادلة الدالية $f(x+y)=f(x)f(y)$ »*
    (soit : « présenter la fonction exponentielle népérienne soit comme la fonction réciproque de la fonction logarithme népérien, soit comme l’unique solution de l’équation différentielle $y'=y$ et $y(0)=1$, ou comme l’unique solution de l’équation fonctionnelle $f(x+y)=f(x)f(y)$ »).
  - Pour la section spécifique **Sciences Expérimentales** (pages ultérieures du même document), la portion exacte du PDF n’a pas pu être extraite en entier (« je n’ai pas pu ouvrir » la fin du PDF) ; toutefois, dans le cadre de référence officiel (`docs/referentiel/maths-sexp.yaml`), la réciproque d’une fonction continue strictement monotone figure bien au programme (`1.2.11`, p. 2).
- **Statut « admis » du théorème de convergence des suites monotones bornées** :
  - Page 5 du même programme (`prog_2sx.pdf`, *1. المتتاليات العددية — محتوى البرنامج*) : la propriété figure explicitement au contenu (*« تقارب متتالية تزايدية ومكبورة (أو تناقصية ومصغورة) »*).
  - Pages 5–6 (*توجيهات تربوية*) : pour la filière **Sciences Mathématiques**, la liste des résultats à démontrer (*يتم البرهنة على ما يلي*) mentionne les critères de convergence (*مصاديق التقارب*), le passage à la limite dans les inégalités et le théorème des suites adjacentes (*مبرهنة المتتاليتين المتحاذيتين*), **sans mentionner le mot « admis » (يُقبل) pour le théorème des suites monotones bornées** dans les pages lues.
  - Pour la filière **Sciences Expérimentales** dans le programme officiel de 2006 (hors cadre d’examen), la page correspondante n’était pas accessible dans l’extrait ouvert (**« je n’ai pas pu ouvrir »** la partie Sciences Expérimentales du PDF officiel pour vérifier si le terme « يقبل / admis » y figure explicitement).

---

## 2. `suites` — Formulation exacte de la question 4 du problème, Sciences Expérimentales 2022, session normale

- **Source vérifiée dans le dépôt (scan officiel NS 22F relu)** : `docs/sujets/maths/fonction-exponentielle.md` (lignes 117–152, d’après `https://www.alloschool.com/element/136586`, pages 3 et 4 sur 4 du scan officiel NS 22F).
- **Constat précis** : dans le problème de 2022 session normale (Sciences Expérimentales, $f(x) = x(e^{x/2}-1)^2$), **la question 4 porte sur la dérivée $f'$ et les variations**, tandis que **la suite récurrente $u_{n+1} = f(u_n)$ est la question 8** :
  - **Question 4 (exacte)** :
    - `4. a) (0,5)` Montrer que $f'(x) = \left(e^{\frac{x}{2}} - 1\right)^2 + x\,e^{\frac{x}{2}}\left(e^{\frac{x}{2}} - 1\right)$ pour tout $x$ de $\mathbb{R}$
    - `4. b) (0,5)` Vérifier que $x\left(e^{\frac{x}{2}} - 1\right) \ge 0$ pour tout $x$ de $\mathbb{R}$ puis en déduire le signe de la fonction dérivée $f'$ sur $\mathbb{R}$
    - `4. c) (0,25)` Dresser le tableau des variations de la fonction $f$ sur $\mathbb{R}$
  - **Question 8 (volet suites du même problème, exacte)** :
    - `8.` Soit $(u_n)$ la suite numérique définie par $u_0 = 1$ et $u_{n+1} = f(u_n)$ pour tout $n$ de $\mathbb{N}$
    - `a) (0,5)` Montrer par récurrence que $0 < u_n < \ln 4$ pour tout $n$ de $\mathbb{N}$
    - `b) (0,5)` Montrer que la suite $(u_n)$ est décroissante.
    - `c) (0,25)` En déduire que la suite $(u_n)$ est convergente.
    - `d) (0,5)` Calculer la limite de la suite $(u_n)$.

---

## 3. `noyaux` — Emplois réels cités : plutonium 238, fluor 18, iode 131

1. **Stimulateur cardiaque au plutonium 238 ($^{238}\text{Pu}$)** :
   - **Sources ouvertes** :
     - Mallela, Ilankumaran & Rao (2004), *Trends in Cardiac Pacemaker Batteries*, Indian Pacing and Electrophysiology Journal, PMC `https://pmc.ncbi.nlm.nih.gov/articles/PMC1502062/` (section *Nuclear batteries*) ;
     - Los Alamos National Laboratory, *Actinide Research Quarterly*, 21 septembre 2022 : `https://www.lanl.gov/media/publications/actinide-research-quarterly/0922-shining-light-on-a-dark-element`.
   - **Faits établis** : le $^{238}\text{Pu}$ ($t_{1/2} \approx 87{,}7$ ans, émetteur $\alpha$) a effectivement alimenté des stimulateurs cardiaques dans les années 1970 (essais cliniques 1970–1977 ; conversion thermoélectrique de la chaleur des particules $\alpha$ en électricité, quelques centaines de $\mu\text{W}$). **Nuance essentielle** : ces appareils **ne sont plus commercialisés ni implantés** depuis la généralisation des piles au lithium (coût, radioprotection et obligation de retrait après décès), bien que quelques dizaines d’implants historiques aient fonctionné plus de 30 ans.

2. **Fluor 18 ($^{18}\text{F}$) en imagerie médicale** :
   - **Source ouverte** : Hovhannisyan et al. (2019), *[18F]-Fludarabine for Hematological Malignancies*, PMC `https://pmc.ncbi.nlm.nih.gov/articles/PMC6478790/` (sections *Abstract* et *Introduction*).
   - **Faits établis** : le fluor 18, émetteur $\beta^+$ intégré dans le fluorodésoxyglucose ($^{18}\text{F-FDG}$), est le radiotraceur de référence de la tomographie par émission de positons (TEP / PET-CT) en oncologie (détection tumorale, bilan d’extension et suivi de réponse thérapeutique).

3. **Iode 131 ($^{131}\text{I}$)** :
   - **Sources ouvertes** :
     - Conseil National Professionnel de Médecine Nucléaire (France, 2022), *Traitement de l’hyperthyroïdie par l’iode 131* (`https://www.cnp-mn.fr/wp-content/uploads/2022/09/Traitement-hyperthyroidie-V1.0.pdf`, p. 1) ;
     - Wang et al. (2022), *Thyroid dose assessments due to inhalation of $^{131}\text{I}$ for nuclear medicine staff*, PMC `https://pmc.ncbi.nlm.nih.gov/articles/PMC9760871/` ($t_{1/2} = 8{,}0$ jours, pic $\gamma$ à $364{,}5$ keV).
   - **Faits établis** : l’iode 131 (demi-vie $8{,}0$ jours, émetteur $\beta^-$ et $\gamma$) est utilisé en médecine nucléaire pour le traitement des hyperthyroïdies et des cancers différenciés de la thyroïde (destruction ciblée du tissu thyroïdien qui fixe sélectivement l’iode).

---

## 4. `dipole-rc` — Notation de l’énergie emmagasinée et figure 1 du sujet 2022

- **Notation de l’énergie électrique emmagasinée dans les sujets nationaux marocains** :
  - **Source vérifiée dans le dépôt** : `docs/sujets/pc/rlc-serie.md` (ligne 238 : *« Trouver l’énergie électrique $E_{e1}$ emmagasinée dans le condensateur »*, et lignes 47–48, 808, 968 : $E_t$ énergie totale, $E_m$ énergie magnétique, $E_j$ énergie dissipée par effet Joule) ; confirmé aussi dans les extraits d’examens nationaux 2008–2023 indexés (*« Soient $E_e$ l’énergie électrique emmagasinée dans le condensateur »*).
  - **Fait établi** : les sujets nationaux marocains notent **`E_e`** ($E_e$, majuscule latine $E$ avec indice $e$, cohérente avec $E_m$ et $E_t$), et non $\mathcal{E}_e$.
- **Figure 1 du sujet 2022 (session normale, PC, code NS 28F, Exercice 3, p. 5 sur 8)** :
  - **Source vérifiée dans le dépôt (scan officiel relu au zoom ×5)** : `docs/sujets/pc/rc-charge.md` (lignes 541–546 et 622–627, d’après `https://www.alloschool.com/element/136621`, `0005-big.jpg`).
  - **Disposition exacte du montage** :
    - branche de **gauche** : générateur idéal de tension $E$ (symbole cercle, flèche de tension vers le haut) ;
    - branche du **haut à gauche** : conducteur ohmique $R$ (rectangle) suivi de la borne `(1)` ;
    - **centre** : interrupteur $K$ à double position `(1)` / `(2)` relié à la branche verticale centrale portant le condensateur $C$ (tension $u_C$ fléchée) jusqu’au fil inférieur commun ;
    - branche de **droite** (au-delà de la borne `(2)`) : bobine étiquetée $(L, r)$.

---

## 5. `transmission` — Effectifs de Mendel dans le mémoire de 1866

- **Sources primaires ouvertes** :
  - Texte anglais de référence (traduction Bateson/Druery) sur MendelWeb : `http://www.mendelweb.org/Mendel.plain.html` (sections `[5]` et `[8]`) ;
  - Texte allemand original (*Versuche über Pflanzen-Hybriden*, lu en 1865, publié en 1866 dans *Verh. naturf. Ver. Brünn*, Bd. IV) sur MendelWeb : `http://www.mendelweb.org/MWGerText.html`.
- **Tous les effectifs sont confirmés exactement** :
  - **Monohybridisme, forme de la graine** (section `[5]`, *Expt. 1*) : `7 324` graines issues de `253` hybrides, dont **`5 474` rondes (lisses)** et **`1 850` ridées** (rapport `2,96 : 1`).
  - **Monohybridisme, couleur de l’albumen / cotylédons** (section `[5]`, *Expt. 2*) : `8 023` graines issues de `258` plantes, dont **`6 022` jaunes** et **`2 001` vertes** (rapport `3,01 : 1`).
  - **Dihybridisme, forme × couleur** (section `[8]`, *First Experiment*) : `556` graines issues de `15` plantes, dont **`315` rondes et jaunes**, **`101` ridées et jaunes**, **`108` rondes et vertes**, **`32` ridées et vertes**.

---

## 6. `meiose` — Sutton 1903 sur le scan d’origine et emploi de « tétrade » / « bivalent » dans les manuels marocains

- **Sutton 1903 (scan PDF d’origine ouvert)** :
  - **Source** : Walter S. Sutton, *The Chromosomes in Heredity*, *The Biological Bulletin*, Vol. 4, No. 5, avril 1903, pp. 231–251 — PDF original ouvert sur University of Chicago Press : `https://www.journals.uchicago.edu/doi/pdf/10.2307/1535741`.
  - **Faits vérifiés page par page** :
    - **pp. 233–234** : Sutton démontre que *« the position of the bivalent chromosomes in the equatorial plate of the reducing division is purely a matter of chance — that is, that any chromosome pair may lie with maternal or paternal chromatid indifferently toward either pole irrespective of the positions of other pairs »*.
    - **p. 234 (note 1) et tableau p. 235** : il donne explicitement la formule $2^n$ pour les gamètes et $4^n$ pour les zygotes (tableau de $2n = 2$ à $2n = 36$, jusqu’à `262 144` gamètes).
    - **Nuance historique vérifiée p. 232 (points 3 et 4)** : Sutton pensait encore en 1903 que chez *Brachystola*, la *première* division de maturation était équationnelle et la *seconde* réductionnelle (alors que l’ordre général établi ensuite est réductionnelle en division I puis équationnelle en division II). Notre leçon a raison d’attribuer à Sutton 1903 l’orientation aléatoire des paires sur la plaque et la loi $2^n$, sans lui prêter le détail moderne de l’ordre des divisions.
- **Emploi de « tétrade » et de « bivalent » dans les manuels marocains de 2e Bac SVT** :
  - **Statut : introuvable / je n’ai pas pu ouvrir** de scan officiel des manuels scolaires marocains agréés (*Al Moufid*, *L’Étincelle*, *Fi Rihab SVT*) depuis cet environnement. Les deux termes sont d’usage courant dans les cours BIOF marocains en ligne (« bivalent » pour la paire d’homologues appariés, « tétrade » pour l’ensemble des 4 chromatides en prophase I), mais leur répartition exacte dans les manuels agréés reste à vérifier sur un exemplaire physique ou un scan officiel.
