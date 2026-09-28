/**
 * couleurs-forcees.mjs — Windows « contraste élevé » (forced-colors: active) :
 * les couleurs personnalisées sautent, les ombres portées aussi. Que
 * reste-t-il des boutons, des anneaux de focus, des cartes ?
 *
 * POURQUOI (2026-09-11, HANDOFF §11.36). Jamais mesuré. Trouvé : l'anneau de
 * focus tient (outline), les cartes tiennent (bordures), mais tout bouton
 * sans bordure — « Commencer l'épreuve », Notions, Aa, le rail des chapitres —
 * devenait du texte nu. Depuis : un contour système en `outline` négatif
 * (globals.css, @media (forced-colors: active)).
 *
 * CE QU'ON MESURE, sur l'accueil, une leçon et une épreuve, à 1280 px :
 * commandes visibles SANS bordure ni contour ; cartes/sections sans bordure ;
 * le focus après trois tabulations (outline, box-shadow) ; une capture par
 * page dans $S (à regarder — un chiffre ne dit pas si c'est lisible).
 *
 *   BASE=http://127.0.0.1:3911 S=/chemin/des/captures node scripts/couleurs-forcees.mjs   (⚠️ depuis web/)
 */
import { chromium } from "playwright-core";
const nav = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const ctx = await nav.newContext({ viewport: { width: 1280, height: 900 } });
const p = await ctx.newPage();
await p.emulateMedia({ forcedColors: "active", colorScheme: "light" });
for (const [r, nom] of [["/", "accueil"], ["/notions/pc/rlc-serie?chapitre=3", "lecon"], ["/examens/sm-2025-normale", "epreuve"]]) {
  await p.goto(`${process.env.BASE ?? "http://127.0.0.1:3911"}${r}`, { waitUntil: "networkidle" });
  await p.waitForFunction(() => !!window.__bacVivant).catch(() => {});
  const e = await p.evaluate(() => {
    const actif = matchMedia("(forced-colors: active)").matches;
    const boutons = [...document.querySelectorAll("button, a.btn-primary, [role=radio]")].filter((b) => b.getBoundingClientRect().width > 0).slice(0, 40);
    const sansBord = boutons.filter((b) => { const cs = getComputedStyle(b); return (cs.borderStyle === "none" || parseFloat(cs.borderWidth) === 0) && (cs.outlineStyle === "none" || parseFloat(cs.outlineWidth) === 0); }).map((b) => (b.textContent || b.getAttribute("aria-label") || "").trim().slice(0, 24));
    const cartes = [...document.querySelectorAll("main a[href], main article, main section")].filter((c) => c.getBoundingClientRect().width > 200).slice(0, 30);
    const cartesSansBord = cartes.filter((c) => { const cs = getComputedStyle(c); return parseFloat(cs.borderWidth) === 0; }).length;
    return { actif, boutons: boutons.length, sansBord, cartes: cartes.length, cartesSansBord };
  });
  // focus au clavier : premier bouton visible, lire outline
  await p.keyboard.press("Tab"); await p.keyboard.press("Tab"); await p.keyboard.press("Tab");
  const f = await p.evaluate(() => { const a = document.activeElement; if (!a || a === document.body) return "body"; const cs = getComputedStyle(a); return `${a.tagName.toLowerCase()} « ${(a.textContent || a.getAttribute("aria-label") || "").trim().slice(0, 20)} » outline ${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor} · box-shadow ${cs.boxShadow === "none" ? "none" : "présente"}`; });
  console.log(`${nom.padEnd(8)} forced-colors ${e.actif} · ${e.boutons} commandes visibles, ${e.sansBord.length} sans bordure${e.sansBord.length ? " (" + e.sansBord.slice(0, 5).join(" | ") + ")" : ""} · cartes/sections ${e.cartes}, sans bordure ${e.cartesSansBord} · focus : ${f}`);
  await p.screenshot({ path: `${process.env.S ?? "/tmp"}/forced-${nom}.png`, fullPage: false });
}
await nav.close();
