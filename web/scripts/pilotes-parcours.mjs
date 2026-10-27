/**
 * pilotes-parcours — parcourt chaque leçon pilote d'un bout à l'autre, dans un
 * vrai navigateur, comme le ferait un élève pressé.
 *
 *   node scripts/pilotes-parcours.mjs [--base http://localhost:3000]   (sans --base : lance `next start` sur le build)
 *        [--pilote logarithme] [--captures dossier] [--ecran 390x844] [--port 3947] [--porte]
 *        [--sombre] [--texte dossier]   (thème sombre ; texte intégral de chaque étape, pour relecture)
 *
 * À chaque étape : répond à la question (première option), déroule les lignes
 * de calcul une à une, fait le geste demandé (bouton du panneau) quand
 * « Suivant » l'attend, puis avance. Relève :
 *   - les erreurs de la page (exceptions, console.error) ;
 *   - les formules que KaTeX n'a pas su rendre ;
 *   - une phrase restée cachée après l'animation ;
 *   - un « Suivant » bloqué sans geste possible ;
 *   - (pour information) les étapes dont le texte déborde du panneau, et
 *     celles qui laissent plus des deux tiers du panneau vides — le retour
 *     du propriétaire du 2026-10-26 sur le « trop d'espace en dessous ».
 * Le mouvement est réduit : les animations se posent dans leur état final.
 * --porte : code de sortie 1 au premier défaut (pas pour les informations).
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";
import { avecBanc } from "./lib/banc-navigateur.mjs";

const args = process.argv.slice(2);
const opt = (k, d) => {
  const i = args.indexOf(k);
  return i >= 0 ? args[i + 1] : d;
};
let BASE = opt("--base", null);
const CAPTURES = opt("--captures", null);
const SEUL = opt("--pilote", null);
const PORTE = args.includes("--porte");
const SOMBRE = args.includes("--sombre");
const TEXTE = opt("--texte", null);
const [LARGEUR, HAUTEUR] = opt("--ecran", "1280x800").split("x").map(Number);
const PILOTES = ["logarithme", "radioactivite", "expression-genetique"].filter((p) => !SEUL || p === SEUL);

if (!BASE) {
  const PORT = Number(opt("--port", "3947"));
  BASE = `http://127.0.0.1:${PORT}`;
  const { spawn } = await import("node:child_process");
  const WEB = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
  const serveur = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: WEB, stdio: "ignore", detached: true });
  const arreter = () => {
    try {
      process.kill(-serveur.pid);
    } catch {}
  };
  process.on("exit", arreter);
  process.on("SIGINT", () => {
    arreter();
    process.exit(130);
  });
  let vivant = false;
  for (let i = 0; i < 60 && !vivant; i++) {
    try {
      vivant = (await fetch(`${BASE}/pilote/logarithme`, { signal: AbortSignal.timeout(2000) })).ok;
    } catch {
      /* pas encore prêt */
    }
    if (!vivant) await new Promise((r) => setTimeout(r, 1000));
  }
  if (!vivant) {
    console.error("pilotes-parcours : `next start` n'a pas répondu.");
    process.exit(1);
  }
}

const navigateur = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium",
  args: avecBanc(),
});
const defauts = [];
const infos = [];

