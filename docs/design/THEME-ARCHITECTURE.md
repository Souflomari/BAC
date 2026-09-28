# THEME-ARCHITECTURE — thèmes commutables par l'élève, sur les couches existantes

**Statut :** OWNER-DIRECTED (Day 12, P4). Tokens seulement — aucun build ici.
Exécutable à froid par Sonnet depuis ce document + `globals.css` + TOKENS.md.

## 1. État réel aujourd'hui (vérifié au 07-06)

Deux thèmes (clair/sombre) via la classe **`.dark`** sur `<html>`, posée
par un ThemeToggle + script de boot pré-paint (fix audit externe 5.6) ;
choix persisté, défaut OS. **`data-theme` et `next-themes` n'existent PAS
encore dans le codebase** (grep vérifié) — le contrat ci-dessous est la
cible ; la migration mécanique (classe → attribut + next-themes) est la
première étape du builder.

## 2. Le contrat

- **Attribut :** `<html data-theme="clair|sombre|craie|…">` posé par
  `next-themes` (`attribute="data-theme"`, `defaultTheme="system"`,
  `enableSystem`) ; le script de boot existant est remplacé par celui de
  next-themes (anti-flash équivalent, prouvé). `.dark` reste alias de
  compatibilité pendant UNE release (`[data-theme="sombre"], .dark { … }`),
  puis meurt — dom-truth garde la parité pendant la transition.
- **Règle de cartographie sémantique (LA règle) :** un thème alternatif ne
  redéfinit QUE les valeurs des tokens de base sous son sélecteur
  `[data-theme="x"]`. Il ne touche JAMAIS : les mappings sémantiques dans
  les composants (aucun composant ne lit une couleur brute), les tokens de
  mouvement/espacement/typo, ni les seuils. Si un thème « a besoin » de
  changer un composant, c'est un défaut du thème.
- **Complétude :** un thème est la redéfinition COMPLÈTE du registre §3 —
  pas de redéfinition partielle (les trous héritent silencieusement du
  clair et cassent la cohérence). validate à terme : un lint qui diffe les
  clés du bloc thème contre le registre.
- **Contraste :** chaque thème passe les rangées de contraste dom-truth
  existantes (≥4,5:1 texte, ≥3:1 UI) sur les chemins réels — condition
  d'admission, pas d'objectif.
- **Calme :** un thème change l'ambiance, jamais la hiérarchie ; l'accent
  reste UNE couleur signature ; les sémantiques succès/erreur restent
  sourdes (jamais néon).

## 3. Le registre (les clés qu'un thème DOIT couvrir — noms réels)

Surfaces : `--color-surface-base|raised|overlay|container-lowest|container-low|container|container-high|container-highest`
Texte : `--color-text-primary|secondary|tertiary|on-accent`
Accent : `--color-accent|accent-strong|accent-light|accent-subtle`
Bords : `--color-border-subtle|border-soft`
Sémantiques : `--color-success|success-subtle|on-success|error|error-subtle|on-error|warning|warning-subtle`
Figures : `--figure-surface|ink|ink-soft|grid|accent|energy-C|energy-L|regime-periodic|regime-pseudo|regime-aperiodic`

## 4. Exemple travaillé complet — thème « craie » (ardoise froide, valeurs prêtes)

```css
[data-theme="craie"] {
  /* surfaces — ardoise froide, échelle tonale montante */
  --color-surface-base: #1c2226;
  --color-surface-raised: #232a2f;
  --color-surface-overlay: #2a3238;
  --color-surface-container-lowest: #181d21;
  --color-surface-container-low: #20262b;
  --color-surface-container: #242c31;
  --color-surface-container-high: #2a3339;
  --color-surface-container-highest: #313b42;
  /* texte — craie, jamais blanc pur */
  --color-text-primary: #e8ebe6;    /* ≈13,9:1 sur base */
  --color-text-secondary: #b7bfba;  /* ≈8,1:1 */
  --color-text-tertiary: #8d968f;   /* ≈4,9:1 */
  --color-text-on-accent: #101619;
  /* accent — vert-craie froid, une seule signature */
  --color-accent: #7fc4a6;          /* ≈7,2:1 sur base */
  --color-accent-strong: #9ad4b9;
  --color-accent-light: #5da88a;
  --color-accent-subtle: rgba(127, 196, 166, 0.14);
  /* bords */
  --color-border-subtle: rgba(232, 235, 230, 0.14);
  --color-border-soft: rgba(232, 235, 230, 0.09);
  /* sémantiques — sourdes, refroidies */
  --color-success: #86bf9a;  --color-success-subtle: rgba(134,191,154,.16);
  --color-on-success: #101619;
  --color-error: #d99a94;    --color-error-subtle: rgba(217,154,148,.16);
  --color-on-error: #101619;
  --color-warning: #d6bc8a;  --color-warning-subtle: rgba(214,188,138,.16);
  /* figures — mêmes rôles, encre craie */
  --figure-surface: #232a2f;
  --figure-ink: #e8ebe6;
  --figure-ink-soft: #aab3ad;
  --figure-grid: rgba(232, 235, 230, 0.16);
  --figure-accent: #7fc4a6;
  --figure-energy-C: #8fb8d8;  --figure-energy-L: #d8b48f;
  --figure-regime-periodic: #8fb8d8;
  --figure-regime-pseudo: #7fc4a6;
  --figure-regime-aperiodic: #d99a94;
}
```

Ratios annoncés = calculés sur `#1c2226` ; le builder les REVALIDE par les
rangées dom-truth avant d'exposer le thème (l'annonce n'est pas la preuve).
Le toggle passe de binaire à menu calme (3 entrées max au lancement) ;
choix persisté par next-themes ; `?theme=` de prévisualisation interdit en
production (une seule source d'état).

## Retraits et corrections

*(néant pour l'instant)*
