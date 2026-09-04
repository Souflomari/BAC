# Le contraste d'un texte de figure contre ce qui est VRAIMENT peint derrière lui

*Mesuré et corrigé le 2026-09-04. Instrument : `web/scripts/figure-preview.mjs`,
sonde 6 (modèle de peinture) + étage pixel (mesure). Corpus : les 258 figures
statiques de `content/**/media/*.svg`, thème clair.*

---

## L'angle mort

`contrast-gate` juge les **80 paires de la palette** : chaque jeton d'encre
contre chaque jeton de fond, dans les deux thèmes. Toutes passent. Mais cette
porte ne dit RIEN du voisinage réel **à l'intérieur** d'une figure :

> une étiquette en `--figure-accent` posée sur un aplat `--figure-accent` à
> 16 % tombe à 4,36:1 sans qu'aucune porte ne bouge — parce que les deux
> jetons sont parfaitement conformes, chacun de son côté.

C'était le dernier angle mort de la famille « figures », après les
chevauchements d'étiquettes, les tracés qui barrent, les sorties de cadre et
le balayage en thème sombre.

---

## Ce que la mesure a trouvé

**101 textes** en thème clair (plus **3 en sombre**, voir plus bas) sous le
seuil de SC 1.4.3, dans **35 fichiers** — dont
**30 sur les deux figures marquées DETTE OWNER** (`loi-mailles-build`,
`energy-exchange`), qui ne sont servies à aucune leçon et dont le sort est un
arbitrage ouvert : elles ne sont pas repeintes ici, elles sont **portées au
dossier** (voir « Ce qui n'est pas corrigé » plus bas).

Restent **71 défauts vivants**, tous corrigés. Ils se rangent en six familles,
et cinq d'entre elles sont une seule et même erreur de raisonnement — *« la
couleur du rôle passe avant la lisibilité »* :

| Famille | Cas | Exemple | Correctif |
|---|---:|---|---|
| Accent sur teinte d'accent | 30 | `factorisation-360` : « 2 » accent sur feuille accent 16 % → 4,50:1 | l'étiquette prend `--figure-ink` ; l'aplat porte déjà le rôle |
| Encre sur aplat plein | 14 | `euclide-cascade` : « 198 » encre sur bande `--figure-ink-soft` → 2,22:1 | l'étiquette prend `--figure-surface` |
| Blanc sur teinte pâle | 5 | `origin-i` : « + » blanc sur disque accent 22 % → 1,39:1 | glyphe en encre, et palier haut ramené de 0,85 à 0,70 |
| Atténuation par `opacity` | 4 | `factorisation-360` : « 5 » en `ink-soft` à 0,6 → 2,92:1 | atténuer par l'ENCRE, jamais par l'opacité, quand le texte porte une information |
| Jeton de grille utilisé comme encre | 3 | `explication-bk-2019-n-x1` : « x », « y », « z » en `--figure-grid` → 1,03:1 à 1,36:1 | `--figure-ink` pour les lettres, `--figure-ink-soft` pour les flèches d'axe |
| **Texte effacé par une étape ultérieure** | 3 | `produit-vectoriel-aire` : le parallélogramme du step-2, rempli en blanc, efface l'étiquette « u » du step-1 | voir ci-dessous |

### La sixième famille est la plus intéressante

Les étapes d'une figure sont **cumulatives** — `StagedFigure` :
`const wanted = fullyRevealed || n <= stage`, et les groupes révélés sont
insérés en `beforeend`, donc dans l'ordre de peinture. **Ce qu'un step peint
recouvre pour de bon ce qu'un step antérieur avait peint.**

Trois figures s'effaçaient elles-mêmes, et aucun instrument existant ne
pouvait le voir — le contraste nominal de ces textes était parfait (17,35:1
pour l'un d'eux) :

1. **`produit-vectoriel-aire`** — le parallélogramme du step-2 était rempli
   en `--figure-surface`, c'est-à-dire *blanc sur blanc* : invisible à l'œil
   du relecteur, il n'ajoutait rien… sauf qu'il effaçait l'étiquette « u » du
   vecteur, à l'instant précis où la leçon dit « le parallélogramme engendré
   par u et v ». → `fill="none"`.
2. **`univers-restreint`** — le voile de restriction (`.urs-dim2`,
   `--figure-surface` à 0,82) était posé DEUX FOIS sur les mêmes cases : le
   step-4 reposait un rectangle strictement contenu dans celui du step-3.
   0,97 d'opacité cumulée : les effectifs « 32 » et « A̅ ∩ B̅ » n'étaient plus
   atténués mais **effacés**. → le second voile, visuellement redondant, est
   supprimé.
3. **`independant-vs-incompatible`** — le nom de l'univers, « Ω », était posé
   à l'intérieur du carré, à l'endroit exact que la bande B vient recouvrir
   d'un aplat au step-2. → déplacé sous le coin bas-gauche, dehors.

### Trois recouvrements sont VOULUS, et sont désormais déclarés

`circuit-accorde-selection` (la porteuse choisie redessinée en accent gras
par-dessus elle-même), `rlc-schema` (le titre du step-1 masqué puis remplacé
quand la résistance entre en scène) et `transfert-direct-chaleur` (l'ion Cu²⁺
qui *devient* un atome de cuivre au même site, avec sa propre étiquette).

Ces trois-là déclarent maintenant, dans le fichier, un marqueur
`RECOUVREMENT ASSUMÉ: « <le texte> » — <la raison>` — sur le modèle de
`COULEURS SÉMANTIQUES:` et de `DETTE OWNER:`. La sonde lit le marqueur et
exempte **ce texte-là**, pas le fichier entier : un marqueur global ferait
taire l'instrument pour l'effacement accidentel qu'on introduira demain.

---

## Comment la mesure est faite — et les trois pièges payés pour y arriver

L'instrument travaille en deux temps : **le modèle propose, les pixels
disposent.**

**Le modèle** (sonde 6) simule le modèle de peinture de SVG : pour chaque
texte, il cherche les formes qui contiennent son centre et les compose dans
l'ordre du document, chacune avec son `fill-opacity` et l'opacité de ses
groupes. **L'étage pixel** vérifie : il capture la zone du texte, cache le
texte, recapture — la seconde image ne contient plus que le fond, dont on
prend la couleur médiane. Le verdict rendu est celui des pixels.

Il a fallu trois erreurs pour arriver là, et chacune était **silencieuse et
sûre d'elle** :

1. **`elementsFromPoint` ne répond que dans la fenêtre visible.** La page
   d'aperçu empile 258 figures ; la fonction rendait un tableau vide pour
   presque toutes, la sonde retombait sur « surface de la figure », et dix
   « R » blancs posés sur des billes rouges étaient annoncés à 1,00:1 contre
   du blanc. *(60 faux positifs.)*
2. **La boîte englobante n'est pas la forme, et une voile n'est pas un
   aplat.** Le rectangle d'un `path` diagonal contient des points que le
   tracé ne couvre pas ; et une bande d'accent à 28 % ne se lit pas comme un
   aplat d'accent. Corrigé par `isPointInFill` (géométrie exacte, point
   ramené dans le repère de la forme par la CTM) et par une composition
   alpha honnête. *(418 défauts annoncés avant ce correctif.)*
