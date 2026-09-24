#!/usr/bin/env node
/**
 * figures-manipulables.mjs — chaque figure manipulable du corpus fait-elle, AU
 * RENDU, ce que son module dit qu'elle fait ?
 *
 * POURQUOI (2026-09-24). Une figure manipulable (INTERACTIVE-FIGURE-SPEC) est
 * faite de trois morceaux écrits séparément : un SVG qui porte des `id`, un
 * `.interactive.json` qui LIE ces ids à des clés de calcul, un module `.ts` qui
 * calcule. `validate-content` vérifie que les clés existent ; `dom-truth` porte
 * cinq balayages ÉCRITS À LA MAIN, un par figure pilote. Une sixième figure
 * n'était vue par rien : son curseur pouvait ne rien déplacer (un id mal
 * orthographié ne casse rien, il ne fait rien), sa lecture pouvait dire autre
 * chose que le dessin. Cette porte les prend TOUTES, celles d'aujourd'hui et
 * celles de demain, en lisant l'inventaire dans `content/`.
 *
 * CE QU'ELLE MESURE, pour chaque `.interactive.json`, sur le rendu réel
 * (next start, Chromium, mouvement réduit pour lire des valeurs posées et non
 * des interpolations) :
 *   · verrou — le curseur n'existe pas avant la dernière étape, et existe à
 *     la dernière (§1 de la spec : jamais de manipulation qui saute l'étapage) ;
 *   · liaisons — à quatre positions du curseur (les deux bornes, la valeur
 *     initiale, une valeur de biais), CHAQUE cible liée porte exactement ce que
 *     le module calcule (`d`, `cx/cy` ou `x/y`, ou le texte) ;
 *   · lecture — la ligne lue par le lecteur d'écran est le gabarit rempli ;
 *   · cible — le curseur mesure au moins 44 px de haut (WCAG 2.5.5 ; le
 *     plancher du dépôt est 48) ;
 *   · physique — pour les figures qui l'ont, une SECONDE voie écrite ici, sans
 *     rien importer du produit, lit les nombres de la lecture et les recalcule
 *     (le module seul ne prouve que le câblage, pas la physique) ;
 *   · console — aucune erreur.
 *
 * Les valeurs ATTENDUES des liaisons viennent du MÊME module que l'application
 * importe (comme dom-truth) : cette famille prouve le câblage, pas le calcul.
 * C'est la famille `physique` qui juge le calcul — elle ne couvre que les
 * figures qu'elle nomme, et elle le dit.
 *
 * QUATRE VERDICTS (ADR 0034) ; `--essai-rouge` retourne l'attente de chaque
 * famille ; un inventaire vide est MUET (sortie 3), pas vert.
 *
 *   node scripts/figures-manipulables.mjs --porte
 *   node scripts/figures-manipulables.mjs --essai-rouge
 */
import { chromium } from "playwright-core";
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import jitiFactory from "jiti";

const ICI = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.join(ICI, "..");
const REPO = path.join(WEB, "..");
const ESSAI = process.argv.includes("--essai-rouge");
const PORT = Number(process.env.PORT_FIGURES ?? 3700 + (process.pid % 90));
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;

// ── L'inventaire : ce que content/ déclare, pas une liste écrite ici ─────────
const figures = [];
for (const m of readdirSync(path.join(REPO, "content")).sort()) {
  const dm = path.join(REPO, "content", m);
  if (!statSync(dm).isDirectory()) continue;
  for (const n of readdirSync(dm).sort()) {
    const media = path.join(dm, n, "media");
    const lecon = path.join(dm, n, "lesson.md");
    if (!existsSync(media) || !existsSync(lecon)) continue;
    for (const f of readdirSync(media).filter((x) => x.endsWith(".interactive.json")).sort()) {
      const slug = f.slice(0, -".interactive.json".length);
      const cfg = JSON.parse(readFileSync(path.join(media, f), "utf-8"));
      const etages = JSON.parse(readFileSync(path.join(media, `${slug}.stages.json`), "utf-8"));
      const lignes = readFileSync(lecon, "utf-8").split("\n");
      const i = lignes.findIndex((l) => l.includes(`[[figure:${slug}]]`));
      const chapitre = i < 0 ? 0 : lignes.slice(0, i + 1).filter((l) => /^## /.test(l)).length;
      figures.push({ matiere: m, notion: n, slug, cfg, nEtapes: etages.stages.length, chapitre });
    }
  }
}
if (!figures.length) {
  console.error("figures-manipulables : aucun .interactive.json dans content/ — rien à mesurer (MUET).");
  process.exit(3);
}

// ── Les modules, tels que l'application les importe ─────────────────────────
const jiti = jitiFactory(fileURLToPath(import.meta.url), { interopDefault: true, alias: { "@": path.join(WEB, "src") } });
function modele(slug) {
  try {
    const mod = jiti(path.join(WEB, "src/lib/interactive-figures", `${slug}.ts`));
    return mod[slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())];
  } catch {
    return undefined; // pas de module : la figure est rendue sans manipulation — la porte le dit
  }
}
/** Le gabarit rempli — le contrat d'InteractiveControl, réécrit ici. */
function remplir(gabarit, v, md) {
  return gabarit.replace(/\{(\w+)\}/g, (tout, jeton) => {
    if (jeton === "value") return md.formatValue(v);
    if (jeton === "slope" && md.fPrime) return md.formatValue(md.fPrime(v));
    const r = md.recompute[jeton]?.(v);
    return r && r.kind === "text" ? r.value : tout;
  });
}