for (const nom of PILOTES) {
  const page = await navigateur.newPage({ viewport: { width: LARGEUR, height: HAUTEUR }, reducedMotion: "reduce", colorScheme: SOMBRE ? "dark" : "light" });
  const transcription = [];
  const transcrire = async (i) => {
    if (!TEXTE) return;
    const t = await page.evaluate(() => {
      const vu = new Set();
      const scene = [...document.querySelectorAll("[data-pilote-scene] .scene.on text")]
        .filter((n) => Number(getComputedStyle(n).opacity) > 0.05 && n.closest("g")?.style.opacity !== "0")
        .map((n) => n.textContent.trim())
        .filter((x) => x && !vu.has(x) && vu.add(x));
      return { k: document.querySelector("#kicker").textContent, b: document.querySelector("#body").innerText.trim(), scene };
    });
    transcription.push(`## Étape ${i} — ${t.k}\n\n${t.b}\n\n*Scène :* ${t.scene.join(" · ")}\n`);
  };
  const erreurs = [];
  page.on("pageerror", (e) => erreurs.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") erreurs.push(m.text());
  });
  await page.goto(`${BASE}/pilote/${nom}`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => /étape 1 \//.test(document.querySelector("#count")?.textContent || ""));
  const total = Number((await page.textContent("#count")).match(/\/ (\d+)/)[1]);
  if (CAPTURES) fs.mkdirSync(path.join(CAPTURES, nom), { recursive: true });

  // la structure de la leçon (V3), lue dans le script monté par le noyau
  const st = await page.evaluate(() => {
    const L = document.querySelector("[data-pilote]").__lecon;
    if (!L) return null;
    const geste = (x) => !!(x.pari || x.ctl || x.need);
    let suite = 0;
    const longues = [];
    L.STEPS.forEach((x, i) => {
      suite = geste(x) ? 0 : suite + 1;
      if (suite === 6) longues.push(i + 1);
    });
    return {
      sansIndice: L.STEPS.flatMap((x, i) =>
        x.pari && x.pari.opts.some((o) => o.ok) ? x.pari.opts.filter((o) => !o.ok && !o.indice).map(() => i + 1) : [],
      ),
      sansRetour: L.STEPS.flatMap((x, i) => (x.pari ? x.pari.opts.filter((o) => !o.fb).map(() => i + 1) : [])),
      plusieursJustes: L.STEPS.flatMap((x, i) => (x.pari && x.pari.opts.filter((o) => o.ok).length > 1 ? [i + 1] : [])),
      nomsLongs: L.BEATS.map((b) => b.court || b.name).filter((n) => n.length > 10),
      longues,
    };
  });
  if (!st) defauts.push(`${nom} : le noyau n'expose pas la leçon (root.__lecon)`);
  else {
    const uniq = (a) => [...new Set(a)];
    if (st.sansIndice.length) defauts.push(`${nom} : option fausse sans indice (second essai) aux étapes ${uniq(st.sansIndice).join(", ")}`);
    if (st.sansRetour.length) defauts.push(`${nom} : option sans explication aux étapes ${uniq(st.sansRetour).join(", ")}`);
    if (st.plusieursJustes.length) defauts.push(`${nom} : plusieurs bonnes réponses aux étapes ${st.plusieursJustes.join(", ")}`);
    if (st.nomsLongs.length) defauts.push(`${nom} : nom de partie trop long pour la barre (${st.nomsLongs.join(", ")})`);
    if (st.longues.length) infos.push(`${nom} : six étapes de suite sans pari, question ni geste, jusqu'aux étapes ${st.longues.join(", ")}`);
  }

  const vues = new Set();
  const debordent = [];
  const vides = [];
  let motTeste = false;
  let garde = 0;
  while (garde++ < total * 60) {
    await page.waitForTimeout(60);
    const e = await page.evaluate(() => {
      const nx = document.querySelector("#next");
      const sc = document.querySelector("#script");
      const nav = sc.querySelector(".nav");
      const body = document.querySelector("#body");
      return {
        i: Number(document.querySelector("#count").textContent.match(/étape (\d+)/)[1]),
        dis: nx.disabled,
        lab: nx.textContent,
        opts: document.querySelectorAll("#body .opt:not([disabled])").length,
        repondu: !!document.querySelector("#body .opt.sel, #body .opt.ok, #body .opt.ko"),
        gestes: document.querySelectorAll("#body .ctl-btn:not([disabled])").length,
        cachees: document.querySelectorAll("#body .say.later").length,
        katex: document.querySelectorAll("#body .katex-error").length,
        deborde: sc.scrollHeight > sc.clientHeight + 2,
        rempli: body.scrollHeight / Math.max(1, sc.clientHeight - nav.offsetHeight - 60),
        mots: document.querySelectorAll("#body .mot").length,
        lignesCachees: document.querySelectorAll("#body .deriv li.cache").length,
      };
    });
    const premiereFois = !vues.has(e.i);
    vues.add(e.i);
    if (premiereFois) {
      if (e.cachees) {
        await page.waitForTimeout(400);
        const encore = await page.evaluate(() => document.querySelectorAll("#body .say.later").length);
        if (encore) defauts.push(`${nom} étape ${e.i} : ${encore} phrase(s) restée(s) cachée(s)`);
      }
      if (e.katex) defauts.push(`${nom} étape ${e.i} : ${e.katex} formule(s) non rendue(s) par KaTeX`);
      if (e.mots && !motTeste) {
        motTeste = true;
        await page.click("#body .mot");
        const carte = await page.$("#motz .mot-carte");
        if (!carte) defauts.push(`${nom} étape ${e.i} : le mot cliqué n'ouvre pas de fiche`);
        else await page.click("#motz .mot-x");
      }
    }
    if (e.lab.startsWith("Recommencer")) {
      if (e.deborde) debordent.push(e.i);
      await transcrire(e.i);
      if (CAPTURES) await page.screenshot({ path: path.join(CAPTURES, nom, `etape-${String(e.i).padStart(2, "0")}.png`) });
      break;
    }
    if (e.dis) {
      // un pari, une question, ou le second essai d'une question
      if (e.opts && (!e.repondu || e.lab.startsWith("Essaie"))) {
        await page.click("#body .opt:not([disabled])");
        continue;
      }
      if (e.gestes) {
        await page.click("#body .ctl-btn:not([disabled])");
        continue;
      }
      defauts.push(`${nom} étape ${e.i} : « Suivant » bloqué sans geste possible (${e.lab.trim()})`);
      break;
    }
    if (e.lab.startsWith("Ligne suivante")) {
      await page.click("#next");
      continue;
    }
    if (e.lignesCachees) {
      defauts.push(`${nom} étape ${e.i} : ${e.lignesCachees} ligne(s) de calcul jamais montrée(s)`);
    }
    // l'étape est complète : on la mesure, on la capture, on avance
    if (e.deborde) debordent.push(e.i);
    if (e.rempli < 0.34) vides.push(e.i);
    if (CAPTURES) await page.screenshot({ path: path.join(CAPTURES, nom, `etape-${String(e.i).padStart(2, "0")}.png`) });
    await transcrire(e.i);
    await page.click("#next");
  }
  if (TEXTE) {
    fs.mkdirSync(TEXTE, { recursive: true });
    fs.writeFileSync(path.join(TEXTE, `${nom}.md`), `# ${nom} — texte intégral, étape par étape\n\n${transcription.join("\n")}`);
  }
  for (const m of erreurs.splice(0)) defauts.push(`${nom} : erreur de la page — ${m}`);
  if (vues.size !== total) defauts.push(`${nom} : ${vues.size} étape(s) vue(s) sur ${total}`);
  console.log(`${nom} : ${vues.size} / ${total} étapes parcourues, ${erreurs.length} erreur(s)`);
  if (debordent.length) infos.push(`${nom} : le texte déborde du panneau aux étapes ${debordent.join(", ")}`);
  if (vides.length) infos.push(`${nom} : plus des deux tiers du panneau vides aux étapes ${vides.join(", ")}`);

  // la page d'exercices du pilote, si elle existe : chaque exercice s'affiche, chaque QCM se
  // résout en essayant les options, une saisie fausse reçoit un retour, la correction se
  // déroule jusqu'au bout, le bilan s'affiche
  const rep = await page.goto(`${BASE}/pilote/${nom}/exercices`, { waitUntil: "networkidle" });
  if (rep && rep.ok()) {
    await page.waitForSelector(".exos-q, .exos-bilan", { timeout: 15000, state: "attached" });
    const n = await page.$$eval(".exos-suivi .exos-pastille:not(.fin)", (b) => b.length);
    if (!n) defauts.push(`${nom} : la page d'exercices n'a aucun exercice`);
    for (let x = 0; x < n; x++) {
      await page.waitForSelector(".exos-q");
      const katex = await page.$$eval(".exos .katex-error", (k) => k.length);
      if (katex) defauts.push(`${nom} exercice ${x + 1} : ${katex} formule(s) non rendue(s)`);
      const nq = await page.$$eval(".exos-questions > li", (l) => l.length);
      for (let j = 0; j < nq; j++) {
        const li = `.exos-questions > li:nth-child(${j + 1})`;
        const opts = await page.$$(`${li} .exos-opt input`);
        if (opts.length) {
          let ok = false;
          for (let m = 0; m < opts.length && !ok; m++) {
            await page.check(`${li} .exos-opt:nth-child(${m + 1}) input`);
            await page.click(`${li} .exos-q-actions button:first-child`);
            ok = await page.$eval(li, (e) => e.classList.contains("juste"));
          }
          if (!ok) defauts.push(`${nom} exercice ${x + 1} question ${j + 1} : aucune option n'est acceptée`);
        } else {
          await page.fill(`${li} input[type=text]`, "123456,789");
          await page.click(`${li} .exos-q-actions button:first-child`);
          const msg = await page.$eval(`${li} .exos-retour`, (e) => e.textContent.trim());
          if (!msg) defauts.push(`${nom} exercice ${x + 1} question ${j + 1} : une saisie fausse ne reçoit aucun retour`);
        }
      }
      await page.click(".exos-correction button");
      for (let g = 0; g < 20 && (await page.$(".exos-correction button")); g++) await page.click(".exos-correction button");
      if (CAPTURES) {
        fs.mkdirSync(path.join(CAPTURES, nom, "exercices"), { recursive: true });
        await page.screenshot({ path: path.join(CAPTURES, nom, "exercices", `exercice-${String(x + 1).padStart(2, "0")}.png`), fullPage: true });
      }
      await page.click(".exos-actions .exos-btn:last-child");
    }
    const bilan = await page.$(".exos-bilan");
    if (!bilan) defauts.push(`${nom} : le bilan des exercices ne s'affiche pas`);
    console.log(`${nom} : ${n} exercice(s) parcourus`);
  }
  for (const m of erreurs.splice(0)) defauts.push(`${nom} (exercices) : erreur de la page — ${m}`);
  await page.close();
}
await navigateur.close();

for (const i of infos) console.log(`  info · ${i}`);
if (defauts.length) {
  for (const d of defauts) console.log(`  ✗ ${d}`);
  console.log(`pilotes-parcours : ${defauts.length} défaut(s)`);
  if (PORTE) process.exit(1);
} else {
  console.log("pilotes-parcours : aucun défaut ✓");
}
// sortie explicite : le serveur lancé par ce script garderait le processus en vie (l'écouteur
// « exit » l'arrête au passage)
process.exit(0);
