/**
 * hunt.mjs — the adversarial sweep (extension session, post-ADR-0026).
 *
 * Visits EVERY route under conditions never yet verified and records, per
 * route: console errors, failed network requests, KaTeX render errors,
 * horizontal overflow at 390/768/1280/1536/1920, plus targeted behavior
 * probes (hostile ?chapitre params, print emulation, reduced-motion,
 * theme/font persistence via the REAL toggles, keyboard traversal,
 * StagedFigure keyboard operability).
 *
 * Output: a findings log on stdout (grep-able, one line per finding,
 * prefixed FINDING|<category>|<severity-guess>) + a summary. The hunt
 * REPORTS; fixing and guarding happen in dom-truth per class.
 *
 * Usage: BASE_URL=http://localhost:PORT node scripts/hunt.mjs [--quick]
 * (server must already be running; hunt does not boot one — keep the
 * boot logic in one place, dom-truth).
 */

import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const BASE = process.env.BASE_URL || "http://localhost:4123";
const QUICK = process.argv.includes("--quick");

function findChromium() {
  if (process.env.PLAYWRIGHT_CHROMIUM && fs.existsSync(process.env.PLAYWRIGHT_CHROMIUM)) {
    return process.env.PLAYWRIGHT_CHROMIUM;
  }
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH || "/opt/pw-browsers";
  let dirs = [];
  try { dirs = fs.readdirSync(root).filter((d) => d.startsWith("chromium-")); } catch {}
  for (const d of dirs.sort().reverse()) {
    const p = path.join(root, d, "chrome-linux", "chrome");
    if (fs.existsSync(p)) return p;
  }
  if (fs.existsSync("/opt/pw-browsers/chromium")) return "/opt/pw-browsers/chromium";
  throw new Error("chromium introuvable");
}

// ── Route inventory (filesystem truth) ───────────────────────────────────────
const CONTENT = path.resolve(process.cwd(), "../content");
const lessons = [];
for (const subject of fs.readdirSync(CONTENT)) {
  const sdir = path.join(CONTENT, subject);
  if (!fs.statSync(sdir).isDirectory()) continue;
  for (const slug of fs.readdirSync(sdir)) {
    if (fs.existsSync(path.join(sdir, slug, "lesson.md"))) {
      lessons.push(`/notions/${subject}/${slug}`);
    }
  }
}
const optionRoutes = [
  "/options/home/b1", "/options/home/b2", "/options/home/b3",
  ...["a1","a2","a3"].map(v => `/options/masthead/${v}`),
  ...["m1","m2","m3","w1","w2","w3"].map(v => `/options/wide/${v}`),
];
const staticRoutes = ["/", "/route-inexistante-404"]; // « Notions » du header pointe sur / — pas de route /notions
const ALL = [...staticRoutes, ...lessons, ...optionRoutes];
const VIEWPORTS = [390, 768, 1280, 1536, 1920];

const findings = [];
function finding(cat, sev, route, detail) {
  findings.push({ cat, sev, route, detail });
  console.log(`FINDING|${cat}|${sev}|${route}|${detail}`);
}

const browser = await chromium.launch({ executablePath: findChromium() });

// ── Pass A — console / network / KaTeX / overflow@1280, BOTH themes ──────────
async function passA(theme) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  for (const route of ALL) {
    const consoleErrs = [];
    const netFails = [];
    const onConsole = (m) => { if (m.type() === "error" && !(route.includes("route-inexistante") && m.text().includes("404"))) consoleErrs.push(m.text().slice(0, 160)); };
    const onResp = (r) => { if (r.status() >= 400 && !r.url().includes("route-inexistante")) netFails.push(`${r.status()} ${r.url().slice(0, 120)}`); };
    page.on("console", onConsole);
    page.on("response", onResp);
    try {
      await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 20000 });
      if (theme === "dark") {
        // REAL toggle — never classList (the documented anti-pattern)
        const t = page.locator("button[aria-label*='thème' i], button[aria-label*='theme' i], [data-theme-toggle]").first();
        if (await t.count()) { await t.click(); await page.waitForTimeout(150); }
        else if (route === ALL[0]) finding("interaction", "P1", route, "ThemeToggle introuvable par aria-label — le hunt ne peut pas basculer par le vrai chemin");
      }
      const m = await page.evaluate(() => ({
        overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        katexErrors: document.querySelectorAll(".katex-error").length,
        katexErrorSample: document.querySelector(".katex-error")?.textContent?.slice(0, 80) ?? "",
      }));
      if (m.overflowX > 1) finding("rendering", "P1", `${route} [1280/${theme}]`, `overflow-x ${m.overflowX}px`);
      if (m.katexErrors > 0) finding("content", "P1", route, `${m.katexErrors} .katex-error — « ${m.katexErrorSample} »`);
      for (const e of consoleErrs) finding("console", "P2", `${route} [${theme}]`, e);
      for (const f of netFails) finding("network", "P2", `${route} [${theme}]`, f);
    } catch (err) {
      finding("console", "P0", `${route} [${theme}]`, `NAVIGATION FAILED: ${String(err).slice(0, 120)}`);
    }
    page.off("console", onConsole);
    page.off("response", onResp);
  }
  await ctx.close();
}