// ── La SECONDE voie : la physique, écrite ici, pour les figures qui la déclarent ──
//  Chaque entrée lit des nombres DANS LA LECTURE et les recalcule depuis les
//  constantes de la leçon ; rien du produit n'est importé.
const nombres = (t) => [...(t ?? "").replace(/ | /g, " ").matchAll(/-?\d+(?:,\d+)?/g)].map((m) => parseFloat(m[0].replace(",", ".")));
const PHYSIQUE = {
  // pc/reactions-acido-basiques, R8 : le couple CH3COOH/CH3COO⁻, pKA = 4,8 (la
  // leçon). %A⁻ = 100/(1 + 10^(pKA − pH)). Et ce que la leçon RÉFUTE juste
  // avant la figure : « la forme dominante a déjà tout pris » — aucun des deux
  // pourcentages ne s'affiche 0 ni 100.
  "distribution-curseur-pH": (pH, [phLu, ah, a], lecture) => {
    const attenduA = 100 / (1 + 10 ** (4.8 - pH));
    const d = (lecture.match(/%AH = [\d]+,?(\d*)/)?.[1] ?? "").length;
    const tol = 0.5 * 10 ** -d + 1e-9;
    const ok = Math.abs(phLu - pH) < 0.051 && Math.abs(a - attenduA) <= tol && Math.abs(ah - (100 - attenduA)) <= tol
      && Math.abs(a + ah - 100) <= 10 ** -d + 1e-9 && a > 0 && ah > 0 && a < 100 && ah < 100;
    return { ok, detail: `%A⁻ lu ${a} (attendu ${attenduA.toPrecision(4)} à ${tol.toPrecision(1)} près), %AH lu ${ah} ; somme ${Math.round((a + ah) * 1e6) / 1e6} ; ni 0 ni 100` };
  },
  // pc/chute-mouvements-plans, la méthode d'Euler : la bille de R7/R8
  // (m = 0,20 kg, k = 2,0 kg/s, g = 9,8), v₀ = 0, le schéma de la leçon
  // v_{i+1} = v_i + (g − (k/m)·v_i)·Δt jusqu'à t = 0,30 s ; la « vraie » valeur
  // 0,98·(1 − e^(−3)). Et ce que CH-EU-1 croit : Euler donne la valeur exacte —
  // l'écart ne s'annule jamais, il se resserre avec Δt.
  "euler-taille-de-pas": (dt, [dtLu, euler, vraie, ecart]) => {
    let v = 0;
    const n = Math.round(0.3 / dt);
    for (let i = 0; i < n; i++) v += (9.8 - (2.0 / 0.2) * v) * dt;
    const vv = 0.98 * (1 - Math.exp(-0.3 / 0.1));
    const ok = Math.abs(dtLu - dt) < 1e-9 && Math.abs(euler - v) <= 0.0006 && Math.abs(vraie - vv) <= 0.0006 && Math.abs(ecart - (v - vv)) <= 0.0011 && ecart > 0;
    return { ok, detail: `Euler lu ${euler} (recalculé ${v.toFixed(4)}), vraie lue ${vraie} (${vv.toFixed(4)}), écart lu ${ecart} (${(v - vv).toFixed(4)}) — jamais nul` };
  },
  // pc/chute-mouvements-plans, R7 : τ = m/k et v_ℓ = mg/k, k = 2,0 kg/s, g = 9,8
  // (les deux relations de la leçon, et elles seules — v(t) n'y est pas dérivée).
  "sandbox-chute-frottement": (m, [mLu, tau, vlim]) => {
    const ok = Math.abs(mLu - m) < 1e-9 && Math.abs(tau - m / 2.0) <= 0.0051 && Math.abs(vlim - (m * 9.8) / 2.0) <= 0.0051;
    return { ok, detail: `τ lu ${tau} (m/k = ${(m / 2).toFixed(3)}), v_ℓ lue ${vlim} (mg/k = ${((m * 9.8) / 2).toFixed(3)})` };
  },
};