3. **Une capture `fullPage` avec `clip` ne marche pas sur une page de
   100 000 px de haut.** Chromium ne peut pas allouer la surface et rend le
   fond de page. L'étage pixel a alors certifié **soixante-dix textes
   invisibles qui sont parfaitement lisibles**. Corrigé en amenant chaque
   texte dans la fenêtre avant de capturer — et par un **témoin permanent** :
   un fond mesuré égal au fond du corps est physiquement impossible à
   l'intérieur d'une carte de figure ; l'instrument refuse alors de trancher
   au lieu d'inventer un défaut.

C'est, à la lettre, la règle apprise la veille et inscrite dans
`INSTRUMENTS.md` : *un compteur qui trouve beaucoup plus que ce qu'un œil
trouve sur une page doit être suspecté avant d'être cru.*

---

## Le thème sombre : trois défauts de plus, et une règle qui en sort

Le corpus a ensuite été passé **en thème sombre**, exhaustivement. Trois
défauts vivants s'y cachaient — et deux d'entre eux venaient d'être
**introduits par les correctifs du thème clair**, ce qui est précisément la
raison d'être d'une seconde passe.

**LA RÈGLE, et elle est contre-intuitive :** *un texte se pose sur un aplat
PLEIN (et prend `--figure-surface`) ou sur une teinte FRANCHE (≤ ~0,4, et
prend `--figure-ink`). **Jamais sur un mi-ton.***

