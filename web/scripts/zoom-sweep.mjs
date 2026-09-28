/**
 * Balayage ZOOM — le corpus entier avec le texte doublé (WCAG 2.2 SC 1.4.4).
 *
 * « Le texte peut être redimensionné jusqu'à 200 % sans perte de contenu ni de
 * fonctionnalité. » On double la taille de la racine (16 → 32 px : l'échelle
 * typographique est en `rem`, elle suit) et on mesure deux choses :
 *
 *   · le DÉBORD horizontal du document — du contenu poussé hors cadre ;
 *   · le texte COUPÉ — une boîte qui cache son débordement. C'est la perte
 *     silencieuse, et c'est la pire des deux : rien ne la signale à l'élève.
 *
 * Quand il y a débord, on remonte le coupable par BISSECTION : masquer un
 * enfant, regarder si le débord disparaît, descendre. C'est ce qui a désigné
 * la piste de grille du masthead, puis les tableaux, là où une inspection à
 * l'œil aurait accusé le titre.
 *
 * TROIS EXCLUSIONS, faux positifs par construction : `sr-only` (masqué
 * jusqu'au focus), `katex-mathml` (la couche MathML, masquée par nature), et
 * tout `text-overflow: ellipsis` (troncature VOULUE, doublée d'un `title`).
 * Une quatrième, mesurée : l'opacité effective — une infobulle de rail est
 * « coupée » en permanence, et c'est son fonctionnement.
 *
 * CE QUE LE 2026-09-05 A APPRIS, pour que la prochaine lecture ne le
 * réapprenne pas. Le HANDOFF consignait « 227 → 0 » ; relancé, l'instrument
 * rendait 61 débords à 360 px. Le zéro consigné n'était pas reproductible —
 * l'arbre de la veille, reconstruit, rend 61 aussi. Les 61 étaient RÉELS et
 * tenaient à une seule loi : une boîte flex ou une piste de grille ne descend
 * pas sous la largeur min-content de son contenu, et `overflow-wrap:
 * break-word` n'y change RIEN. À 200 %, tout ce qui est en `rem`, `ch` ou
 * max-content double ; l'écran, non. Correctifs : `min-w-0` sur l'item flex,
 * `minmax(0,1fr)` sur la piste de grille (le `min-w-0` de l'item n'y suffit
 * pas), `max-w-full` sur un bouton inline-flex, `min(28ch,100%)` sur une
 * borne en `ch`. L'attente de `document.fonts.ready` ci-dessous est une
 * HYGIÈNE de mesure ; elle n'explique aucun des 61.
 *
 * PORTÉE. Les 62 leçons, les 39 épreuves OUVERTES (« Commencer », puis
 * « Terminer » : le corrigé n'entre dans le DOM qu'après ces deux actions),
 * et les pages hors leçon. Avant ce jour, une seule épreuve, jamais ouverte.
 *
 *   node scripts/zoom-sweep.mjs [--porte] [--largeurs=1280,360]   ⚠️ depuis web/
 *   Sans BASE, lance son propre serveur (comme les portes de CI).
 */
import { chromium } from "playwright-core";
import { readdirSync, existsSync } from "node:fs";
import { execSync, spawn } from "node:child_process";

// Sans BASE, l'instrument lance SON serveur sur un port dérivé du pid — comme
// les autres portes de CI (voir l'en-tête de dom-truth sur les ports) — et
// l'arrête en sortant (détaché + `unref()` : un serveur qui garde la boucle
// d'événements en vie a déjà tué un run, porte ancres, 2026-09-05).
const PORT = Number(process.env.PORT_ZOOM ?? 3600 + (process.pid % 300));
const AUTONOME = !process.env.BASE;
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
const porte = process.argv.includes("--porte");
const argL = process.argv.find((a) => a.startsWith("--largeurs="));
const largeurs = argL ? argL.slice(11).split(",").map(Number).filter(Boolean) : [1280, 360];

