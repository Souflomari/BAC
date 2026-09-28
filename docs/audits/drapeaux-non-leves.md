# Drapeaux non levés — l'index de priorité de la prochaine re-mesure K-8

> **Ce que ce document EST.** Le **tri par drapeau non levé** que
> `docs/audits/k8-remesure-2017-2019.md` § 9 point 10 nomme comme « restant
> à faire », et que sa § 8.5 justifie : *« 4 lectures fausses sur 6
> drapeautées, contre 1 sur 9 non drapeautées »*. Il recense les réserves
> écrites par les auteurs dans les fichiers du sas
> (`docs/sujets/_incoming/*.md`), sépare celles qui **tiennent** de celles
> qui ont été **levées**, et croise les premières avec `content/*/*/bank.yaml`
> pour dire lesquelles portent une valeur **servie à l'élève**.
>
> **Ce qu'il N'EST PAS.** Une campagne de re-mesure. **Aucune valeur n'a été
> re-lue sur une figure. Aucun `bank.yaml`, aucun `exercises.yaml`, aucune
> leçon, aucun fichier du sas n'a été modifié.** Aucun commit, aucun push.
> Ce fichier est le seul artefact produit.
>
> Passe du **2026-09-03**.

---

## 1. Ce qu'est un drapeau, et les formes réellement employées

**Un drapeau, au sens de ce document**, est une **réserve écrite par
l'auteur d'un fichier sur sa propre affirmation** : une mention qui dit que
la valeur qui la porte n'est pas établie au niveau de preuve que le reste du
document atteint. Ce n'est ni un défaut du sujet officiel, ni une coquille,
ni un arbitrage d'owner — c'est un **aveu de fragilité** posé par celui qui
écrit, à l'endroit exact où il écrit.

C'est cette catégorie-là, et pas une autre, qui s'est révélée prédictive :
sur les six lectures drapeautées de l'échantillon de la passe du 2026-09-03,
quatre étaient fausses.

### 1.1 Les formes recensées — dénombrées, pas supposées

Sweep sur les **22 fichiers du sas** effectivement lisibles (les **26**
fichiers `.md` du répertoire, moins `README.md` et
`JOURNAL-VERIFICATION.md`, moins les deux fichiers exclus du § 7.1). Les
nombres sont des **occurrences brutes**, avant tout tri levé/non levé.

| Forme, littérale | Occ. | Ce qu'elle marque réellement |
|---|---:|---|
| `(glyphe à confirmer)` | **35** | une **lettre**, jamais une valeur — adjudication d'un caractère détruit par le scan (ℝ, ℕ, ℚ, ℂ, ≈). Hors périmètre K-8. |
| `(lecture à confirmer)` | **13** | **le cœur du sujet** — une lecture de figure non verrouillée |
| `(lectures à confirmer)` | 3 | idem, en tête d'un bloc de mesures |
| `(lecture d'échelle à confirmer)` | 3 | idem, spécifiquement sur une **calibration d'axe** |
| `Lecture graphique — à confirmer` | 4 | idem, forme propre à `pc-2011-r.md` |
| `(lectures graphiques — à confirmer)` | 1 | idem, forme propre à `pc-2011-n.md` |
| `à confirmer contre le corrigé (officiel)` | 2 | une lecture que l'auteur **renvoie à un témoin externe** |
| `non lisible (directement)` / `NON LISIBLE` | 3 | plus fort qu'un drapeau : l'auteur déclare la valeur **inaccessible** |
| `non tranché` | 9 | un **arbitrage** laissé ouvert (owner, typographie, anatomie d'identifiant) — presque jamais une figure |
| `non résolu(e)` | 7 | une divergence pendante, le plus souvent citée pour dire qu'elle vient d'être résolue |
| `indécidable` | 12 | **presque toujours au négatif** : « rien n'est resté indécidable » |
| `illisible` | 14 | idem, presque toujours au négatif ou dans l'expression figée « un orphelin illisible » |
| `réserve nommée` | 4 | l'auteur qualifie explicitement sa propre réserve |
| `compté, pas estimé` | 8 | **anti-drapeau** — une revendication de rigueur, pas un doute |
| `approximatif` / `approximativement` | 11 | **le mot du sujet officiel**, pas de l'auteur (« l'âge approximatif du bois », « approximativement égale à la période propre ») |

### 1.2 Les trois formes qui ne sont pas des drapeaux, et qu'il faut écarter

Ces trois-là produisent l'essentiel du bruit d'un `grep` naïf. Les nommer
est la moitié du travail.

1. **L'anti-drapeau.** « Compté, **pas estimé** » · « mesurées, **pas
   estimées** » · « rien n'est resté **indécidable** » · « aucune valeur
   n'est restée **illisible** ». Ces phrases contiennent le vocabulaire du
   doute pour affirmer son absence. **8 + 12 + 14 occurrences** en relèvent.
2. **Le mot du sujet.** `approximatif` et `approximativement` appartiennent
   dans presque tous les cas à l'**énoncé ministériel** transcrit
   verbatim — « déterminer l'âge approximatif $t_1$ du morceau de bois »
   (SPC 2022 R), « la pseudopériode est approximativement égale à la période
   propre » (SPC 2021 R et 2022 R). Les compter revient à drapeauter le
   ministère.
3. **Le drapeau d'un autre objet.** `(glyphe à confirmer)` — **35
   occurrences, soit la forme la plus fréquente du sas** — porte sur un
   **caractère**, jamais sur un nombre. `maths-sm-2023-r.md` le dit
   lui-même : *« les mentions (glyphe à confirmer) qui subsistent portent
   toutes sur des lettres ajourées détruites par le scan, jamais sur une
   valeur »*, et *« aucune figure (courbe, tableau, arbre) n'est imprimée »*
   dans tout ce sujet. K-8 porte sur des lectures de figure ; ces 35-là n'en
   sont pas.

---

## 2. La méthode — comment j'ai séparé le drapeau levé du drapeau qui tient

C'est le point où ce document peut se tromper, donc c'est le point où sa
méthode doit être attaquable. La voici en entier.

### 2.1 Le piège, et pourquoi un comptage d'occurrences est faux

Un fichier du sas est **stratifié** : la passe de transcription écrit
d'abord, la passe de vérification adversariale écrit **par-dessus**, sans
effacer. Le résultat est qu'un fichier vérifié **cite son propre ancien
drapeau** — verbatim, guillemets compris — pour dire qu'il l'a résolu.

Le cas le plus net est `pc-2011-n.md` ligne 1174 :

> « **τ = 40 s ± 1,5 ; A = 25 V** *(lectures graphiques — à confirmer)*
> ⟦**CONFIRMÉ en vérification** : chaîne refaite de zéro — asymptote d'encre
> 24,81 V ≡ exponentielle A = 25/τ = 40 ; tangente 69 tirets rms 0,63 px
> → 40,0 s ; pente → 40,6 s ; 63 % → 39,5 s — V.4⟧ »

