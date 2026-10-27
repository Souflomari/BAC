# ADR 0030 — Pivot « Studio » : la nouvelle identité visuelle

**Date :** 2026-08-18 · **Statut :** accepté (quatre décisions owner du
2026-08-17, verrouillées via questions explicites) · **Pilote :**
`docs/product/REFONTE-STUDIO.md`

## Contexte

Trois audits convergents (owner 15/08, audit Fable 17/08, critique
externe 17/08) : le système de design est au niveau (jetons uniques,
échelle M3, ressorts physiques, honest-state) mais l'identité « warm
editorial » (ADR 0023) produit un rendu jugé « generic AI prototype »
par l'owner — deux fois, captures à l'appui. La recherche de sources
primaires (billet de la refonte Linear, système Apple, Brilliant) montre
que le dénominateur commun des références n'est pas une palette mais :
contraste élevé, un accent, surfaces séparées par bordures et paliers de
ton, une famille typographique, retenue.

## Décision

1. **Palette « Studio clair »** — surfaces de travail blanches sur toile
   près-blanc neutre-chaud, encre presque noire, bordures nettes ;
   hiérarchie par paliers de ton + bordures, ombres réduites à deux
   niveaux ; le sarcelle signature est conservé, recalibré pour le
   blanc ; thème sombre dérivé par la même méthode. Couleur conçue en
   OKLCH (clarté perçue uniforme — méthode Linear), livrée en hex.
2. **Typographie** — une grotesque (Geist, repli Inter si absente du
   manifeste next/font) en coupe display (titres, tracking négatif) et
   text (UI) ; mono assortie pour tout nombre qui change
   (`tabular-nums`) ; **le sérif quitte tout le chrome, l'atelier et les
   titres** ; Source Serif 4 ne survit que dans le CORPS des leçons
   (lecture longue, 62 leçons typographiées pour elle).
3. **Couleur sémantique par matière** — cinq accents (maths, pc, svt,
   philo, si) générés à clarté/chroma égales (poids visuel identique),
   déclinés clair/sombre ; wayfinding uniquement (nav, couvertures,
   chips) ; le sarcelle reste l'accent produit (actions).
4. **Séquence** — coquille + atelier reconstruits d'abord (la tranche
   parfaite), codifiés (DESIGN-BIBLE v2 + STUDIO-SPEC), puis reproduits
   par Antigravity sous portes.

## Ce qui est remplacé, ce qui tient

- **Remplacé** : l'identité chromatique et typographique des ADR 0023
  (« warm editorial » — palette papier chaud, sérif éditorial en titres)
  et la doctrine « la marge extérieure grandit toute seule » déjà retirée
  au commit 1a5a913.
- **Tient, intégralement** : le cœur calme (§0 — zéro gamification,
  zéro autoplay), honest-state (aucun état fabriqué — vérifié dans le
  code : signé-déconnecté il n'existe AUCUNE donnée de progression),
  reduced-motion, prose ≤ 65ch, l'échelle M3 à cinq classes, les jetons
  comme source unique (`tokens.ts`), le state-layer unifié, les portes
  (dom-truth, token-gate) — auxquelles s'ajoute une porte de CONTRASTE
  calculé.

## Conséquences

- Le pivot est une édition de VALEURS dans tokens.ts (les alias ne
  changent pas) + un échange de familles dans layout.tsx + un codemod
  `font-serif → font-display` dans le chrome. dom-truth et token-gate
  suivent sans être modifiés.
- La DESIGN-BIBLE porte bannière « v2 en cours » ; ses sections
  identité (§2 palette, §3 sérif en titres) ne font plus autorité ;
  ses sections discipline restent la loi.
- Deux dépendances au plus seront ajoutées sur toute la refonte
  (`cmdk`, `next-view-transitions` en spike R4).

## Addendum du 2026-09-24 — Geist dessinait « ω » comme « Ω »

La grotesque choisie ici porte un défaut de sa table cmap (Geist 1.7.2, le
paquet `geist`) : **U+03C9 « ω » y est rattaché au glyphe `uni03A9`, celui de
« Ω »**. Toute vitesse angulaire écrite en texte dans le chrome — légendes des
scènes, choix de QCM, étiquettes de misconceptions, titres — s'affichait en
ohm. Vu sur une capture du manège (« à Ω constante »), confirmé en lisant la
table octet par octet et en dessinant les deux caractères : image identique,
chasse identique.

Décision : Geist Sans est déclarée dans `layout.tsx` sur le fichier même du
paquet (`next/font/local`, comme `geist/font/sans` le fait à une ligne près),
avec une plage unicode qui exclut ce seul point de code. « ω » retombe sur la
police de repli, comme θ, φ, α… que Geist n'a pas du tout. Aucune autre
famille, aucun jeton ne change. La porte `glyphes-confondus.mjs` (armée en CI)
dessine chaque caractère du produit dans chaque pile de polices du site rendu
et rougit si deux caractères différents partagent un glyphe ; son essai rouge
charge le fichier Geist BRUT et doit y entendre ω = Ω — le jour où il ne
l'entend plus, la plage peut partir.

Ce que ça dit du choix d'une police, pour la prochaine : **une police se juge
aussi sur ce qu'elle dessine hors de l'alphabet latin que le produit emploie**
— ici le grec des sciences. Le choix de 2026-08 l'a jugée sur le latin.

## Retractions and Corrections

*(néant à la création)*
