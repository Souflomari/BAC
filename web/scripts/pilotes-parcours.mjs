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
 *   - les largeurs intermédiaires (900 et 1024 px : barre des parties non tronquée) ;
 *   - en mouvement réel : clic « Suivant » pendant une animation (termine l'étape au lieu
 *     de la quitter sur des phrases cachées) et présence d'un bouton « Rejouer » ;
 *   - sur téléphone (390×844) : ouverture de « Mode d'emploi » en haut, et scène collée
 *     non recouverte par l'en-tête après défilement ;
 *   - sur les exercices : lien retour vers la leçon, inputMode compatible signes/puissances,
 *     ponctuation du cadre, absence de « demande un indice » sans indice ou après ouverture,
 *     statut conservé quand on lit la correction rédigée après réussite, et thème sombre adouci ;
 *   - (pour information, sous 640 px) les étapes dont un texte de scène reste sous 11 px réels ;
 *   - (pour information) les étapes dont le texte déborde du panneau, et
 *     celles qui laissent plus des deux tiers du panneau vides — le retour
 *     du propriétaire du 2026-10-26 sur le « trop d'espace en dessous ».
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
const PILOTES = ["logarithme", "radioactivite", "expression-genetique", "exponentielle", "meiose", "transmission", "noyaux", "suites", "dipole-rc"].filter((p) => !SEUL || p === SEUL);

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
      nomsLongs: L.BEATS.map((b) => b.court || b.name).filter((n) => n.length > 9),
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

  // largeurs intermédiaires (G-01-014) : la barre des parties ne doit pas se tronquer en interne
  for (const w of [900, 1024]) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.waitForTimeout(40);
    const bar = await page.evaluate(() => {
      const b = document.querySelector("#beats");
      const barre = document.querySelector(".pilote-barre");
      return {
        beatsScroll: b?.scrollWidth ?? 0,
        beatsClient: b?.clientWidth ?? 0,
        barreScroll: barre?.scrollWidth ?? 0,
        barreClient: barre?.clientWidth ?? 0,
      };
    });
    if (bar.barreScroll > bar.barreClient + 1) {
      defauts.push(`${nom} (${w} px) : .pilote-barre déborde (${bar.barreScroll} > ${bar.barreClient})`);
    }
    if (bar.beatsScroll > bar.beatsClient + 1) {
      defauts.push(`${nom} (${w} px) : #beats déborde en interne (${bar.beatsScroll} > ${bar.beatsClient})`);
    }
  }
  await page.setViewportSize({ width: LARGEUR, height: HAUTEUR });

  // une capture attend la fin de l'animation de l'étape (le noyau note l'étape « vue » à la dernière image)
  const finAnimation = () =>
    page
      .waitForFunction(
        () => {
          const L = document.querySelector("[data-pilote]").__lecon;
          const i = Number(document.querySelector("#count").textContent.match(/étape (\d+)/)[1]) - 1;
          return !L || !!L.S.vu[L.STEPS[i].k];
        },
        null,
        { timeout: 8000 },
      )
      .catch(() => {});

  // sous 640 px : la taille réelle (écran) du plus petit texte utile de la scène, mesurée quand l'étape est
  // posée. Pour information seulement : le noyau remonte les textes à 11 px, sauf ceux qui se toucheraient.
  const petits = [];
  const mesurerTextes = async () => {
    await finAnimation();
    await page.waitForTimeout(220);
    return page.evaluate(() => {
      const svg = document.querySelector("[data-pilote-scene]");
      let min = Infinity;
      svg.querySelectorAll(".scene.on text").forEach((t) => {
        if (!t.textContent.trim()) return;
        let op = 1;
        for (let el = t; el && el !== svg; el = el.parentElement) {
          const cs = getComputedStyle(el);
          if (cs.display === "none" || cs.visibility === "hidden") return;
          op *= Number(cs.opacity);
        }
        if (op < 0.3 || t.getBoundingClientRect().width < 1) return;
        const m = t.getScreenCTM();
        min = Math.min(min, parseFloat(getComputedStyle(t).fontSize) * Math.hypot(m.a, m.b));
      });
      return min === Infinity ? null : Math.round(min * 10) / 10;
    });
  };
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
      if (CAPTURES) await finAnimation(), await page.screenshot({ path: path.join(CAPTURES, nom, `etape-${String(e.i).padStart(2, "0")}.png`) });
      break;
    }
    if (e.dis) {
      // un pari, une question, ou le second essai d'une question — toujours le pire cas pour le
      // panneau (déterministe) : les mauvaises réponses d'abord, et le retour le plus long
      if (e.opts && (!e.repondu || e.lab.startsWith("Essaie"))) {
        const j = await page.evaluate(() => {
          const L = document.querySelector("[data-pilote]").__lecon;
          const i = Number(document.querySelector("#count").textContent.match(/étape (\d+)/)[1]) - 1;
          const P = L && L.STEPS[i].pari;
          const libres = [...document.querySelectorAll("#body .opt:not([disabled])")].map((b) => +b.dataset.j);
          if (!P) return libres[0];
          const q = P.opts.some((o) => o.ok);
          const faux = libres.filter((k) => (q ? !P.opts[k].ok : true));
          const pool = faux.length ? faux : libres;
          const poids = (k) => (P.opts[k].fb || "").length + (P.opts[k].indice || "").length;
          return pool.sort((x, y) => poids(y) - poids(x))[0];
        });
        await page.click(`#body .opt[data-j="${j}"]`);
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
    if (LARGEUR < 640) {
      const min = await mesurerTextes();
      if (min != null && min < 11) petits.push(`${e.i} (${String(min).replace(".", ",")} px)`);
    }
    if (e.deborde) debordent.push(e.i);
    if (e.rempli < 0.34) vides.push(e.i);
    if (CAPTURES) await finAnimation(), await page.screenshot({ path: path.join(CAPTURES, nom, `etape-${String(e.i).padStart(2, "0")}.png`) });
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
  if (petits.length) infos.push(`${nom} : texte de scène sous 11 px réels au téléphone aux étapes ${petits.join(", ")}`);
  if (vides.length) infos.push(`${nom} : plus des deux tiers du panneau vides aux étapes ${vides.join(", ")}`);

  // la page d'exercices du pilote, si elle existe : chaque exercice s'affiche, chaque QCM se
  // résout en essayant les options, une saisie fausse reçoit un retour, la correction se
  // déroule jusqu'au bout, le bilan s'affiche
  const rep = await page.goto(`${BASE}/pilote/${nom}/exercices`, { waitUntil: "networkidle" });
  if (rep && rep.ok()) {
    await page.waitForSelector(".exos-q, .exos-bilan", { timeout: 15000, state: "attached" });
    const n = await page.$$eval(".exos-suivi .exos-pastille:not(.fin)", (b) => b.length);
    if (!n) defauts.push(`${nom} : la page d'exercices n'a aucun exercice`);
    // G-01-007 : lien retour vers la leçon dans la barre des exercices
    const lienLecon = await page.$(`.exos-barre a[href="/pilote/${nom}"]`);
    if (!lienLecon) defauts.push(`${nom} (exercices) : aucun lien retour vers la leçon dans .exos-barre`);
    let indiceApresTeste = false;
    for (let x = 0; x < n; x++) {
      await page.waitForSelector(".exos-q");
      const katex = await page.$$eval(".exos .katex-error", (k) => k.length);
      if (katex) defauts.push(`${nom} exercice ${x + 1} : ${katex} formule(s) non rendue(s)`);
      // G-01-016 : pas de point-virgule final sur « Au programme : »
      const cadreTxt = await page.$eval(".exos-cadre", (el) => el.textContent.trim()).catch(() => "");
      if (/;\s*$/.test(cadreTxt)) defauts.push(`${nom} exercice ${x + 1} : .exos-cadre se termine par « ; »`);
      // G-01-002 : aucun champ de saisie numérique bloqué sur inputMode="decimal"
      const decimals = await page.$$eval(".exos-saisie input", (ins) => ins.filter((el) => el.getAttribute("inputmode") === "decimal").length);
      if (decimals) defauts.push(`${nom} exercice ${x + 1} : ${decimals} champ(s) encore en inputMode="decimal"`);

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
          const estTexte = await page.$(`${li} .exos-saisie.texte`);
          const fausse = estTexte ? "ZZZ ZZZ" : "123456,789";
          await page.fill(`${li} input[type=text]`, fausse);
          await page.click(`${li} .exos-q-actions button:first-child`);
          const msg = await page.$eval(`${li} .exos-retour`, (e) => e.textContent.trim());
          if (!msg) defauts.push(`${nom} exercice ${x + 1} question ${j + 1} : une saisie fausse ne reçoit aucun retour`);
          // G-01-010 : pas de « demande un indice » sans bouton indice, ni après ouverture de l'indice
          const btnIndice = await page.$(`${li} .exos-q-actions button.ghost`);
          if (!btnIndice && /demande un indice/i.test(msg)) {
            defauts.push(`${nom} exercice ${x + 1} question ${j + 1} : message « demande un indice » sans bouton d'indice`);
          } else if (btnIndice && !indiceApresTeste) {
            indiceApresTeste = true;
            await btnIndice.click();
            await page.fill(`${li} input[type=text]`, estTexte ? "YYY YYY" : "987654,321");
            await page.click(`${li} .exos-q-actions button:first-child`);
            const msgApres = await page.$eval(`${li} .exos-retour`, (e) => e.textContent.trim());
            if (/demande un indice/i.test(msgApres)) {
              defauts.push(`${nom} exercice ${x + 1} question ${j + 1} : « demande un indice » encore affiché après ouverture de l'indice`);
            }
          }
        }
      }
      // G-01-003 : ouvrir « Voir la correction rédigée » après avoir réussi toutes les questions ne déclasse pas en b-corrige
      const toutJuste = await page.$$eval(".exos-questions > li", (ls) => ls.length > 0 && ls.every((l) => l.classList.contains("juste")));
      await page.click(".exos-correction button");
      if (toutJuste) {
        const clsApres = await page.$eval(`.exos-suivi > li:nth-child(${x + 1}) .exos-pastille`, (b) => b.className);
        if (clsApres.includes("b-corrige")) {
          defauts.push(`${nom} exercice ${x + 1} : ouvrir la correction rédigée après réussite déclasse en b-corrige`);
        }
      }
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

    // G-01-005 : thème sombre adouci sur les exercices (bouton primaire adouci par rapport à --color-text-primary)
    const pageSombre = await navigateur.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce", colorScheme: "dark" });
    await pageSombre.goto(`${BASE}/pilote/${nom}/exercices`, { waitUntil: "networkidle" });
    await pageSombre.waitForSelector(".exos-actions .exos-btn");
    const sombre = await pageSombre.evaluate(() => {
      const b = document.querySelector(".exos-actions .exos-btn:last-child");
      const sonde = document.createElement("span");
      sonde.style.backgroundColor = "var(--color-text-primary)";
      document.body.appendChild(sonde);
      const brut = getComputedStyle(sonde).backgroundColor;
      sonde.remove();
      return { bg: getComputedStyle(b).backgroundColor, brut };
    });
    if (sombre.bg === sombre.brut) {
      defauts.push(`${nom} (exercices, sombre) : bouton primaire non adouci (égal à --color-text-primary : ${sombre.bg})`);
    }
    await pageSombre.close();
  }
  for (const m of erreurs.splice(0)) defauts.push(`${nom} (exercices) : erreur de la page — ${m}`);
  await page.close();

  // téléphone (390×844) : ouverture de « Mode d'emploi » en haut (G-01-006) et scène non recouverte
  // par l'en-tête fixe après défilement (G-01-001)
  const pageMob = await navigateur.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  await pageMob.goto(`${BASE}/pilote/${nom}`, { waitUntil: "networkidle" });
  await pageMob.waitForFunction(() => /étape 1 \//.test(document.querySelector("#count")?.textContent || ""));
  await pageMob.click("#why");
  await pageMob.waitForSelector("#whyd[open]");
  const dlg = await pageMob.evaluate(() => {
    const d = document.querySelector("#whyd");
    const h = d?.querySelector("h2");
    return {
      scrollTop: Math.round(d?.scrollTop ?? 0),
      h2Top: Math.round(h?.getBoundingClientRect().top ?? 0),
      dTop: Math.round(d?.getBoundingClientRect().top ?? 0),
    };
  });
  if (dlg.scrollTop > 4 || dlg.h2Top < dlg.dTop - 2) {
    defauts.push(`${nom} (390×844) : « Mode d'emploi » s'ouvre défilé (scrollTop=${dlg.scrollTop})`);
  }
  await pageMob.click("#whyd button");
  // défilement réel (réponse à l'étape 1 puis scroll vers le bas) : l'en-tête ne doit pas couvrir .stage-wrap
  const opt1 = await pageMob.$("#body .opt:not([disabled])");
  if (opt1) await opt1.click();
  await pageMob.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await pageMob.waitForTimeout(100);
  const cov = await pageMob.evaluate(() => {
    const h = document.querySelector("header")?.getBoundingClientRect();
    const s = document.querySelector(".stage-wrap")?.getBoundingClientRect();
    if (!h || !s) return 0;
    return h.bottom > 2 ? Math.max(0, Math.round(h.bottom - s.top)) : 0;
  });
  if (cov > 2) {
    defauts.push(`${nom} (390×844) : l'en-tête recouvre la scène collée de ${cov} px après défilement`);
  }
  await pageMob.close();

  // mouvement réel (G-01-004) : un clic sur « Suivant » pendant une animation avec phrases cachées
  // doit terminer l'étape au lieu de la quitter, et un bouton « Rejouer » doit exister
  const pageReel = await navigateur.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: "no-preference" });
  await pageReel.goto(`${BASE}/pilote/${nom}`, { waitUntil: "networkidle" });
  await pageReel.waitForFunction(() => /étape 1 \//.test(document.querySelector("#count")?.textContent || ""));
  const aRejouer = await pageReel.evaluate(() => {
    const btns = [...document.querySelectorAll("button")];
    return btns.some((b) => /rejouer/i.test(`${b.textContent || ""} ${b.getAttribute("aria-label") || ""} ${b.id || ""}`));
  });
  if (!aRejouer) defauts.push(`${nom} : aucun bouton « Rejouer » présent`);
  const cible = await pageReel.evaluate(() => {
    const L = document.querySelector("[data-pilote]")?.__lecon;
    if (!L) return null;
    for (let b = 1; b < L.BEATS.length; b++) {
      const idx = L.STEPS.findIndex((s) => s.beat === b);
      const st = L.STEPS[idx];
      if (st && Array.isArray(st.text) && st.text.some((p) => typeof p === "object" && p.a > 0) && !st.pari && !st.ctl && !st.need && !st.deriv) {
        return { beat: b, step: idx + 1 };
      }
    }
    return null;
  });
  if (cible) {
    await pageReel.locator("#beats .beat").nth(cible.beat).click();
    await pageReel.waitForTimeout(80);
    const avant = await pageReel.evaluate(() => ({
      step: Number((document.querySelector("#count")?.textContent || "").match(/étape (\d+)/)?.[1] || 0),
      cachees: document.querySelectorAll("#body .say.later").length,
      dis: document.querySelector("#next")?.disabled ?? true,
    }));
    if (avant.cachees > 0 && !avant.dis) {
      await pageReel.click("#next");
      await pageReel.waitForTimeout(120);
      const apres = await pageReel.evaluate(() => ({
        step: Number((document.querySelector("#count")?.textContent || "").match(/étape (\d+)/)?.[1] || 0),
        cachees: document.querySelectorAll("#body .say.later").length,
      }));
      if (apres.step !== avant.step) {
        defauts.push(`${nom} (mouvement réel, étape ${avant.step}) : clic « Suivant » quitte l'étape alors que ${avant.cachees} phrase(s) sont encore cachées`);
      } else if (apres.cachees > 0) {
        defauts.push(`${nom} (mouvement réel, étape ${avant.step}) : clic « Suivant » n'a pas révélé les ${apres.cachees} phrase(s) cachée(s)`);
      }
    }
  }
  await pageReel.close();
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