Un `grep "à confirmer"` compte ici un drapeau ouvert. **Il est fermé, dans
la même phrase, par une mesure indépendante et par un corrigé externe.**

### 2.2 Les cinq contrôles appliqués à chaque occurrence

Pour chacune des occurrences de la table du § 1.1, dans l'ordre :

1. **Lire les deux lignes qui suivent.** Une annotation `⟦CONFIRMÉ en
   vérification …⟧`, `*[valeur CONFIRMÉE …]*`, `**[VÉRIF <date>]**`, ou un
   barré `~~(lecture à confirmer)~~` ferme le drapeau **sur place**.
2. **Chercher la mention dans la section de vérification.** Chaque fichier
   vérifié porte une section « **Ce que la vérification a trouvé** »
   (§ V.1…V.n). Si la lecture drapeautée y a son paragraphe et son verdict
   (« CONFIRMÉE », « TRANCHÉ », « RÉFUTATION »), le drapeau est levé — même
   si son texte d'origine reste intact plus bas dans le fichier.
3. **Chercher dans la table de solde.** Les fichiers les plus mûrs
   (`pc-2011-r.md` § V.14, `pc-2010-n.md` § 8, `pc-2015-r.md` § V.10)
   portent une **table point-à-point** qui solde nommément chaque réserve
   ouverte par la transcription. Un point marqué « **Soldé** » y est levé.
4. **Chercher dans la section « ce qui reste OUVERT ».** Symétrique du
   précédent, et c'est celle qui produit les vrais positifs. Un drapeau
   **re-nommé** par la passe de vérification dans sa propre liste d'ouverts
   (`pc-2012-n.md` § 7, « **Restent ouverts** ») **tient**, quoi qu'en dise
   son texte d'origine.
5. **Distinguer la réserve de fond de la réserve de forme.** Un drapeau
   peut être *matériellement* résolu (trois chaînes concordantes) tout en
   restant *textuellement* écrit dans le dépôt publié. Ce n'est pas un
   drapeau qui tient : c'est un **drapeau à lever administrativement**. Il
   est classé à part (fin du § 4.2), parce qu'il ne coûte pas une mesure —
   il coûte une phrase.

### 2.3 Les trois verdicts, et le troisième qui n'était pas prévu

Le tri a produit **trois** catégories, pas deux. La troisième est apparue en
lisant `pc-2011-r.md`, et elle est trop utile pour être écrasée dans l'une
des deux autres.

| verdict | définition | ce qu'il coûte |
|---|---|---|
| **LEVÉ** | une passe indépendante a re-mesuré la valeur et écrit son verdict | rien |
| **TIENT** | la réserve est re-nommée comme ouverte par la dernière passe qui a écrit, ou aucune passe ne l'a jamais examinée | une **re-mesure** |
| **LEVÉ AU PLAFOND DE PREUVE** | la valeur a été re-mesurée par deux chaînes indépendantes, **mais aucun témoin extérieur au dépôt n'existe** ; la réserve résiduelle est explicitement conservée par la passe de vérification elle-même | rien de plus **n'est atteignable** — sauf si un corrigé apparaît un jour |

La troisième catégorie est le régime entier de `pc-2011-r.md`, qui écrit en
§ V.13 :

> « **Pas de cible externe** : aucun corrigé n'existe sur la source (§ V.3),
> aucun n'a été cherché ailleurs. Les lectures graphiques sont établies par
> **deux chaînes de mesure concordantes**, pas par un tiers — c'est le
> plafond de preuve atteignable ici, et **il est nommé sur chaque valeur**. »

**Pourquoi elle ne se confond pas avec « levé ».** K-8 tient parce qu'un
corrigé est un témoin. Là où il n'y en a pas, deux mesures faites sur le
**même dessin** ne s'affranchissent pas d'une erreur commune de lecture du
dessin — exactement le mode d'échec du $T_0 = 1$ s de l'oscillateur 2018,
que deux lecteurs successifs auraient pu commettre ensemble.

**Pourquoi elle ne se confond pas non plus avec « tient ».** Une re-mesure
de plus sur le même bitmap n'apporterait rien : la troisième chaîne
retomberait sur les deux premières. Ces valeurs ne sont pas des cibles de
campagne ; ce sont des cibles **d'opportunité**, si et seulement si un
témoin externe est un jour trouvé.

### 2.4 Le point où cette méthode peut se tromper

Nommé, pour qu'on puisse l'attaquer :

- **Elle croit les sections de vérification sur parole.** Quand § V.9 de
  `pc-2011-r.md` écrit « CONFIRMÉE », je ne vérifie pas la mesure — je
  vérifie qu'elle a été faite et qu'elle est datée, chiffrée et
  indépendante. Un « CONFIRMÉE » qui serait une relecture visuelle
  déguisée passerait mon filtre. Le README du sas nomme précisément ce
  risque (« un "vérifié" obtenu par lecture visuelle seule … n'est pas un
  "vérifié" »).
- **Elle est aveugle à la réserve non écrite.** Le $T_0 = 1$ s de
  `bk-2018-n-x4b` — le défaut le plus grave trouvé par la passe du
  2026-09-03 — **n'a jamais porté de drapeau nulle part**, parce que la
  source ne proposait aucune valeur et que celle-ci a été produite à
  l'authoring. Aucun tri par drapeau, celui-ci compris, ne l'attrape.
- **Elle prend le silence pour une absence.** Un fichier qui ne drapeaute
  rien peut être irréprochable, ou peut avoir un auteur qui ne drapeaute
  pas. Les deux se ressemblent dans un `grep`.

---

## 3. Le tableau de priorité — les drapeaux du sas qui TIENNENT sur une valeur convertie

**Résultat brut, et il faut le dire avant le tableau : le sas n'en produit
qu'un.** Les **24 fichiers de sujet** du sas sont, à deux exceptions près —
et ce sont exactement les deux exclus du § 7.1 —, **tous passés par une
passe de vérification adversariale**, et ces passes ont fermé leurs
drapeaux de lecture de figure un par un. Ce qui reste
est court, et c'est un résultat en soi — voir le § 6.2 pour ce que ça dit et
ce que ça ne dit pas.

### 3.1 La ligne

