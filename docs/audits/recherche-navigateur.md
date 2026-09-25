# Ce que ⌘F trouve dans une leçon — et ce qu'il ne trouve pas

*Mesuré le 2026-09-05. Instrument : `web/scripts/recherche-navigateur.mjs`.*

---

## Pourquoi

Deux affirmations circulaient sans mesure, et toutes deux pèsent sur des
décisions ouvertes.

1. **L'arbitrage « servir tous les chapitres d'un coup »** (HANDOFF) met dans
   la balance ⌘F, l'impression, les liens profonds et le hors-ligne **contre**
   43 000 nœuds et 6 s de peinture. La moitié « ⌘F » n'avait jamais été
   vérifiée.
2. KaTeX rend chaque formule deux fois, dont une copie MathML masquée. Si
   cette copie était trouvable, un élève cherchant « uC » tomberait sur des
   occurrences invisibles.

## Le résultat

| Question | Réponse mesurée |
|---|---|
| Un mot du chapitre OUVERT est-il trouvé ? | **oui** (témoin : sans lui, un « non » ne prouverait rien) |
| Un mot qui n'existe QUE dans un chapitre REPLIÉ ? | **non** — sur `rlc-serie`, 10 chapitres sur 11 sont hors d'atteinte |
| Le texte du MathML masqué de KaTeX ? | **non** — la recherche ne le voit pas ✓ |

**Ce que ça veut dire pour l'élève.** Un élève qui cherche un mot dans sa
leçon avec ⌘F ne cherche que dans le chapitre ouvert. Il conclut que le mot
n'y est pas. C'est un défaut réel, et il est **structurel** : les chapitres
repliés portent `hidden`, et `hidden` retire du rendu — donc de la recherche.

Bonne nouvelle en regard : **l'impression, elle, déplie tout** (mesuré :
11/11 chapitres, `docs/audits/impression.md`). Les deux moitiés de l'argument
ne se valent donc pas.

## Une option nommée, non prise

Le web a exactement la primitive qu'il faut : **`hidden="until-found"`**
(Chrome 102+). Un élément ainsi masqué reste **cherchable** ; à la
correspondance, le navigateur émet `beforematch` et révèle le contenu. Les
navigateurs qui ne le connaissent pas retombent sur `hidden` ordinaire — donc
sur le comportement d'aujourd'hui, sans régression.

**Ce n'est pas fait ici, et délibérément.** Cela touche la machinerie des
chapitres — `ChapterShell`, le rail, les liens profonds, la pagination — qui
est la pièce la plus délicate du produit, et la question « comment les
chapitres sont servis » est un **arbitrage owner explicitement ouvert**. Ce
document lui apporte le fait mesuré et l'option ; il ne décide pas à sa place.

## Ce que la mesure ne dit pas

- `window.find()` partage la machinerie de recherche de texte rendu du
  navigateur, mais **n'est pas** l'interface ⌘F elle-même. L'indication est
  forte ; elle n'est pas une certitude sur toutes les plateformes.
- Rien n'est mesuré sur Firefox ni Safari, dont les moteurs de recherche
  diffèrent — et qui ne connaissent pas `until-found`.
