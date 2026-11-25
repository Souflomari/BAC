/**
 * pilotes-regles — les règles du format de leçon, vérifiées sur chaque pilote.
 *
 * Le parcours (`pilotes-parcours.mjs`) vérifie que la leçon MARCHE. Ce script
 * vérifie qu'elle respecte les règles d'écriture qui font qu'elle ENSEIGNE :
 * celles de `docs/refonte/07-regles-du-format.md` qui se mesurent. Il lit les
 * étapes telles que le navigateur les a (`root.__lecon.STEPS`), parce que
 * certains textes sont des fonctions et que les moteurs importent leurs scènes.
 *
 *   node scripts/pilotes-regles.mjs [--base http://localhost:3000] [--pilote logarithme] [--porte]
 *
 * Deux niveaux :
 *   · RÈGLE  — armée : un écart fait échouer `--porte` ;
 *   · CIBLE  — affichée, jamais bloquante : là où les pilotes eux-mêmes ont
 *     encore du chemin (une cible devient une règle le jour où ils la tiennent).
 */
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const require = createRequire(path.join(WEB, "package.json"));
const { chromium } = require("playwright-core");

const args = process.argv.slice(2);
const val = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const porte = args.includes("--porte");
const PORT = Number(val("--port") ?? 3800 + (process.pid % 150));
const BASE = val("--base") ?? `http://127.0.0.1:${PORT}`;
const PILOTES = val("--pilote") ? [val("--pilote")] : ["logarithme", "radioactivite", "expression-genetique", "exponentielle", "meiose", "transmission", "noyaux", "suites", "dipole-rc", "dipole-rl", "transformations-non-totales", "complexes"];

/** Les seuils. Chacun est tenu par les trois pilotes au jour où il est armé. */
export const SEUILS = {
  phrasesMax: 4, // phrases par étape
  motsMax: 85, // mots par étape, hors formules (cible : 60)
  motsCible: 60,
  fortsMax: 1, // une seule phrase forte par étape
  ratioForme: 1.3, // longueur de la bonne réponse / médiane des fausses
  ecartForme: 12, // … toléré si l'écart reste sous 12 caractères
  suiteSansQuestion: 5, // étapes de suite sans pari ni « Vérifie »
  rappelEntre: [0.3, 0.7], // position du rappel dans la leçon
};

function lireEtapes() {
  const L = document.querySelector("[data-pilote]").__lecon;
  const nu = (h) => String(h ?? "").replace(/\[\[([^|\]]*\|)?([^\]]*)\]\]/g, "$2").replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "x");
  return L.STEPS.map((st, i) => {
    let t = st.text;
    try { if (typeof t === "function") t = t(); } catch { t = []; }
    const phrases = (t || []).map((x) => (typeof x === "string" ? x : x.t));
    const P = st.pari || st.verifie;
    return {
      n: i + 1,
      cle: st.cle,
      phrases: phrases.length,
      mots: phrases.map(nu).join(" ").split(/\s+/).filter(Boolean).length,
      forts: (t || []).filter((x) => x && x.fort).length,
      lignes: (st.deriv || []).length,
      verifie: !!st.verifie,
      opts: P ? P.opts.map((o) => ({ t: nu(o.t), ok: !!o.ok, fb: !!o.fb, indice: !!o.indice })) : null,
    };
  });
}