| entrée en banque | notion | sujet | drapeau, verbatim | localisation dans le sas | réserve reportée ? | épreuve complète ? |
|---|---|---|---|---|---|---|
| **`bk-2012-n-x4b`** | `pc/rlc-serie` | **SPC 2012 N**, Électricité, 2ᵉ partie (oscillations libres RLC) | « 🔴 **$E_C(0)$ de la figure 4 n'est pas lisible directement** — l'axe et sa flèche masquent l'intersection. Toute publication doit dire « ≈ 19 mJ (non lisible directement) », jamais un chiffre net, **et surtout pas 17,5**. » | `pc-2012-n.md` **§ 7 point 1** (liste « Ce qui reste OUVERT après cette passe ») ; re-nommé au § d'en-tête (« **Restent ouverts** : la valeur exacte de $E_C(0)$ (**non lisible**…) ») ; description de figure au bloc Électricité (`[[figure : « Figure 4 »]]`) | ✅ **REPORTÉE, deux fois** | ✅ **oui** — SPC 2012 N s'assemble à **20,00/20** (7 entrées) |

**Détail de la réserve reportée**, parce que c'est le seul contre-exemple
documenté du « drapeau perdu » et qu'il vaut d'être cité en entier.
`content/pc/rlc-serie/bank.yaml`, `sourcing.note` de `bk-2012-n-x4b` :

> « **RÉSERVE, à ne jamais publier comme un chiffre net** : la valeur
> initiale de la courbe pleine $E_C(0)$ **N'EST PAS LISIBLE** sur le
> document — l'axe des ordonnées et sa tête de flèche masquent
> l'intersection ; deux extrapolations indépendantes donnent
> $E_C(0)\approx 18{,}5$–$19{,}5$ mJ. **Aucune question de cette entrée ne
> s'appuie sur cette valeur** ; elle n'est pas publiée comme un chiffre net
> dans l'intro ci-dessous. »

et, dans le bloc `intro` **rendu à l'élève** :

> « **courbe (a), en trait plein** : part de son **maximum** à $t=0$
> *(l'intersection exacte avec l'axe n'est pas lisible sur le document —
> l'axe et sa tête de flèche la masquent)* … »

**Ce que ça vaut, et pourquoi la priorité est BASSE malgré tout.** La
conversion a fait exactement ce que D-1 reproche à la conversion de
`rlc-serie` 2018 de n'avoir pas fait : **elle a transporté la réserve**, et
même deux fois, jusque dans le texte lu par l'élève. Et le drapeau ne
protège **aucune réponse** — aucune des cinq questions de l'entrée ne
consomme $E_C(0)$. Sa valeur pour la campagne est **méthodologique** : c'est
le modèle de ce qu'une conversion doit faire d'un drapeau, et il est
utilement citable dans l'arbitrage de D-1.

*Contrôle de l'autre sens, fait ici :* la lecture **réfutée** que ce drapeau
protège — « ≃ 17,5 mJ, elle rencontre l'axe exactement sur le trait bleu
17,5 » — n'apparaît dans **aucune** des cinq entrées `bk-2012-n-*` (grep sur
`17,5` dans les cinq `bank.yaml` concernés : les seules occurrences sont des
**millisecondes** dans une entrée 2020 N sans rapport). **La réfutation a
été transportée avec la réserve.**

### 3.2 Les quatre lectures « levées au plafond de preuve » — `pc-2011-r.md`

Elles ne sont **pas** dans le tableau ci-dessus, et le § 2.3 dit pourquoi.
Elles y seraient si le critère était « le texte du sas porte encore la
mention » ; elles n'y sont pas parce que la passe de vérification du
2026-08-28 a refait chacune de ces chaînes de zéro (§ V.9) et les a soldées
nommément (§ V.14, points 7 à 11). Elles sont listées ici parce qu'elles
sont **la plus grosse concentration de lectures de figure sans témoin
externe du corpus converti**, et parce que le lecteur qui grep-erait
`« à confirmer »` les trouverait toutes les quatre.

| entrée | notion | lecture drapeautée | drapeau, verbatim (sas) | soldé par | réserve reportée en banque ? |
|---|---|---|---|---|---|
| `bk-2011-r-x2` | `pc/ondes-mecaniques-progressives` | $\tau = 1{,}5$ ms ⟹ $v_{air}=333$ m/s (fig. C, oscillogramme) | « *(Ce contrôle valide la lecture ; il ne la remplace pas. **Lecture graphique — à confirmer.**)*  » (§ 6.3) | § V.9 + § V.14 pt 7 | ✅ « deux chaînes de mesure concordantes …, **aucun corrigé officiel n'existe pour ce sujet — c'est le plafond de preuve atteignable** » |
| `bk-2011-r-x3` | `pc/rc-charge` | $\tau \approx 2{,}4$ ms ⟹ $C = 12$ µF (fig. F, décharge) | « **Lecture graphique — à confirmer.** » (§ 6.6) | § V.9 + § V.14 pt 8 | ✅ « … **deux chaînes de mesure concordantes sont le plafond de preuve atteignable ici** » |
| `bk-2011-r-x3b` | `pc/rlc-serie` | $T = 3{,}4$ ms ⟹ $L \approx 0{,}59$ H, $E \approx 1{,}1\times10^{-5}$ J (fig. H) | « **Ces trois valeurs sont des lectures graphiques et des déductions, pas des données imprimées. À confirmer.** » (§ 6.8) | § V.9 + § V.14 pt 9 | ✅ « … **ces deux contrôles par conséquence sont le plafond de preuve atteignable ici** » |
| `bk-2011-r-x4b` | `pc/systemes-oscillants` | $X_m = 4{,}0$ cm, $T_0 = 0{,}60$ s, $\varphi = 0$ (fig. J) | « **Lecture graphique — à confirmer.** » (§ 6.10) | § V.9 + § V.14 pt 10 | ✅ « … **c'est le plafond de preuve atteignable ici** » |

Et la déclaration qui les couvre toutes, `pc-2011-r.md` § 12 :

> « **aucune lecture graphique de ce fichier n'est une donnée imprimée** —
> les figures sont des bitmaps 141–196 dpi, et **chaque valeur qui en sort
> porte la mention « lecture graphique — à confirmer »**. »

**Quatre entrées sur les six de SPC 2011 R** portent donc une valeur de
figure qu'aucun témoin extérieur au dépôt ne peut contredire. C'est
structurel : `pc-2011-r.md` § 1.6 établit qu'**il n'existe aucun corrigé
pour ce sujet**, dans aucune langue. Elles sont hors de portée d'une
campagne de re-mesure au sens de K-8 — une troisième mesure sur le même
bitmap retomberait sur les deux premières.

*Un point qui n'est pas un drapeau de lecture mais qui traîne au même
endroit, et qu'il vaut mieux écrire :* la figure E de `pc-2011-r.md` donne
une nappe de pétrole de **780 m** d'épaisseur. La **lecture** est verrouillée
(axe `t(s)` relu au pixel ×8, un seul glyphe `s`), et § 11.11 pose la
question qui reste : « **Décider si la banque le publie tel quel.** » § V.9
la renvoie explicitement à l'owner. Le `sourcing.note` de `bk-2011-r-x2`
tranche : « *rien dans le sujet ne permet de requalifier l'unité — le scan
fait foi, **la valeur est publiée telle qu'elle se déduit*** ». **Un
arbitrage nommé pour l'owner a donc été rendu par la conversion.** Ce n'est
pas une erreur de valeur ; c'est une décision à faire ratifier.

