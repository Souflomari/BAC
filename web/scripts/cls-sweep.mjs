/**
 * Balayage CLS — ce que la page fait BOUGER pendant qu'elle charge.
 *
 * Sixième et dernière fenêtre de la journée du 2026-09-04 : la connexion
 * lente. Le « Cumulative Layout Shift » est la mesure standard du saut de
 * mise en page — le bouton qui se déplace sous le doigt au moment où on
 * appuie. Seuils Core Web Vitals : ≤ 0,10 bon, ≤ 0,25 à améliorer, au-delà
 * mauvais.
 *
 * On mesure deux fois : réseau libre, puis 3G lent (400 kb/s, 400 ms de
 * latence) via CDP. Sans bridage, tout vaut 0,000 — c'est précisément
 * pourquoi personne ne l'avait vu : la mesure sur une machine de
 * développement ne peut pas trouver ce défaut.
 *
 * RÉSULTAT (2026-09-04) : tout est bon sauf `/examens/<id>`, à **0,320** —
 * mauvais. Cause isolée par élimination : en bloquant les fichiers de
 * fontes, le CLS tombe à 0,000. C'est donc l'échange de fonte
 * (`font-display: swap`) qui re-coupe les lignes du seuil d'épreuve et
 * déplace le bouton « Commencer l'épreuve » de 98 px.
 *
 * Deuxième essai, pour chiffrer l'option : passer le SÉRIF en
 * `display: optional` fait tomber `suites-numeriques` de 0,091 à 0,002 mais
 * ne change RIEN sur la page d'épreuve — dont le texte est en fonte d'UI.
 * L'essai a été défait : changer le `font-display` de la fonte d'identité
 * modifie ce que voit un élève en première visite lente, et c'est un
 * arbitrage de propriétaire, pas un correctif. Le chiffre est là pour qu'il
 * se décide sur un fait.
 *
 * Cet outil n'est PAS une porte : on n'arme pas une porte sur une classe
 * qui n'est pas propre.
 */
import { chromium } from "playwright-core";
const BASE = process.env.BASE ?? "http://localhost:3477";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const routes = ["/", "/notions/pc/rlc-serie", "/notions/maths/suites-numeriques", "/examens", "/examens/spc-2023-normale", "/matieres/pc", "/notions/svt/moyens-de-defense"];
for (const lent of [false, true]) {
  console.log(`\n=== ${lent ? "3G lent (400 kb/s, 400 ms de latence)" : "réseau libre"}`);
  for (const r of routes) {
    const p = await b.newPage({ viewport: { width: 390, height: 780 } });
    const cdp = await p.context().newCDPSession(p);
    await cdp.send("Network.enable");
    if (lent) {
      await cdp.send("Network.emulateNetworkConditions", {
        offline: false, latency: 400, downloadThroughput: (400 * 1024) / 8, uploadThroughput: (400 * 1024) / 8,
      });
    }
    await p.addInitScript(() => {
      window.__cls = 0; window.__sources = [];
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) {
          if (e.hadRecentInput) continue;
          window.__cls += e.value;
          for (const s of e.sources ?? []) {
            const n = s.node;
            if (!n || !n.tagName) continue;
            window.__sources.push(`${n.tagName.toLowerCase()}.${String(n.className || "").trim().split(/\s+/).slice(0,2).join(".")} (${e.value.toFixed(3)})`);
          }
        }
      }).observe({ type: "layout-shift", buffered: true });
    });
    await p.goto(`${BASE}${r}`, { waitUntil: "load" });
    await p.waitForTimeout(lent ? 4000 : 1500);
    const m = await p.evaluate(() => ({ cls: window.__cls, src: [...new Set(window.__sources)].slice(0, 4) }));
    const verdict = m.cls > 0.25 ? "MAUVAIS" : m.cls > 0.1 ? "à améliorer" : "bon";
    console.log(`  ${m.cls.toFixed(3)}  ${verdict.padEnd(12)} ${r}`);
    if (m.cls > 0.1) for (const s of m.src) console.log(`         ← ${s}`);
    await p.close();
  }
}
await b.close();