function juger(etapes) {
  const regles = [], cibles = [];
  const R = (e, m) => regles.push(`étape ${e.n} « ${e.cle} » : ${m}`);
  const C = (e, m) => cibles.push(`étape ${e.n} « ${e.cle} » : ${m}`);
  const cles = new Set();
  let suite = 0;
  for (const e of etapes) {
    if (!e.cle) regles.push(`étape ${e.n} : pas de clé`);
    else if (cles.has(e.cle)) R(e, "clé en double");
    cles.add(e.cle);
    if (e.phrases > SEUILS.phrasesMax) R(e, `${e.phrases} phrases (au plus ${SEUILS.phrasesMax})`);
    if (e.mots > SEUILS.motsMax) R(e, `${e.mots} mots (au plus ${SEUILS.motsMax})`);
    else if (e.mots > SEUILS.motsCible) C(e, `${e.mots} mots (cible ${SEUILS.motsCible})`);
    if (e.forts > SEUILS.fortsMax) R(e, `${e.forts} phrases fortes (une seule)`);
    if (e.opts) {
      suite = 0;
      const quiz = e.opts.some((o) => o.ok);
      if (e.opts.length < 2) R(e, "moins de deux options");
      if (e.opts.some((o) => !o.fb)) R(e, "une option sans retour");
      if (e.opts.some((o) => /aucune idée|je ne sais pas/i.test(o.t))) R(e, "une option « aucune idée » : ce n'est pas un pari");
      if (new Set(e.opts.map((o) => o.t)).size !== e.opts.length) R(e, "deux options identiques");
      if (quiz) {
        if (e.opts.filter((o) => o.ok).length !== 1) R(e, "il faut exactement une bonne réponse");
        if (e.opts.some((o) => !o.ok && !o.indice)) R(e, "une option fausse sans indice pour le second essai");
        const bonne = e.opts.find((o) => o.ok).t.length;
        const fausses = e.opts.filter((o) => !o.ok).map((o) => o.t.length).sort((a, b) => a - b);
        const med = fausses[Math.floor(fausses.length / 2)] || 1;
        if (bonne / med > SEUILS.ratioForme && bonne - med > SEUILS.ecartForme) R(e, `la bonne réponse se devine à sa longueur (${bonne} caractères contre ${med})`);
      }
    } else {
      suite++;
      if (suite === SEUILS.suiteSansQuestion + 1) R(e, `plus de ${SEUILS.suiteSansQuestion} étapes de suite sans question`);
      if (e.lignes >= 3) C(e, `dérivation de ${e.lignes} lignes lue sans ligne choisie`);
    }
  }
  const rappel = etapes.find((e) => e.cle === "rappel");
  if (!rappel || !rappel.verifie) regles.push("pas d'étape « rappel » avec une question « Vérifie »");
  else {
    const pos = rappel.n / etapes.length;
    if (pos < SEUILS.rappelEntre[0] || pos > SEUILS.rappelEntre[1]) regles.push(`le rappel est à ${Math.round(pos * 100)} % de la leçon (attendu au milieu)`);
  }
  return { regles, cibles };
}

async function attendre(url, essais = 60) {
  for (let i = 0; i < essais; i++) {
    try { const r = await fetch(url); if (r.ok) return true; } catch { /* pas encore */ }
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

let serveur = null;
if (!val("--base")) {
  serveur = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: WEB, stdio: "ignore", detached: true });
  if (!(await attendre(`${BASE}/pilote/${PILOTES[0]}`))) {
    console.error("pilotes-regles : `next start` n'a pas répondu (le build existe-t-il ?).");
    try { process.kill(-serveur.pid); } catch { /* déjà parti */ }
    process.exit(2);
  }
}

let ecarts = 0;
const nav = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH ?? "/opt/pw-browsers/chromium" }).catch(() => chromium.launch());
try {
  for (const pil of PILOTES) {
    const page = await nav.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(`${BASE}/pilote/${pil}`, { waitUntil: "networkidle" });
    await page.waitForFunction(() => document.querySelector("[data-pilote]")?.__lecon, null, { timeout: 30000 });
    const etapes = await page.evaluate(lireEtapes);
    await page.close();
    const { regles, cibles } = juger(etapes);
    ecarts += regles.length;
    console.log(`${pil} : ${etapes.length} étapes, ${regles.length} écart(s) aux règles, ${cibles.length} cible(s) non atteinte(s)`);
    for (const r of regles) console.log(`  ✗ ${r}`);
    for (const c of cibles) console.log(`  · ${c}`);
  }
} finally {
  await nav.close();
  if (serveur) { try { process.kill(-serveur.pid); } catch { /* déjà parti */ } }
}
console.log(ecarts ? `pilotes-regles : ${ecarts} écart(s)` : "pilotes-regles : les règles armées tiennent ✓");
if (porte && ecarts) process.exit(1);