---

## 4. L'extension déclarée — le versant banque, là où vivent réellement les drapeaux qui tuent

> **Ce § 4 sort du périmètre demandé, et le dit.** La commande porte sur
> `docs/sujets/_incoming/*.md`. Le § 3 l'exécute, et n'en tire **qu'une
> ligne**. Publier ce document en s'arrêtant là serait honnête et inutile :
> **le tri sas-seul n'aurait attrapé aucune des deux entrées réfutées par la
> passe du 2026-09-03** — pour une raison structurelle, dite au § 6.2. Ce
> paragraphe fait donc le même tri sur `content/*/*/bank.yaml`, qui est
> l'autre moitié de la chaîne de sourçage nommée par
> `k8-remesure-2017-2019.md` § 8.5 (« *transcription, `sourcing.note`, ou
> description de figure publiée* »). Il est séparé pour qu'on puisse le
> rejeter sans toucher au § 3.

### 4.1 Le tableau de priorité, versant banque

Classé par **coût si l'on se trompe**, pas par ancienneté. Toutes les
entrées ci-dessous appartiennent à une épreuve SPC qui s'assemble à
**20,00/20** — vérifié ici en sommant les `bareme_total` par session sur les
38 `bank.yaml` : **toutes les sessions SPC atteignent exactement 20,00**.
**Chacune de ces valeurs est donc servie à l'élève dans un examen blanc.**