const lecons = [];
for (const m of readdirSync("../content")) {
  const d = `../content/${m}`;
  for (const s of readdirSync(d)) if (existsSync(`${d}/${s}/lesson.md`)) lecons.push(`/notions/${m}/${s}`);
}
if (lecons.length < 30) {
  // `../content` est résolu depuis le répertoire courant : ailleurs que dans
  // web/, la liste est vide et le balayage serait vert sans rien mesurer.
  console.error(`✗ ${lecons.length} leçon(s) trouvée(s) — lancé depuis le mauvais répertoire ? (il faut web/)`);
  process.exit(1);
}
const epreuves = execSync("node scripts/routes-examens.mjs", { encoding: "utf8" }).trim().split(" ");
const routes = [...lecons, ...epreuves, "/", "/examens", "/matieres/pc", "/commencer"];

let serveur = null;
if (AUTONOME) {
  serveur = spawn("npx", ["next", "start", "-p", String(PORT)], { stdio: "ignore", detached: true });
  serveur.unref();
  const t0 = Date.now();
  let pret = false;
  while (Date.now() - t0 < 60000) {
    try { if ((await fetch(`${BASE}/`)).ok) { pret = true; break; } } catch { /* pas encore */ }
    await new Promise((r) => setTimeout(r, 500));
  }
  if (!pret) { console.error("✗ serveur absent — rien n'est mesuré"); try { process.kill(-serveur.pid); } catch {} process.exit(1); }
}
const arreter = () => { if (serveur?.pid) { try { process.kill(-serveur.pid); } catch {} } };