// ── Pass B — overflow at every other viewport (light) ────────────────────────
async function passB() {
  for (const width of VIEWPORTS.filter((w) => w !== 1280)) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await ctx.newPage();
    const sample = QUICK ? [...staticRoutes, lessons[0], lessons[Math.floor(lessons.length / 2)]] : ALL;
    for (const route of sample) {
      try {
        await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 20000 });
        await page.waitForTimeout(250);
        const over = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth
        );
        if (over > 1) finding("rendering", width < 800 ? "P0" : "P1", `${route} [${width}]`, `overflow-x ${over}px`);
      } catch (err) {
        finding("console", "P0", `${route} [${width}]`, `NAV FAILED: ${String(err).slice(0, 100)}`);
      }
    }
    await ctx.close();
  }
}

// ── Pass C — behavior probes ─────────────────────────────────────────────────
async function passC() {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const paginated = "/notions/pc/rlc-serie";

  // C1 hostile chapter params
  for (const p of ["0", "99", "abc", "-3"]) {
    await page.goto(`${BASE}${paginated}?chapitre=${p}`, { waitUntil: "networkidle" });
    const state = await page.evaluate(() => {
      const visible = [...document.querySelectorAll("[data-chapter-section]")].filter((s) => !s.hidden);
      return { visibleCount: visible.length, idx: visible[0]?.getAttribute("data-chapter-index") ?? "none" };
    });
    if (state.visibleCount !== 1)
      finding("interaction", "P1", `${paginated}?chapitre=${p}`, `${state.visibleCount} chapitres visibles (attendu 1)`);
    else if (!["0", null, "none"].includes(state.idx) && (p === "0" || p === "abc" || p === "-3"))
      finding("interaction", "P2", `${paginated}?chapitre=${p}`, `param hostile atterrit sur l'index ${state.idx} (attendu clamp au chapitre 1 = index 0)`);
  }

  // C2 print emulation — all chapters visible, controls hidden
  await page.goto(BASE + paginated, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" });
  const printState = await page.evaluate(() => {
    const sections = [...document.querySelectorAll("[data-chapter-section]")];
    const shown = sections.filter((s) => getComputedStyle(s).display !== "none").length;
    const controls = [...document.querySelectorAll(".chapter-transport, .chapter-position")]
      .filter((c) => getComputedStyle(c).display !== "none").length;
    return { total: sections.length, shown, controls };
  });
  if (printState.shown !== printState.total)
    finding("rendering", "P0", `${paginated} [print]`, `print ne déplie pas : ${printState.shown}/${printState.total} chapitres visibles`);
  if (printState.controls > 0)
    finding("rendering", "P2", `${paginated} [print]`, `${printState.controls} contrôles de transport visibles à l'impression`);
  await page.emulateMedia({ media: "screen" });

  // C3 reduced-motion — StagedFigure complete, controls hidden
  const rctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
  const rpage = await rctx.newPage();
  await rpage.goto(BASE + paginated, { waitUntil: "networkidle" });
  const rm = await rpage.evaluate(() => {
    const fig = document.querySelector("[data-figure='rlc-schema']");
    if (!fig) return { found: false };
    return {
      found: true,
      steps: fig.querySelectorAll("g[id^='step-']").length,
      controlsVisible: [...fig.querySelectorAll("button")].some((b) => getComputedStyle(b).display !== "none" && b.offsetParent !== null),
    };
  });
  if (!rm.found) finding("interaction", "P1", paginated + " [rm]", "StagedFigure rlc-schema introuvable sous reduced-motion");
  else {
    if (rm.steps !== 4) finding("interaction", "P1", paginated + " [rm]", `reduced-motion: ${rm.steps}/4 étapes rendues (attendu figure complète)`);
    if (rm.controlsVisible) finding("interaction", "P2", paginated + " [rm]", "contrôles StagedFigure visibles sous reduced-motion (précédent Derivation = masqués)");
  }
  await rctx.close();

  // C4 theme + font persistence across navigation (real toggles)
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const toggle = page.locator("button[aria-label*='thème' i], button[aria-label*='theme' i], [data-theme-toggle]").first();
  if (await toggle.count()) {
    await toggle.click(); await page.waitForTimeout(200);
    const beforeNav = await page.evaluate(() => document.documentElement.className);
    await page.goto(BASE + paginated, { waitUntil: "networkidle" });
    const afterNav = await page.evaluate(() => document.documentElement.className);
    if (beforeNav.includes("dark") !== afterNav.includes("dark"))
      finding("interaction", "P1", "/ → lesson", `thème non persistant à la navigation (avant='${beforeNav}' après='${afterNav}')`);
  }
  const fontBtn = page.locator("button[aria-label*='taille' i], button[aria-label*='police' i]").first();
  if (await fontBtn.count()) {
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await fontBtn.click(); await page.waitForTimeout(150);
    const fs1 = await page.evaluate(() => getComputedStyle(document.documentElement).fontSize);
    await page.goto(BASE + paginated, { waitUntil: "networkidle" });
    const fs2 = await page.evaluate(() => getComputedStyle(document.documentElement).fontSize);
    if (fs1 !== fs2) finding("interaction", "P1", "/ → lesson", `taille de police non persistante (${fs1} → ${fs2})`);
  } else {
    finding("a11y", "P3", "/", "stepper de police introuvable par aria-label 'taille/police' — vérifier son aria");
  }

  // C5 keyboard: tab through the lesson — every focused element visibly ringed;
  // StagedFigure operable (Enter on Suivant advances the counter)
  await page.goto(BASE + paginated, { waitUntil: "networkidle" });
  let unringed = 0, tabbed = 0, sample = "";
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press("Tab");
    const f = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const cs = getComputedStyle(el);
      const ringed = cs.outlineStyle !== "none" || cs.boxShadow !== "none";
      return { ringed, tag: el.tagName, label: (el.getAttribute("aria-label") || el.textContent || "").slice(0, 40) };
    });
    if (!f) continue;
    tabbed++;
    if (!f.ringed && !sample) { unringed++; sample = `${f.tag} « ${f.label} »`; }
    else if (!f.ringed) unringed++;
  }
  if (unringed > 0) finding("a11y", "P1", paginated, `${unringed}/${tabbed} éléments tabulés SANS anneau de focus visible (1er: ${sample})`);

  const suivant = page.locator("[data-figure='rlc-schema'] button", { hasText: "Suivant" }).first();
  if (await suivant.count()) {
    const before = await page.locator("[data-figure='rlc-schema'] [aria-live]").first().textContent();
    await suivant.focus(); await page.keyboard.press("Enter"); await page.waitForTimeout(200);
    const after = await page.locator("[data-figure='rlc-schema'] [aria-live]").first().textContent();
    if (before === after) finding("a11y", "P1", paginated, `StagedFigure non opérable au clavier (compteur inchangé: ${before})`);
  }

  // C6 embed fallback: block PhET, check honest degradation
  const bctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const bpage = await bctx.newPage();
  await bpage.route("**phet.colorado.edu**", (r) => r.abort());
  await bpage.goto(BASE + "/notions/pc/rc-charge?chapitre=5", { waitUntil: "networkidle" }).catch(() => {});
  const embedState = await bpage.evaluate(() => {
    const panel = document.querySelector("[data-embed], .embed-panel, figure iframe")?.closest("figure, section, div");
    return { pageAlive: !!document.querySelector("h1"), hasEmbedUi: !!panel };
  });
  if (!embedState.pageAlive) finding("interaction", "P0", "/notions/pc/rc-charge [PhET bloqué]", "la page meurt quand PhET est injoignable");
  await bctx.close();

  await ctx.close();
}

console.log(`hunt: ${ALL.length} routes (${lessons.length} leçons), viewports ${VIEWPORTS.join("/")}`);
await passA("light");
await passA("dark");
await passB();
await passC();
await browser.close();

const bySev = {};
for (const f of findings) bySev[f.sev] = (bySev[f.sev] || 0) + 1;
console.log(`\n━━ hunt: ${findings.length} finding(s) — ${Object.entries(bySev).map(([s, n]) => `${s}:${n}`).join(" ") || "aucun"} ━━`);