| # | entrée · notion | sujet | drapeau, verbatim | localisation | réserve reportée ? | état K-8 |
|---|---|---|---|---|---|---|
| **1** | `bk-2010-n-x1` · `pc/transformations-lentes-rapides` | SPC 2010 N, chimie 1ʳᵉ partie ($t_{1/2}$, fig. 1) | « **SOURCING GAP** … la description vérifiée de la Figure 1 … ne porte que les deux valeurs d'extrémité de la courbe, déjà flaguées « **à confirmer sur le corrigé** » … La valeur $t_{1/2}\approx20$ min … est **reprise du sommet r-bac** … elle **n'est PAS re-dérivée ni re-confirmée** de façon indépendante ici » | `bank.yaml` en-tête (`SOURCING GAP`) **+** `sourcing.note` (`LACUNE DE PRÉCISION SIGNALÉE`) | ✅ reportée, et jusque dans le `reasoning` de q5 | ⛔ **DÉFAUT AVÉRÉ** — mesure au pixel 12,53 min (2026-08-27) ; `pc-2010-n.md` § V.1 re-mesure **13 min** par sa propre méthode **et trouve le corrigé**. Litige ouvert, non tranché |
| **2** | `bk-2017-n-x3` · `pc/ondes-em-modulation` | SPC 2017 N, modulation ($F_p$, fig. 4) | « on retient $T_p = 0{,}5$ ms (soit $F_p = 2$ kHz) … — **valeur reprise à l'identique de r-bac, pas re-dérivée indépendamment ici**. **RECOUPEMENT ASSUMÉ** avec le sommet de leçon r-bac » | `sourcing.note` **+** note éditoriale en tête de fichier | ✅ reportée | ⛔ **RÉFUTÉ à 66 σ** — $F_p = 1\,003 \pm 15$ Hz par sept méthodes ; re-confirmé le 2026-09-03 sur deux éditions + deux corrigés (986–987 Hz). **La valeur est dans l'ÉNONCÉ du sommet r-bac**, donc dans le cours |
| **3** | `bk-2018-n-x4b` · `pc/systemes-oscillants` | SPC 2018 N, oscillateur ($\varphi$, sens de départ, fig. 4) | « le doc source porte la mention « **(lecture à confirmer)** » sur le sens de départ de la courbe, **jamais levée** dans `docs/sujets/pc/systemes-oscillants.md` elle-même — **un écart entre le statut « vérifié » de l'entrée et cette réserve non résolue**, à signaler » | `sourcing.note` | ✅ reportée — et c'est le `sourcing.note` qui **dénonce** l'alignement sur r-bac | ⛔ **RÉFUTÉ** (dossier D-2) — départ au **maximum**, $\varphi = 0$, $T_0 = 0{,}500$ s ; quatre chaînes contre le dépôt. **Faux aux DEUX endroits**, banque et sommet r-bac |
| **4** | `bk-2019-n-x4` · `pc/lois-de-newton` | SPC 2019 N, lois de Newton ($V_G$ à $t=2$ s, fig. 2) | « la droite atteint $V_G \approx 9{,}5$ m.s⁻¹ vers $t \approx 2$ s ***(lecture d'échelle à confirmer)*** » | **bloc `intro`**, c'est-à-dire **le texte rendu à l'élève** ; repris en `sourcing.note` et en note éditoriale | ✅ reportée — mais **la réponse la contredit quinze lignes plus bas** | ⛔ **RÉFUTÉ** (dossier D-3) — $V_G(2\,\mathrm{s}) = 9{,}00\pm0{,}04$ m/s. La **réponse** publiée (4,5 m/s²) est juste ; c'est la **description de figure** qui est fausse, et elle est visible par l'élève |
| **5** | `bk-2025-n-x1b` · `pc/controle-catalyse` | SPC 2025 N, contrôle/catalyse (paliers, fig. courbes) | « le palier de (c) « **semble légèrement inférieur — lecture d'échelle à confirmer sur le corrigé** » — **aucune coordonnée de croisement de courbe n'y est transcrite**. **Faute de cette donnée**, cette entrée **reprend les valeurs déjà utilisées par l'exercice-sommet r-bac** … $t_{1/2}(\mathrm{exp2})\approx20$ min, rendement $\approx67\,\%$ » | `sourcing.note` **+** `RECOUPEMENT ASSUMÉ` en tête de fichier | ✅ reportée | 🔴 **JAMAIS RE-MESURÉ.** Structure **identique** au cas n° 1 : drapeau d'échelle + valeurs reprises de r-bac faute de données. **La cible n° 1 de la prochaine campagne** |
| **6** | `bk-2019-n-x2` · `pc/ondes-mecaniques-periodiques` | SPC 2019 N, ondes périodiques (flèche ↔ $\lambda$, fig.) | « Description de figure **reprise de la version réglée dans `exercises.yaml`** … **pas de la variante hédgée** « *la correspondance exacte flèche ↔ longueur d'onde est à confirmer sur le scan* » du `docs/sujets` d'origine (règlement déjà effectué en amont pour r-bac) » | `sourcing.note` | ⚠️ **NON — le drapeau est cité pour dire qu'il a été ÉCARTÉ**, pas résolu | 🔴 **JAMAIS RE-MESURÉ.** C'est **le drapeau perdu à l'état pur**, et documenté : la conversion a **choisi** la version non drapeautée du sommet de leçon contre la version drapeautée de sa source |
| **7** | `bk-2021-n-x4` · `pc/ondes-em-modulation` | SPC 2021 N, modulation (comptage des oscillations de la porteuse) | « le comptage exact des oscillations de la porteuse ($\simeq3$ par division, $\simeq30$ à l'écran) **reste une lecture fine sur un tracé très resserré, et le drapeau est maintenu sur ce seul point — conservé tel quel ci-dessous** » | `sourcing.note` | ✅ reportée, explicitement et volontairement | 🔴 **JAMAIS RE-MESURÉ.** Un comptage de crêtes sur tracé resserré : **exactement la chaîne de mesure qui a fait tomber $F_p$ 2017** |
| **8** | `bk-2018-n-x2` · `pc/ondes-mecaniques-progressives` | SPC 2018 N, ondes (décalage 2 div) | « **LACUNE DE SOURÇAGE SIGNALÉE — NON RÉSOLUE ICI** … la fiche `docs/sujets` … porte littéralement la mention « **nombre de divisions du décalage à lire sur le scan** » … **RECOUPEMENT ASSUMÉ (signalé, non résolu ici)** » | en-tête de fichier **+** `sourcing.note` | ✅ reportée | ✅ **RE-MESURÉ ET CONFIRMÉ** le 2026-09-03 : $1{,}96 \pm 0{,}02$ div. **Le drapeau peut être levé** — c'est du texte, pas une mesure |
| **9** | `bk-2025-n-x3` · `pc/ondes-em-modulation` | SPC 2025 N, modulation ($C_0 = 1$ µF) | « **Valeur reprise à l'identique ici, pas re-dérivée indépendamment dans ce fichier — même disposition que le $T_p$ importé de r-bac dans `bk-2017-n-x3`** » | `sourcing.note` | ✅ reportée | 🟡 **risque faible** — la valeur vient de l'**énoncé** de la partie 1 du même sujet, et y est re-vérifiée par une question. Ce n'est pas une lecture de figure. Listée parce qu'elle **se compare elle-même** au cas $F_p$ |
| **10** | `bk-2011-r-x1` · `pc/rotation-axe-fixe` | SPC 2011 R, rotation | « **RECOUPEMENT ASSUMÉ** avec le sommet de leçon : ce même sujet est déjà… » | `sourcing.note` | ✅ reportée | 🟡 recoupement sans drapeau de lecture attaché ; `pc-2011-r.md` § 8.1 a **levé** l'autre drapeau de cette entrée (divergence 05/05,5). Pas une cible de re-mesure |

### 4.2 Les cinq cibles, dans l'ordre où je les traiterais

1. **`bk-2025-n-x1b` (`controle-catalyse`)** — parce que c'est **le clone
   exact du cas n° 1**, qui est le seul défaut avéré du corpus antérieur à
   2017 : un drapeau d'échelle non levé **plus** des valeurs reprises du
   sommet r-bac « faute de cette donnée ». Les deux ingrédients de
   l'HÉRITAGE au sens de K-8 sont réunis et écrits. Et 2025 N n'a **aucun
   corrigé, dans aucune langue** (`k8-remesure` § 9 point 5) : seule une
   re-mesure l'atteindra.
2. **`bk-2019-n-x2` (`ondes-mecaniques-periodiques`)** — parce que c'est le
   **seul cas du corpus où le `sourcing.note` documente noir sur blanc
   qu'une réserve a été écartée au profit d'une version non drapeautée du
   sommet de leçon**. C'est le drapeau perdu, mais délibéré et tracé. Et
   2019 N est dans la fenêtre à deux témoins : **le contrôle est bon marché**.
3. **`bk-2021-n-x4` (`ondes-em-modulation`)** — parce que le drapeau est
   maintenu sur **un comptage de crêtes de porteuse sur tracé resserré**,
   qui est mot pour mot la géométrie qui a produit l'erreur d'un facteur 2
   sur $F_p$ 2017. La même notion, la même figure, la même opération.
4. **`bk-2010-n-x1` (`transformations-lentes-rapides`)** — parce que ce
   n'est plus un suspect mais un **litige ouvert** avec deux mesures
   concordantes contre lui (12,53 min au pixel, 13 min par
   `pc-2010-n.md` § V.1) **et un corrigé trouvé**. Ce qui manque n'est pas
   une mesure, c'est **un arbitrage**.
5. **`bk-2019-n-x4` (`lois-de-newton`)** — parce que la correction est
   **une phrase**, qu'elle supprime une contradiction **visible par
   l'élève** entre l'énoncé et le raisonnement de la même entrée, et
   qu'aucun nombre de réponse ne bouge (dossier D-3).

*Et deux levées administratives, à faire dans le même mouvement, qui ne
coûtent aucune mesure :* le drapeau « 3 V / 1 V » de `bk-2017-n-x3` (levé
matériellement **trois fois** — `pc-2017-n.md` § 8.1, puis § 13.2, puis
`k8-remesure` § 5.1 avec $m = 0{,}504\pm0{,}024$ — et toujours écrit
« **drapeau non levé pour ce sujet** » dans le dépôt), et la
`LACUNE DE SOURÇAGE` de `bk-2018-n-x2` (levée par la mesure $1{,}96\pm0{,}02$
div du 2026-09-03).

---

## 5. Les drapeaux qui tiennent sur des sujets NON convertis — moindre priorité

Un drapeau sur un sujet non converti ne fait rien de mal : la valeur qu'il
protège n'est servie à personne. Il devient une **condition de conversion**,
pas une urgence.

**Le sas ne compte qu'un seul fichier vérifié et non converti** :
`pc-2010-r.md` (SPC 2010 rattrapage, sujet entier, 20,00). Aucune entrée
`bk-2010-r-*` n'existe dans les 38 `bank.yaml`. Les deux autres non convertis
sont les deux fichiers exclus du § 7.1.

### 5.1 `pc-2010-r.md` — aucun drapeau de lecture de figure ne tient

Les cinq réserves de lecture de sa transcription ont **toutes** été fermées
par la passe de vérification du 2026-09-03, et fermées *avec une source
neuve* — la géométrie vectorielle de l'**original arabe**, retrouvé par
cette passe (`course-311`, éléments `39367`/`39368`), plus son corrigé :

| lecture | drapeau d'origine | sort |
|---|---|---|
| $\tau = 5{,}0$ div $\Rightarrow 1{,}0$ µs (fibre optique) | `~~(lecture à confirmer)~~` | **LEVÉ** — « **[VÉRIF 2026-09-03] — LECTURE CONFIRMÉE, le « à confirmer » est levé.** » ; trois témoins (vecteur, pixel, corrigé) |
| taux de modulation, $U_{max}$ / $U_{min}$ (fig. 6) | « `U_max ≈ 2,01 div`, creux `≈ 0,72 div`, *lecture à confirmer* » | **LEVÉ** — § V.7, deux chaînes indépendantes, axe fixé **par la symétrie du signal** ; « n'est plus « à confirmer » — $U_{max} = 2{,}00$ div et $U_{min} = 0{,}70$ div » |
| rapport de vitesses des courbes A / B | `~~(lecture à confirmer ; le compte de …)~~` | **LEVÉ**, barré sur place |

### 5.2 Ce qui tient sur `pc-2010-r.md`, et qui n'est pas une lecture

Trois réserves tiennent, et **aucune n'est une erreur de transcription** —
le fichier le dit lui-même : « *trois réserves nommées, aucune n'étant une
erreur de transcription : deux arbitrages owner et un choix d'affichage* ».
Elles sont des **conditions de conversion**, à porter à l'ordre du jour
avant que 2010 R n'entre en banque :

1. **§ 9 point 1 — le statut de la source. « instruit, non tranché » —
   arbitrage owner.** Le document français servi par AlloSchool **n'est pas
   l'édition ministérielle** : chaque page porte « *Traduction :
   Pr. Hassan OUSBANE & Pr. Abdelaziz EL AAMRANI* », le cartouche imprime un
   cadre créé en 2014+ (anachronique pour 2010) et **aucun code d'examen**.
   L'original arabe a été trouvé, et le code réel (`RS28`) établi.
2. **§ 9 point 6 — l'anatomie des identifiants. « INSTRUIT, non tranché » —
   arbitrage owner.** Les `id` suivent-ils la **position** sur la copie
   (chimie = x1) ou le **libellé imprimé** (« Exercice 1 » = les ondes) ? Le
   précédent 2011 R dit position ; la gate `validate-content` refuse un `id`
   contredisant son libellé. **Deux issues rédigées, aucune choisie.**
3. **Un choix d'affichage**, sans enjeu de valeur.

### 5.3 Les réserves des sujets convertis qui ne portent pas sur une figure

Recensées pour que personne ne les confonde plus tard avec des drapeaux
K-8. Elles tiennent, elles sont légitimes, et **K-8 ne les concerne pas** :

- **`maths-sexp-2018-n.md` — le symbole de II-5.** « **CLEARÉ POUR
  CONVERSION**, avec **une** réserve nommée (le symbole de II-5) ». Le
  fichier est converti (`maths/derivabilite-etude-fonctions`), et **la
  réserve a survécu**, jusque dans le stem rendu à l'élève : « *LE SYMBOLE DE
  II-5 (« f(4) ⊔ 4.2 ») — RECONSTRUCTION ÉDITORIALE, PAS UNE LECTURE* ». Ce
  n'est pas une valeur de figure : c'est un caractère physiquement absent du
  PDF, adjugé par conséquence.
- **`pc-2015-n.md` — la question 2-3.** « *clearé pour conversion, sous la
  seule réserve nommée en tête (question 2-3)* ». C'est un **défaut du sujet
  officiel** (`ρ = 0;78 g.L⁻¹`, point-virgule et unité fausse d'un facteur
  1000) qui rend la question insoluble telle qu'imprimée — **décision
  d'owner**, pas une lecture de figure.
- **`pc-2011-n.md` — la garde de conversion S1.** L'échelle des ordonnées de
  la figure de chimie est incompatible avec les données de l'énoncé
  (facteur 3,24, confirmé dans les deux sens). La conversion a posé une
  **garde** plutôt qu'un drapeau : « *aucune valeur absolue de ΔP depuis la
  figure* ». C'est la troisième bonne réponse possible à un drapeau, après
  « lever » et « reporter » : **ne pas convertir la valeur du tout.**

---

## 6. Ce que ça donne pour K-8 — chiffré

### 6.1 Le décompte

| | nombre |
|---|---:|
| Fichiers du sas balayés (26 `.md` − README − JOURNAL − 2 exclus) | **22** |
| Occurrences brutes « à confirmer », toutes formes | **76** |
| — dont `(glyphe à confirmer)`, **hors périmètre K-8** | **35** (46 %) |
| — dont maths, non liées à une figure | 8 |
| Occurrences des autres formes (`non lisible`, `non tranché`, `non résolu`, `réserve nommée`) | 23 |
| **Drapeaux de lecture de figure qui TIENNENT dans le sas** | **1** |
| — dont **convertis en banque** | **1** (100 %) |
| — dont **réserve perdue à la conversion** | **0** |
| Lectures « levées au plafond de preuve » (sas, `pc-2011-r.md`) | **4** — converties, réserves reportées |
| **Drapeaux qui TIENNENT côté banque** (§ 4, extension) | **10** |
| — dont **convertis**, donc servis | **10** (par construction) |
| — dont **réserve perdue à la conversion** | **1** (`bk-2019-n-x2`) |
| **TOTAL des drapeaux qui tiennent** | **11** |
| — **convertis et servis à l'élève** | **11 / 11** |
| — **ayant perdu leur réserve** | **1 / 11** |
| — **déjà instruits** par la passe du 2026-09-03 ou avant | **5** (dont **4 défauts avérés ou réfutés**) |
| — **jamais re-mesurés** | **6** |

Et, en regard, le seul chiffre qui compte pour juger le tri :

> **Sur les 5 drapeaux qui tiennent et qui ont déjà été instruits, 4 ont
> livré un défaut.** (`bk-2010-n-x1` $t_{1/2}$ · `bk-2017-n-x3` $F_p$ ·
> `bk-2018-n-x4b` $\varphi$ · `bk-2019-n-x4` description de figure. Le
> cinquième, `bk-2018-n-x2`, tient.) **Le prédicteur se comporte comme la
> passe du 2026-09-03 l'annonçait**, sur un échantillon distinct et
> légèrement plus large.

### 6.2 Pourquoi le sas seul ne suffit pas — et c'est le résultat le plus utile

Le tri sas-seul rend **une** ligne. La raison n'est pas que le sas est
propre ; elle est **structurelle, et elle a trois branches** :

1. **Le sas est en amont, et il a été vérifié.** Sa fonction déclarée est
   d'être un **sas** : les fichiers y entrent `transcrit (non vérifié)`, une
   passe adversariale y ferme les drapeaux, puis ils sont convertis. **Les 22
   fichiers balayés ont tous subi cette passe** — les deux seuls du
   répertoire qui n'y sont pas encore passés sont précisément les deux
   exclus du § 7.1. Le sas est donc, par construction, l'endroit du dépôt où
   les drapeaux ont *le plus de chances* d'avoir été levés.
2. **Le sas ne contient ni 2018 ni 2019.** Il n'y a **aucun** fichier
   `pc-2018-*.md` ni `pc-2019-*.md`. Or **les deux entrées réfutées** par la
   passe du 2026-09-03 (D-1 et D-2) sont sur SPC 2018 N. **Le recoupement
   entre l'échantillon qui a produit le prédicteur et le corpus du sas est
   vide.** Un tri sas-seul ne pouvait pas les retrouver, et l'annonce du § 3
   (« une ligne ») n'est pas un démenti du prédicteur.
3. **Le drapeau perdu est, par définition, invisible à l'aval.** C'est le
   point dur. **D-1 (`bk-2018-n-x3`, `pc/rlc-serie`) n'apparaît dans AUCUN
   des deux balayages de ce document** — ni dans le sas (pas de fichier
   2018), ni dans la banque, parce que **la banque ne porte plus le drapeau**.
   Vérifié ici : `content/pc/rlc-serie/bank.yaml`, `bk-2018-n-x3`, publie
   *« les maxima successifs apparaissent vers $t\approx1$ ms puis
   $t\approx3$ ms (période $\approx2$ ms) »* **sans aucune réserve**, alors
   que `docs/sujets/pc/rlc-serie.md` porte *« (lecture d'échelle à
   confirmer) »* sur cette même lecture.

> **Conséquence opérationnelle, et c'est la recommandation de ce document :
> le gisement de drapeaux qui compte est `docs/sujets/{pc,maths}/*.md` — les
> transcriptions promues. Un comptage brut y donne 73 occurrences
> « à confirmer » (47 en physique, 26 en maths), dont 10 sur le seul
> `rlc-serie.md`, 7 sur `reactions-acido-basiques.md`, 6 sur
> `ondes-em-modulation.md`. C'est là que vit le drapeau perdu, parce que
> c'est le seul endroit où l'on peut comparer ce que la source disait à ce
> que la banque a publié.** Ce balayage-là n'est pas fait ici (§ 7.3).

### 6.3 Comment cette liste recoupe les 78 entrées encore non re-mesurées

`k8-remesure-2017-2019.md` § 8.1 laisse **78 entrées** sur les 89 de
`lectures-graphiques.md`. Le croisement identifiant par identifiant donne :

| des 11 drapeaux qui tiennent… | dans les 78 | déjà re-mesurés (les 11) | **hors des 89** |
|---|---:|---:|---:|
| | **4** | **4** | **3** |

- **Dans les 78** — `bk-2010-n-x1` (10 mentions, la plus chargée du lot),
  `bk-2025-n-x1b` (8 mentions), `bk-2021-n-x4` (**3 lignes** de
  l'inventaire : `ondes-em-modulation` 7 mentions, `rc-charge` 5,
  `rlc-serie` 2), `bk-2025-n-x3` (2 lignes). **Soit 4 identifiants pour 7
  des 89 lignes de l'inventaire.**
- **Déjà re-mesurés** — `bk-2017-n-x3`, `bk-2018-n-x4b`, `bk-2019-n-x4`,
  `bk-2018-n-x2`. Trois sur quatre ont livré un défaut.
- **Hors des 89** — `bk-2019-n-x2`, `bk-2011-r-x1`, `bk-2012-n-x4b`, plus
  les **quatre** lectures « au plafond de preuve » de `bk-2011-r-*`.

### 6.4 Un fait à porter à K-8 : l'inventaire des 89 est PÉRIMÉ

Trouvé en faisant ce croisement, et il change le dénominateur de K-8.

- `lectures-graphiques.md` est daté du **2026-08-28** et chiffre
  **89 entrées sur 187**.
- **La banque en compte aujourd'hui 234** (comptées ici, `- id: bk-` sur les
  38 `bank.yaml`). **47 lignes ont été ajoutées depuis l'inventaire.**
- Elles sont les conversions des **sept épreuves SPC** du 2026-08-28/29 —
  2010 N, 2011 N, 2011 R, 2012 N, 2015 N, 2015 R, 2017 N, **53 lignes au
  total**, dont **2 seulement** figurent dans l'inventaire (`bk-2010-n-x1`
  et `bk-2017-n-x3`, qui y étaient déjà **avant** ces conversions parce que
  leurs blocs sont précisément ceux que les fichiers du sas excluaient de
  leur périmètre).