// ── Serveur ────────────────────────────────────────────────────────────────
let serveur = null;
if (!process.env.BASE) {
  const { spawn } = await import("node:child_process");
  serveur = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: WEB, stdio: "ignore", detached: true });
  let vivant = false;
  for (let i = 0; i < 60; i++) {
    try { await fetch(BASE + "/"); vivant = true; break; } catch { await new Promise((r) => setTimeout(r, 1000)); }
  }
  if (!vivant) { console.error("figures-manipulables : `next start` n'a pas répondu. Build absent ?"); try { process.kill(-serveur.pid); } catch {} process.exit(1); }
}
const arreter = () => { if (serveur?.pid) { try { process.kill(-serveur.pid); } catch {} } };
process.on("exit", arreter);
process.on("SIGINT", () => { arreter(); process.exit(130); });

const nav = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
const resultats = [];
const noter = (famille, ok, detail) => resultats.push({ famille, ok: ESSAI ? !ok : !!ok, detail });
const erreurs = [];

for (const fig of figures) {
  const ou = `${fig.matiere}/${fig.notion} · ${fig.slug}`;
  const md = modele(fig.slug);
  if (!md) { noter("liaisons", false, `${ou} : aucun module exporté sous le nom attendu`); continue; }
  const URL = `${BASE}/notions/${fig.matiere}/${fig.notion}?chapitre=${fig.chapitre}`;
  const FIG = `[data-figure='${fig.slug}']`;
  const ouvrir = async (reduit) => {
    const ctx = await nav.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1, reducedMotion: reduit ? "reduce" : "no-preference" });
    const page = await ctx.newPage();
    page.setDefaultTimeout(15000);
    page.on("pageerror", (e) => erreurs.push(`${ou} — pageerror : ${e.message}`));
    page.on("console", (m) => { if (m.type() === "error") erreurs.push(`${ou} — console : ${m.text()}`); });
    await page.goto(URL, { waitUntil: "load", timeout: 60000 });
    await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
    const figure = page.locator(FIG).first();
    await figure.scrollIntoViewIfNeeded();
    return { ctx, page, figure, curseur: figure.locator("input[type=range]") };
  };
  // ── verrou, en mouvement normal : rien avant la dernière étape ──
  //  (Sous mouvement réduit, StagedFigure révèle tout d'un coup et offre la
  //  manipulation d'emblée — c'est son contrat, écrit dans son en-tête ; la
  //  porte le vérifie aussi, plus bas.)
  {
    const { ctx, figure, curseur, page } = await ouvrir(false);
    try {
      const avant = [];
      for (let e = 1; e < fig.nEtapes; e++) {
        avant.push(await curseur.count());
        // un clic PROGRAMMÉ : cette porte juge l'étapage et les liaisons ; le geste
        // (pointeur, clavier, recouvrement par l'en-tête collant) est l'affaire
        // de dom-truth et des portes d'ergonomie
        await figure.locator("button[aria-label='Étape suivante']").evaluate((btn) => btn.click());
        await page.waitForTimeout(150);
      }
      const aLaFin = await curseur.count();
      noter("verrou", avant.every((n) => n === 0) && aLaFin === 1, `${ou} : curseur aux étapes 1–${fig.nEtapes - 1} : [${avant.join(",")}] ; à l'étape ${fig.nEtapes} : ${aLaFin}`);
    } catch (e) {
      noter("parcours", false, `${ou} (étapes) : ${String(e?.message ?? e).split("\n")[0]}`);
    } finally {
      await ctx.close();
    }
  }
  // ── le reste sous mouvement réduit : des valeurs POSÉES, pas des interpolations ──
  const { ctx, page, figure, curseur } = await ouvrir(true);
  try {
    const presents = await curseur.count();
    noter("verrou", presents === 1, `${ou}, mouvement réduit : figure révélée d'un coup, curseur présent d'emblée (${presents})`);
    if (!presents) continue;
    // ── cible ──
    const h = await curseur.evaluate((el) => el.getBoundingClientRect().height);
    noter("cible", h >= 44, `${ou} : le curseur mesure ${Math.round(h)} px de haut (≥ 44)`);
    // ── liaisons et lecture, à quatre positions ──
    const [a, b] = fig.cfg.control.domain;
    const pas = fig.cfg.control.step;
    const cale = (x) => Math.min(b, Math.max(a, a + Math.round((x - a) / pas) * pas));
    const valeurs = [...new Set([a, fig.cfg.control.initial, cale(a + 0.37 * (b - a)), b].map((x) => Number(x.toFixed(10))))];
    for (const v of valeurs) {
      await curseur.evaluate((el, val) => {
        const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
        set.call(el, String(val));
        el.dispatchEvent(new Event("input", { bubbles: true }));
      }, v);
      await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
      await page.waitForTimeout(60);
      const fautes = [];
      for (const lien of fig.cfg.bindings) {
        const attendu = md.recompute[lien.recompute]?.(v);
        if (!attendu) { fautes.push(`${lien.recompute} : clé absente du module`); continue; }
        const lu = await figure.evaluate((el, { sel, kind }) => {
          const t = el.querySelector(`svg ${sel}`) ?? el.querySelector(sel);
          if (!t) return null;
          if (kind === "path") return { d: t.getAttribute("d") };
          if (kind === "point") return t.tagName === "circle" ? { x: t.getAttribute("cx"), y: t.getAttribute("cy") } : { x: t.getAttribute("x"), y: t.getAttribute("y") };
          return { value: t.textContent };
        }, { sel: lien.target, kind: attendu.kind });
        if (!lu) { fautes.push(`${lien.target} : introuvable dans le SVG`); continue; }
        const ok =
          attendu.kind === "path" ? lu.d === attendu.d
          : attendu.kind === "point" ? Math.abs(parseFloat(lu.x) - attendu.x) < 0.01 && Math.abs(parseFloat(lu.y) - attendu.y) < 0.01
          : lu.value === attendu.value;
        if (!ok) fautes.push(`${lien.target} ← ${lien.recompute} : lu ${JSON.stringify(lu).slice(0, 70)}, attendu ${JSON.stringify(attendu).slice(0, 70)}`);
      }
      noter("liaisons", fautes.length === 0, `${ou}, à ${md.formatValue(v)} : ${fig.cfg.bindings.length} liaison(s)${fautes.length ? ` — ${fautes.join(" ; ")}` : " toutes posées comme le module le calcule"}`);
      if (fig.cfg.readoutTemplate) {
        const lecture = ((await figure.locator("[aria-label='Manipuler la figure'] p[aria-live]").textContent().catch(() => "")) ?? "").trim();
        const attendue = remplir(fig.cfg.readoutTemplate, v, md);
        noter("lecture", lecture === attendue, `${ou}, à ${md.formatValue(v)} : « ${lecture} »${lecture === attendue ? "" : ` (attendu « ${attendue} »)`}`);
        const phys = PHYSIQUE[fig.slug];
        if (phys) {
          const r = phys(v, nombres(lecture), lecture);
          noter("physique", r.ok, `${ou}, à ${md.formatValue(v)} : ${r.detail}`);
        }
      }
    }
  } catch (e) {
    noter("parcours", false, `${ou} : ${String(e?.message ?? e).split("\n")[0]}`);
  } finally {
    await ctx.close();
  }
}
noter("console", erreurs.length === 0, erreurs.length ? erreurs.slice(0, 3).join(" | ") : "aucune erreur");
await nav.close();

