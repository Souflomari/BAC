#!/usr/bin/env node
/**
 * contrast-gate.mjs — la porte de CONTRASTE (refonte Studio, ADR 0030).
 *
 * Pourquoi elle existe : la palette Studio a été conçue en OKLCH avec
 * chaque paire vérifiée à la main le jour du pivot. Une vérification
 * faite une fois est une anecdote ; cette porte la rend PERMANENTE —
 * quiconque retouche une valeur de tokens.ts repasse toutes les paires,
 * dans les deux thèmes, ou casse le build. C'est la version chromatique
 * de la leçon des portes : une exigence sans mécanisme finit ignorée.
 *
 * Vérifie (WCAG 2.1, luminance relative) :
 *   · l'encre (primary/secondary/tertiary) sur toile, carte et container-
 *     highest — 4,5:1 ;
 *   · accent, sémantiques (success/warning/error) en TEXTE sur toile et
 *     carte — 4,5:1 ; leurs `on-*` sur leur fond plein — 4,5:1 ;
 *   · les cinq accents matière sur carte + leur `on` — 4,5:1 ;
 *   · border-field sur toile et carte — 3:1 (WCAG 1.4.11) ;
 *   · l'encre et les rôles de figure sur figure-surface — 4,5:1.
 * Exempts, par design : *-subtle (lavis de fond), accent-light
 * (décoratif — ne DOIT jamais porter de texte, c'est documenté à côté de
 * sa définition).
 *
 * Usage : node scripts/contrast-gate.mjs   (ou via dom-truth Gate 0)
 */

import path from "path";
import { fileURLToPath } from "url";
import jitiFactory from "jiti";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const jiti = jitiFactory(WEB, { interopDefault: true, esmResolve: true });
const { themes } = jiti(path.join(WEB, "src/lib/tokens.ts"));

function resoudre(vars, nom, profondeur = 0) {
  const v = vars[nom];
  if (v == null) throw new Error(`jeton absent : ${nom}`);
  const m = v.match(/^var\((--[a-z0-9-]+)\)$/i);
  if (m) {
    if (profondeur > 4) throw new Error(`référence circulaire : ${nom}`);
    return resoudre(vars, m[1], profondeur + 1);
  }
  return v;
}

function rgb(hex) {
  const h = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) throw new Error(`pas un hex : ${hex}`);
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}

function luminance([r, g, b]) {
  const f = (c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contraste(a, b) {
  const [h, l] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (h + 0.05) / (l + 0.05);
}

const MATIERES = ["maths", "pc", "svt", "philo", "si"];

function pairesPourTheme(vars) {
  const p = [];
  const texte = ["--color-text-primary", "--color-text-secondary", "--color-text-tertiary"];
  const fonds = ["--color-surface-base", "--color-surface-raised", "--color-surface-container-highest"];
  for (const t of texte) for (const f of fonds) p.push([t, f, 4.5]);
  for (const c of ["--color-accent", "--color-success", "--color-warning", "--color-error"]) {
    p.push([c, "--color-surface-base", 4.5]);
    p.push([c, "--color-surface-raised", 4.5]);
  }
  p.push(["--color-text-on-accent", "--color-accent", 4.5]);
  p.push(["--color-on-success", "--color-success", 4.5]);
  p.push(["--color-on-error", "--color-error", 4.5]);
  for (const s of MATIERES) {
    p.push([`--subject-${s}`, "--color-surface-raised", 4.5]);
    p.push([`--subject-${s}-on`, `--subject-${s}`, 4.5]);
  }
  p.push(["--color-border-field", "--color-surface-base", 3.0]);
  p.push(["--color-border-field", "--color-surface-raised", 3.0]);
  for (const f of [
    "--figure-ink", "--figure-ink-soft", "--figure-accent",
    "--figure-energy-C", "--figure-energy-L",
    "--figure-regime-periodic", "--figure-regime-pseudo", "--figure-regime-aperiodic",
  ]) p.push([f, "--figure-surface", 4.5]);
  return p;
}

export function scanContrast() {
  const echecs = [];
  let total = 0;
  for (const [nomTheme, theme] of Object.entries(themes)) {
    for (const [avant, arriere, seuil] of pairesPourTheme(theme.vars)) {
      total++;
      const r = contraste(
        rgb(resoudre(theme.vars, avant)),
        rgb(resoudre(theme.vars, arriere))
      );
      if (r < seuil) {
        echecs.push({ theme: nomTheme, avant, arriere, seuil, mesure: Math.round(r * 100) / 100 });
      }
    }
  }
  return { total, echecs };
}

const lanceDirectement = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (lanceDirectement) {
  const { total, echecs } = scanContrast();
  if (echecs.length) {
    console.error(`━━ contrast-gate : ${echecs.length}/${total} paire(s) sous le seuil ━━`);
    for (const e of echecs) {
      console.error(`  ✗ [${e.theme}] ${e.avant} sur ${e.arriere} : ${e.mesure} (exigé ${e.seuil})`);
    }
    process.exit(1);
  }
  console.log(`contrast-gate : ${total} paires, les deux thèmes — tout passe ✓`);
}