> **Les 47 lignes ajoutées depuis le 2026-08-28 n'ont jamais été passées au
> repérage de figure**, et elles sont servies à l'élève : les sept épreuves
> concernées s'assemblent toutes à 20,00/20. Elles ne sont ni dans les 89,
> ni dans les 78, ni dans les 11. Parmi elles : les **quatre** lectures de
> `pc-2011-r` qu'aucun corrigé au monde ne peut contredire, et la réserve
> $E_C(0)$ de `bk-2012-n-x4b`.

*Précision d'honnêteté sur ce chiffre.* 53 lignes et 47 lignes ne sont pas
le même compte, et l'écart est réel : une partie de SPC 2015 N était **déjà**
en banque avant le sas (`bk-2015-n-x1` porte la date 2026-07-14), donc
figurait déjà dans les 187. **Le chiffre solide est le delta : 234 − 187 =
47 lignes** postérieures au repérage. Le chiffre par session (53) est une
borne haute sur les sept épreuves. **Aucune des deux lectures ne change la
conclusion** : l'inventaire des 89 doit être refait sur les 234, et personne
ne sait aujourd'hui combien de lectures de figure vivent dans ces 47.

**Et deux entrées ont changé de statut de visibilité.** L'inventaire marque
`bk-2010-n-x1` et `bk-2017-n-x3` « épreuve complète : **—** ». Le compte
refait ici — somme des `bareme_total` par session sur les 38 `bank.yaml` —
donne **SPC 2010 N = 20,00** et **SPC 2017 N = 20,00**. **Les deux entrées
sont désormais servies en mode examen**, et l'une porte le seul défaut avéré
antérieur à 2017, l'autre le litige à 66 σ.