// ── Verdict ──
const sans = figures.filter((f) => !PHYSIQUE[f.slug]).map((f) => f.slug);
console.log(`\n${ESSAI ? "ESSAI ROUGE — " : ""}figures-manipulables : ${figures.length} figure(s) manipulable(s) dans content/`);
for (const r of resultats) console.log(`  ${r.ok ? "·" : "✘"} [${r.famille}] ${r.detail}`);
console.log(`\n  PORTÉE — la famille « physique » ne juge que les figures qu'elle nomme (${Object.keys(PHYSIQUE).length}) ; pour les autres (${sans.join(", ") || "aucune"}), la porte prouve le câblage, pas le calcul.`);
if (ESSAI) {
  const visees = ["verrou", "cible", "liaisons", "lecture", ...(Object.keys(PHYSIQUE).length ? ["physique"] : [])];
  const crient = visees.filter((f) => resultats.some((r) => r.famille === f && !r.ok));
  console.log(`\n  familles sabotées qui crient : ${crient.length}/${visees.length} (${crient.join(", ")})`);
  const muettes = visees.filter((f) => !crient.includes(f));
  if (muettes.length) { console.error(`  ✘ reste(nt) VERTE(S) : ${muettes.join(", ")} — cette partie de la porte ne sait pas rougir.`); process.exit(1); }
  console.log("  ✔ chaque famille sabotée rougit.");
  process.exit(0);
}
const rouges = resultats.filter((r) => !r.ok);
const familles = new Set(resultats.map((r) => r.famille)).size;
console.log(rouges.length ? `\nROUGE — ${rouges.length} manquement(s) sur ${resultats.length} mesures, ${familles} familles.` : `\nVERT — ${resultats.length} mesures, ${familles} familles.`);
process.exit(rouges.length ? 1 : 0);
