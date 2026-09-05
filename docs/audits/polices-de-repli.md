# Les caractères que la police du site ne dessine pas

*Mesuré le 2026-09-05. Instrument : `web/scripts/polices-de-repli.mjs`.
Corpus : les 62 leçons + l'accueil + `/atelier`.*

---

## La question

Le site charge Geist et Source Serif 4 avec le sous-ensemble `latin`. Tout
caractère hors de ce sous-ensemble est dessiné par une **fonte de repli du
système** — donc avec d'autres métriques, au milieu d'une phrase. Le point 6
des angles morts nommait le fait sans le mesurer.

**Comment on le sait sans deviner.** Le protocole DevTools expose
`CSS.getPlatformFontsForNode` : il rend les fontes RÉELLEMENT utilisées pour
un nœud et le nombre de glyphes dessinés par chacune. Un nœud qui en mobilise
deux a subi un repli, et l'API dit lequel.

## L'inventaire

Trois familles, et elles n'appellent pas la même réponse :

| Famille | Exemples | Occurrences | Verdict |
|---|---|---:|---|
| **L'ordinal français** | `ᵉ` (U+1D49), dans « 2ᵉ Bac » | 66 | repli sur DejaVu Sans — **se lit très bien** (vérifié à 3×) |
| **L'arabe** | ا ل ي و ن ق م… (leçon de philo) | ~500 | **aucune fonte du site n'a de glyphe arabe** ; le repli est structurel |
| **Les symboles mathématiques écrits en Unicode** | `→` `✓` `ℤ` `ˣ` `∫₀ˣ` `eᵗ²` `F⁻¹` | ~120 | repli sur Liberation Serif / DejaVu Sans — lisible |

## Le verdict : localisé, non défectueux

Les deux cas les plus fréquents ont été **regardés**, capturés à 3× :
« 2ᵉ Bac · Sciences · 26 min de lecture » et « ← → pour naviguer » se lisent
sans qu'on voie la couture. C'est la troisième fenêtre de la campagne qui
trouve le produit **sain** — et, comme les deux autres (zoom 400 %,
hors-ligne), elle vaut d'être écrite : l'instrument existe, l'inventaire
existe, et le jour où l'on choisira une fonte, on saura exactement ce qu'elle
doit couvrir.

**Une réserve, et elle est importante.** La fonte de repli mesurée ici
(DejaVu Sans, Liberation Serif) est celle de CE conteneur Linux. Sur le
téléphone d'un élève, le repli sera Roboto/Noto (Android) ou San Francisco
(iOS) — d'autres métriques, d'autres formes. **Ce qui est stable, c'est
QU'IL Y A repli ; ce qui ne l'est pas, c'est de quoi il a l'air.** Une
capture sur un vrai téléphone reste à faire.

## Ce qui n'est pas corrigé, et pourquoi

- **`ᵉ` pourrait devenir `<sup>e</sup>`** et le repli disparaîtrait. Ce n'est
  pas fait : la mesure dit que le rendu actuel est bon, et `<sup>` change les
  métriques verticales. On ne troque pas un non-défaut contre un risque.
- **Les symboles mathématiques en prose** (`ℤ`, `∫₀ˣ`) ne peuvent pas devenir
  du KaTeX partout : `lib/chapters.ts` **retire volontairement** le LaTeX des
  titres de chapitre (`sansLatex`), donc un `ℤ` de titre doit rester un
  caractère. Le repli y est le prix d'une décision antérieure, pas un oubli.
- **L'arabe** n'a pas de solution sans charger une fonte arabe — un choix de
  design et de poids, donc un arbitrage owner.