---

## 7. Ce que ce recensement n'a PAS fait

Nommé, pour que rien ne passe pour acquis.

### 7.1 Les deux fichiers exclus, et ce qu'ils emportent avec eux

**`pc-2012-r.md` et `pc-2013-r.md` n'ont pas été ouverts.** Deux passes de
vérification les réécrivaient pendant que ce document était produit ; les
lire aurait donné un état instable. **À recenser ensuite**, et le motif de
priorité est écrit d'avance : le README du sas les donne tous deux
**⚠️ NON VÉRIFIÉ (2026-09-03)**.

**Ce que ça implique, et il faut le dire nettement : leurs drapeaux n'ont,
par construction, jamais été examinés.** Un drapeau dans un fichier vérifié
a au moins été lu par un adversaire ; un drapeau dans un fichier non vérifié
n'a été lu par personne d'autre que celui qui l'a écrit. **Ce sont les
drapeaux les plus lourds du sas, et ils ne sont pas dans ce document.**

Deux circonstances atténuent, et une aggrave :

- **Atténuant.** Ni 2012 R ni 2013 R **ne sont convertis** — aucune entrée
  `bk-2012-r-*` ni `bk-2013-r-*` n'existe dans les 38 `bank.yaml`. **Aucune
  de leurs valeurs n'est servie à un élève.** Leurs drapeaux sont des
  conditions de conversion, pas une exposition.