Pourquoi : en thème clair l'accent (#00746A) est plus SOMBRE que la surface ;
en thème sombre (#6DC3B8) il est plus CLAIR. Une teinte à 0,5-0,7 se mélange
donc vers **la même couleur** dans les deux thèmes — un vert d'eau moyen —
tandis que l'encre, elle, bascule. Un glyphe posé là **échoue forcément d'un
côté** : le « + » de `origin-i` valait 5,5:1 en clair et **2,99:1 en sombre**.
Corrigé en rendant les disques « déjà passées » pleins (glyphe en surface) et
en descendant la rampe des « approchantes » à 0,38 / 0,26 / 0,16 (glyphe en
encre). Même correctif sur la bande de reste d'`euclide-cascade` (0,55 →
0,38).

**Et un cas où AUCUNE couleur ne marche.** `dispersion-prisme` peignait ses
étiquettes « Rouge » et « Violet » dans la teinte du rayon qu'elles nomment —
`COULEURS SÉMANTIQUES` dûment déclarées, et une note de la veille affirmant
« vérifié au rendu dans les deux thèmes ». La note disait vrai du prisme et
des rayons ; elle disait faux de ces deux mots : **3,23:1 et 2,67:1** sur la
surface sombre. Et il n'y a pas d'échappée par la couleur : pour tenir 4,5:1
à la fois sur blanc et sur #1A1917, une teinte devrait avoir une luminance à
la fois ≤ 0,18 et ≥ 0,22. **L'intervalle est vide.** Le correctif est la
solution classique des légendes : une **pastille** de la vraie teinte (un
graphique, donc 3:1 suffit) et le **mot en encre**. La couleur reste
l'information ; le mot redevient lisible.

## Ce que l'instrument ne mesure toujours PAS
- **Le halo.** Un texte cerné d'un liseré blanc (`paint-order`) est lisible
  sur n'importe quel fond, mais l'étage pixel retire le halo avec le texte et
  le juge quand même sur la teinte. Aucune figure n'utilise cette technique
  aujourd'hui ; si l'une s'y met, la sonde criera à tort.
- **Un texte à moins de 0,5 d'opacité** est traité comme un ornement et n'est
  pas jugé. Angle mort **assumé** : si une information passe un jour par une
  opacité aussi basse, la sonde la manquera.
- **Le modèle seul manque 17 % des cas.** Sur ce corpus : 84 candidats
  trouvés par le modèle, 101 défauts réels trouvés par le balayage intégral
  (`--pixels-tous`, deux captures par texte, ~25 min sur 258 figures). Le
  modèle ne peut PAS voir un texte recouvert par une forme peinte APRÈS lui —
  il s'arrête au texte. **Pour une campagne, c'est `--pixels-tous` qui fait
  foi** ; la passe rapide sert à surveiller une correction.

---

## Ce qui n'est pas corrigé, et pourquoi

**30 défauts sur `loi-mailles-build.svg` et `energy-exchange.svg`.** Ces deux
figures portent un marqueur `DETTE OWNER` : couleurs codées en dur (donc
figées quel que soit le thème), et pour la seconde une étiquette de période
physiquement fausse. Aucune leçon ne les référence : **rien n'est servi à
l'élève**. Les repeindre reviendrait à décider qu'on les garde, alors que
c'est précisément la question posée à l'owner (HANDOFF §0, point 7 bis,
« fix or delete »).

Ce que la mesure ajoute au dossier — **un troisième défaut**, à verser à
l'arbitrage : leurs textes tombent entre **2,34:1 et 4,32:1**, avec des gris
et des bleus hors palette (`#8A8A92`, `#7E9CC8`, `#6B6B72`, `#B06040`,
`#8A6A3A`). Ce ne sont pas des jetons ; le contraste n'y est donc pas
réparable par une bascule de thème. Si la décision est « on garde », la
figure est à **refaire**, pas à retoucher.