const b = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
let total = 0;
let mesurees = 0;
for (const W of largeurs) {
  const p = await b.newPage({ viewport: { width: W, height: 900 } });
  // UNE PAGE DONT LA FEUILLE DE STYLE MANQUE N'EST PAS UNE PAGE (2026-09-05).
  // Un serveur `next start` qui survit au `next build` suivant garde en mémoire
  // les anciens noms de fichiers CSS ; le disque ne les a plus ; la page se
  // rend SANS globals.css et toute mesure de mise en page est fausse — ici,
  // 876 px de débord sur une page qui en fait 0. Un 404 sur une feuille de
  // style arrête l'instrument : rien de ce qu'il dirait ensuite ne serait vrai.
  p.on("response", (rep) => {
    if (rep.status() >= 400 && /\.css(\?|$)/.test(rep.url())) {
      console.error(`✗ feuille de style ${rep.status()} : ${rep.url()} — le serveur ne sert pas le build mesuré. Arrêt.`);
      arreter();
      process.exit(2);
    }
  });
  const soucis = [];
  for (const r of routes) {
    const rep = await p.goto(`${BASE}${r}`, { waitUntil: "networkidle" });
    if (rep && rep.status() !== 200) {
      console.error(`✗ ${r} — HTTP ${rep.status()} : cette route n'existe pas, rien n'est mesuré.`);
      process.exitCode = 1;
      continue;
    }
    // Les deux actions d'une épreuve : l'énoncé, puis le corrigé.
    const commencer = p.getByRole("button", { name: /Commencer l.épreuve/i });
    if (await commencer.count()) {
      await commencer.first().click();
      await p.waitForSelector("[data-sujet-complet]", { timeout: 60000 });
      const terminer = p.getByRole("button", { name: /Terminer l.épreuve/i });
      if (await terminer.count()) { await terminer.first().click(); await p.waitForSelector("[data-corrige-complet]", { timeout: 60000 }); }
    }
    mesurees++;
    const m = await p.evaluate(async () => {
      await document.fonts.ready; // hygiène : mesurer avec les fontes du site, pas celles du substitut
      document.querySelectorAll("[data-chapter-section]").forEach((s) => (s.hidden = false));
      // SC 1.4.4 : texte redimensionnable à 200 % sans perte de contenu.
      document.documentElement.style.fontSize = "32px";
      const W = window.innerWidth;
      const debord = document.documentElement.scrollWidth - W;
      // Bissection : masquer un enfant, regarder si le débord disparaît.
      let chemin = [];
      if (debord > 1) {
        const trop = () => document.documentElement.scrollWidth > W + 1;
        let noeud = document.body;
        for (let prof = 0; prof < 25; prof++) {
          let suivant = null;
          for (const c of noeud.children) {
            const d = c.style.display; c.style.display = "none";
            const parti = !trop(); c.style.display = d;
            if (parti) { suivant = c; break; }
          }
          if (!suivant) break;
          chemin.push(`${suivant.tagName.toLowerCase()}.${String(suivant.className).trim().split(/\s+/).slice(0,2).join(".")}`);
          noeud = suivant;
        }
        if (noeud !== document.body) chemin.push(`FEUILLE « ${(noeud.textContent||"").trim().replace(/\s+/g," ").slice(0,50)} »`);
      }
      // texte COUPÉ : une boîte qui cache son contenu débordant.
      const coupes = [];
      for (const el of document.querySelectorAll("main *")) {
        // D'abord les lectures de géométrie (une seule mise en page, puis
        // gratuites), et seulement ENSUITE getComputedStyle : sur une page de
        // 30 000 nœuds, calculer le style de chacun coûtait plusieurs secondes
        // par page — le balayage des 105 pages prenait 18 min (2026-09-05).
        if (el.scrollWidth - el.clientWidth <= 2 && el.scrollHeight - el.clientHeight <= 2) continue;
        if (!el.textContent || !el.textContent.trim()) continue;
        const cs = getComputedStyle(el);
        if (cs.overflow !== "hidden" && cs.overflowY !== "hidden" && cs.overflowX !== "hidden") continue;
        // Les éléments VISUELLEMENT MASQUÉS (lien d'évitement, MathML de
        // KaTeX, libellé de rail hors cadre) sont coupés par construction :
        // c'est leur fonctionnement, pas une perte de contenu.
        const cl = String(el.className);
        if (/sr-only|katex-mathml/.test(cl)) continue;
        // `truncate` = troncature VOULUE avec ellipse, et le libellé complet
        // vit dans un `title`. Ce n'est pas une perte silencieuse.
        if (cs.textOverflow === "ellipsis") continue;
        const q = el.getBoundingClientRect();
        if (q.right <= 0 || q.left >= window.innerWidth) continue;
        let op = 1;
        for (let n = el; n; n = n.parentElement) op *= parseFloat(getComputedStyle(n).opacity || "1");
        if (op < 0.1) continue; // infobulle au survol, etc.
        const dy = el.scrollHeight - el.clientHeight;
        const dx = el.scrollWidth - el.clientWidth;
        if ((dy > 2 || dx > 2) && el.clientHeight > 0) {
          // ignorer les conteneurs qui défilent volontairement
          if (cs.overflowX === "auto" || cs.overflowY === "auto" || cs.overflowX === "scroll") continue;
          coupes.push(`${el.tagName.toLowerCase()}.${String(el.className).split(/\s+/).slice(0,2).join(".")} (+${Math.max(dx,dy)}px) « ${el.textContent.trim().replace(/\s+/g," ").slice(0,30)} »`);
        }
      }
      document.documentElement.style.fontSize = "";
      return { debord, chemin, coupes: [...new Set(coupes)].slice(0, 3) };
    });
    if (m.debord > 1) soucis.push(`${r} @${W} débord ${m.debord}px — ${m.chemin.join(' > ')}`);
    for (const c of m.coupes) soucis.push(`${r} @${W} COUPÉ ${c}`);
  }
  total += soucis.length;
  console.log(`\n=== ${W}px, texte à 200 % — ${soucis.length} signalement(s) sur ${routes.length} pages`);
  for (const x of soucis.slice(0, 40)) console.log(`  ✗ ${x}`);
  await p.close();
}
await b.close();
console.log(`\n${mesurees} mesure(s) (${routes.length} pages × ${largeurs.length} largeur(s)) — ${total} signalement(s)`);
arreter();
if (porte && (total > 0 || process.exitCode === 1)) {
  console.error(
    "\n━━ porte zoom : à 200 % de texte, rien ne sort du cadre et rien n'est coupé ━━\n" +
    "   Loi à connaître : un item flex ou une piste de grille ne descend pas sous la\n" +
    "   largeur min-content de son contenu ; `overflow-wrap` n'y change rien.\n" +
    "   → `min-w-0` sur l'item flex, `minmax(0,1fr)` sur la piste, `max-w-full` sur\n" +
    "     un bouton inline-flex, `min(Nch,100%)` sur une borne en `ch`."
  );
  process.exit(1);
}
process.exit(0);