- **Atténuant.** Ces deux transcriptions ont eu **sujet ET corrigé localisés
  d'avance, plus l'original arabe** — un avantage qu'aucune passe antérieure
  n'avait.
- **Aggravant.** Le README leur attribue déjà des **défauts de fond du sujet
  officiel** (F1 sur 2012 R : « les parties 1 et 2 » contre « 2 et 3 » ; F1
  sur 2013 R : un amortissement dessiné qui correspond à $R \approx 50\ \Omega$
  contre les 208,4 imposés par le circuit) et, pour 2013 R, un **piège neuf
  pour le protocole** : « *les chiffres de la couche de texte arabe sont FAUX
  ET PLAUSIBLES* — « الشكل 1 » s'extrait « الشكل 3 » ». Une transcription qui
  se fie à la couche de texte pour un **numéro de figure** peut donc décrire
  la mauvaise figure sans que rien ne la contredise.

**Un compte partiel, obtenu sans les ouvrir** (`grep -c` seul, ce que ce
document s'autorise sur un fichier instable) : `pc-2012-r.md` porte **0**
occurrence de « à confirmer », `pc-2013-r.md` en porte **1**. C'est un
compte d'octets, pas une lecture, et il ne dit rien de leur statut.

### 7.2 Aucune mesure, aucune correction

- **Aucune valeur n'a été re-lue sur une figure.** Ce document ne mesure
  rien : il trie des réserves écrites. Chaque verdict de mesure qu'il cite
  (12,53 min, 1 003 Hz, 0,500 s, 9,00 m/s, 1,96 div…) est **repris** de
  `k8-remesure-2017-2019.md`, de `known-issues.md` K-8 ou du fichier du sas
  cité, jamais refait ici.
- **Aucun fichier n'a été modifié, hors celui-ci.** Pas de `bank.yaml`, pas
  d'`exercises.yaml`, pas de `lesson.md`, pas de `docs/sujets/`, pas de
  `known-issues.md`, pas de `lectures-graphiques.md`. Aucun commit, aucun
  push.
- **Aucun litige n'est tranché** — ni les trois déjà ouverts, ni D-1, D-2,
  D-3. Les deux « levées administratives » du § 4.2 sont **proposées**, pas
  faites.

### 7.3 Le troisième gisement, non balayé — et c'est le plus important

**`docs/sujets/{pc,maths}/*.md` — les transcriptions promues — n'a pas été
balayé.** Le § 6.2 montre que c'est là que vit le **drapeau perdu**, donc là
que le tri paie le plus. Le comptage brut donné au § 6.2 (**73 occurrences
« à confirmer »**, dont 10 sur `rlc-serie.md`) est un `grep -c` : il n'a
subi **aucun** des cinq contrôles du § 2.2. **Il ne dit pas 73 drapeaux ; il
dit 73 endroits où regarder.**

Le geste qui manque, et qui est le vrai successeur de ce document :

> pour chaque drapeau de `docs/sujets/*.md` qui tient, retrouver la **phrase
> correspondante dans la banque** et vérifier si la réserve a fait le
> voyage. Un drapeau qui tient dans la source **et** est absent de la banque
> est un **drapeau perdu** — le troisième mode d'échec de K-8, et le seul
> qu'aucun contrôle interne au dépôt ne peut voir.

### 7.4 Les autres angles morts

1. **Le drapeau qui n'a jamais été écrit.** Le $T_0 = 1$ s de
   `bk-2018-n-x4b` — la valeur la plus fausse trouvée à ce jour (facteur 2,
   dans le cours) — **ne portait de drapeau nulle part**, parce que la
   source ne proposait aucune valeur et que celle-ci a été produite à
   l'authoring. **Aucun tri par drapeau, celui-ci compris, ne l'attrape.**
   C'est la limite dure du prédicteur, et elle vaut d'être répétée : le tri
   par drapeau trouve des défauts **vite**, il ne les trouve pas **tous**.
2. **`exercises.yaml` n'a pas été balayé.** Les sommets de leçon r-bac sont
   l'autre endroit où une valeur de figure est rendue à l'élève — et, pour
   PC 2017 et PC 2018, **le pire des deux**, parce que c'est le cours. Ce
   document ne dit rien de leurs drapeaux.
3. **La qualité des passes de vérification n'a pas été jaugée** (§ 2.4). Un
   « CONFIRMÉE » est accepté sur sa date, ses chiffres et son indépendance
   déclarée, pas re-audité.
4. **Les 11 entrées de maths de K-8 restent hors de portée**, comme dans la
   passe du 2026-09-03. Le sas maths ne porte que des drapeaux de **glyphe**
   (35 sur 76) ; ses figures, quand il y en a, ne sont pas drapeautées.
   `docs/sujets/maths/*.md` en porte 26 de plus, non triés (§ 7.3).
5. **Les identifiants du § 4.1 n'ont pas été re-vérifiés contre leur
   `exercise_label`.** Le croisement est fait sur l'`id`, tel qu'écrit. Deux
   entrées du corpus partagent délibérément un même `id` sur deux notions
   (`bk-2011-r-x1`) ; c'est signalé là où ça compte, pas systématisé.
6. **Le rattachement drapeau → question n'a pas été fait partout.** Pour
   `bk-2012-n-x4b`, l'entrée dit elle-même qu'aucune question ne dépend de
   la valeur ; pour les autres, ce document reprend ce que le
   `sourcing.note` déclare, sans re-tracer la chaîne question par question.

---

## 8. En une phrase

**Onze drapeaux tiennent ; les onze sont convertis et servis ; un seul a
perdu sa réserve en chemin ; et sur les cinq qui avaient déjà été instruits,
quatre cachaient un défaut.** Le tri par drapeau reste ce que la passe du
2026-09-03 disait qu'il était — **le meilleur prédicteur disponible, et pas
un filet** —, mais ce document ajoute une correction à son mode d'emploi :
**il faut le passer sur la SOURCE (`docs/sujets/`), pas sur la
destination**, parce que le drapeau perdu ne laisse par définition aucune
trace là où il a été perdu.
