/**
 * scene-ergonomie.mjs — la famille « ergonomie » des portes de scène 3D.
 *
 * POURQUOI (revue ergonomie du 2026-09-24, HANDOFF §11.195). Les cinq portes
 * mesuraient les nombres, les pixels, les paris — et une seule touche de
 * clavier (deux flèches sur un curseur). Or la revue a trouvé, sur le RENDU :
 * le focus renvoyé à <body> à l'ouverture, à chaque pari et en revenant à
 * l'étape 1 ; « Suivant » qui laisse l'écran sur la queue du panneau ; des
 * curseurs de 16 px. ADR 0041 §7 exige que le contrat de focus soit « vérifié
 * en donnant le focus, pas en le supposant » — rien ne le vérifiait.
 *
 * CE QUI EST MESURÉ, au clavier seulement (aucun clic) :
 *   · ouverture — Entrée sur « Ouvrir la scène 3D » : le focus arrive sur le
 *     titre de l'étape, dans le panneau ;
 *   · pari — Entrée sur un choix : le focus reste dans le panneau ;
 *   · étape — Entrée sur « Suivant » : le focus est sur le titre de l'étape
 *     neuve, et ce titre est VISIBLE (sous le header, dans la fenêtre) ;
 *   · retour — Entrée sur « Précédent » jusqu'à l'étape 1 : le focus ne tombe
 *     pas à <body> ;
 *   · marge (téléphone, 390 px) — Tab de commande en commande : aucune n'est
 *     rangée sous la scène collante ni sous le header (WCAG 2.2 — 2.4.11) ;
 *   · cibles — chaque curseur et chaque bouton visible du panneau mesure au
 *     moins 44 px de haut (le plancher du dépôt est 48 ; 44 est le seuil WCAG
 *     2.5.5 — la porte arme le normatif, ADR 0039).
 *
 * Tout se passe dans des pages NEUVES : la famille ne dépend pas du parcours
 * principal de la porte, et ne le perturbe pas. WebGL n'y sert à rien — ce sont
 * des faits de DOM — mais la scène s'ouvre pour de vrai.
 *
 * `essai` (--essai-rouge) retourne l'attente, comme pour les autres familles ;
 * la preuve que la famille VOIT est faite sur le PRODUIT (ADR 0038) : voir
 * HANDOFF §11.195 pour les deux sabotages rejoués.
 */

const HEADER = 56;

/** Ouvre la leçon à `url`, attend React, et rend la page et le sélecteur du panneau. */
async function ouvrirPage(nav, url, scene, largeur, hauteur) {
  const ctx = await nav.newContext({ viewport: { width: largeur, height: hauteur }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: "load", timeout: 60000 });
  await p.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
  const sel = `[data-scene="${scene}"]`;
  await p.waitForFunction(
    (s) => {
      const b = [...document.querySelectorAll(`${s} button`)].find((x) => x.textContent?.includes("Ouvrir la scène 3D"));
      return b && !b.disabled;
    },
    sel,
    { timeout: 40000 }
  ).catch(() => {});
  return { ctx, p, sel };
}

/** Où est le focus : dans le panneau ? sur le titre ? à <body> ? visible ? */
async function focus(p, sel) {
  return p.evaluate(
    ({ s, header }) => {
      const a = document.activeElement;
      const r = a?.getBoundingClientRect();
      return {
        corps: !a || a === document.body,
        dans: !!a?.closest(s),
        titre: a?.hasAttribute?.("data-titre-etape") ?? false,
        visible: !!r && r.height > 0 && r.top >= header - 1 && r.bottom <= innerHeight + 1,
        quoi: a ? `${a.tagName.toLowerCase()}${a.getAttribute("aria-label") ? `[${a.getAttribute("aria-label")}]` : ""} « ${(a.textContent ?? "").trim().slice(0, 40)} »` : "rien",
      };
    },
    { s: sel, header: HEADER }
  );
}

/** Les cibles visibles du panneau sous 44 px de haut. */
export async function cibles(p, sel) {
  return p.evaluate((s) => {
    const panneau = document.querySelector(s);
    if (!panneau) return { n: 0, petites: ["panneau absent"] };
    const vis = (e) => {
      const r = e.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== "hidden";
    };
    const els = [...panneau.querySelectorAll('button, input[type="range"], input[type="radio"]')].filter(vis);
    const petites = [];
    for (const e of els) {
      // Un bouton radio natif est petit PAR NATURE : sa cible, c'est la ligne
      // <label> qui l'enveloppe.
      const cible = e.type === "radio" ? e.closest("label") ?? e : e;
      const h = cible.getBoundingClientRect().height;
      if (h < 44 - 0.5) petites.push(`${cible.tagName.toLowerCase()}${e.type ? `[${e.type}]` : ""} « ${(cible.textContent ?? "").trim().slice(0, 30) || e.getAttribute("aria-label") || ""} » : ${Math.round(h)} px`);
    }
    return { n: els.length, petites };
  }, sel);
}

/**
 * La famille entière. `noter(famille, ok, detail)` est celui de la porte ;
 * `url` est l'URL du chapitre de la scène ; `lancer(args)` lance Chromium
 * comme la porte le lance.
 */
export async function ergonomie({ lancer, url, scene, noter, essai }) {
  const nav = await lancer([]);
  const dire = (ok, detail) => noter("ergonomie", essai ? !ok : ok, detail);
  try {
    // ── Grand écran : ouvrir, parier, avancer, revenir — au clavier ──
    {
      const { p, sel } = await ouvrirPage(nav, url, scene, 1280, 900);
      const q = p.locator(sel);
      await q.scrollIntoViewIfNeeded();
      await q.getByRole("button", { name: "Ouvrir la scène 3D" }).focus();
      await p.keyboard.press("Enter");
      await p.waitForFunction((s) => document.querySelector(s)?.getAttribute("data-scene-etat") !== "ferme", sel, { timeout: 20000 }).catch(() => {});
      await p.waitForTimeout(400);
      const f1 = await focus(p, sel);
      dire(f1.dans && f1.titre, `ouverture au clavier : focus sur ${f1.quoi}${f1.corps ? " — TOMBÉ À <body>" : ""}`);

      const choix = q.locator("[data-pari-choix] button").first();
      if (await choix.count()) {
        await choix.focus();
        await p.keyboard.press("Enter");
        await p.waitForTimeout(400);
        const f2 = await focus(p, sel);
        dire(f2.dans && !f2.corps, `pari au clavier : focus sur ${f2.quoi}${f2.corps ? " — TOMBÉ À <body>" : ""}`);
      } else dire(false, "pari au clavier : aucun choix à l'étape 1");

      const suivant = q.getByRole("button", { name: "Étape suivante" });
      if (await suivant.count()) {
        await suivant.focus();
        await p.keyboard.press("Enter");
        await p.waitForTimeout(400);
        const f3 = await focus(p, sel);
        dire(f3.titre && f3.visible, `« Suivant » au clavier : focus sur ${f3.quoi}, ${f3.visible ? "visible" : "HORS DE VUE"}`);
        const precedent = q.getByRole("button", { name: "Étape précédente" });
        await precedent.focus();
        await p.keyboard.press("Enter");
        await p.waitForTimeout(300);
        // À l'étape 1, « Précédent » est inerte mais doit rester FOCALISABLE
        // (sinon le revenir y désactive le bouton sous le doigt, et le focus
        // tombe) : on lui rend le focus, on appuie encore, il doit le garder.
        await precedent.focus().catch(() => {});
        const tient = await precedent.evaluate((b) => document.activeElement === b).catch(() => false);
        await p.keyboard.press("Enter");
        await p.waitForTimeout(200);
        const f4 = await focus(p, sel);
        const rang = await q.locator("[data-rang-etape]").textContent().catch(() => "");
        dire(tient && !f4.corps && f4.dans && /Étape 1 \//.test(rang ?? ""),
          `retour à l'étape 1 au clavier (${(rang ?? "").trim() || "rang absent"}) : « Précédent » ${tient ? "garde le focus, inerte" : "NE PEUT PAS le garder"} ; focus sur ${f4.quoi}`);
      } else dire(false, "« Suivant » introuvable");
      await p.context().close();
    }

    // ── Téléphone : Tab de commande en commande, rien sous la scène collante ──
    {
      const { p, sel } = await ouvrirPage(nav, url, scene, 390, 844);
      const q = p.locator(sel);
      await q.scrollIntoViewIfNeeded();
      await q.getByRole("button", { name: "Ouvrir la scène 3D" }).focus();
      await p.keyboard.press("Enter");
      await p.waitForFunction((s) => document.querySelector(s)?.getAttribute("data-scene-etat") !== "ferme", sel, { timeout: 20000 }).catch(() => {});
      await p.waitForTimeout(400);
      const choix = q.locator("[data-pari-choix] button").first();
      if (await choix.count()) {
        await choix.focus();
        await p.keyboard.press("Enter");
        await p.waitForTimeout(400);
      }
      const c = await cibles(p, sel);
      dire(c.n > 0 && c.petites.length === 0, `cibles au téléphone (390 px) : ${c.n} commande(s) visibles, ${c.petites.length ? `sous 44 px : ${c.petites.slice(0, 4).join(" · ")}` : "toutes ≥ 44 px"}`);

      // Tab depuis le titre, jusqu'à sortir du panneau.
      await q.locator("[data-titre-etape]").focus();
      const caches = [];
      let vus = 0;
      for (let i = 0; i < 40; i++) {
        await p.keyboard.press("Tab");
        await p.waitForTimeout(60);
        const m = await p.evaluate(
          ({ s, header }) => {
            const a = document.activeElement;
            if (!a || !a.closest(s)) return { sorti: true };
            const r = a.getBoundingClientRect();
            const collant = document.querySelector(s)?.querySelector("canvas")?.closest(".sticky");
            const dansCollant = !!collant?.contains(a);
            const bas = collant ? collant.getBoundingClientRect().bottom : header;
            // La scène collante ne couvre que ce qui défile SOUS elle, dans sa
            // grille ; le transport est hors de la grille : seul le header compte.
            const sousGrille = !!collant && !!a.closest(".grid") && collant.closest(".grid") === a.closest(".grid");
            const plancher = dansCollant ? header : sousGrille ? bas : header;
            return { sorti: false, ok: r.top >= plancher - 1, quoi: `${a.tagName.toLowerCase()} « ${(a.textContent ?? a.getAttribute("aria-label") ?? "").trim().slice(0, 30)} »`, top: Math.round(r.top), plancher: Math.round(plancher) };
          },
          { s: sel, header: HEADER }
        );
        if (m.sorti) break;
        vus++;
        if (!m.ok) caches.push(`${m.quoi} à ${m.top} px, sous ${m.plancher} px`);
      }
      dire(vus > 0 && caches.length === 0, `marge au téléphone : ${vus} commande(s) atteintes au Tab, ${caches.length ? `CACHÉES : ${caches.slice(0, 3).join(" · ")}` : "aucune sous la scène collante ni sous le header"}`);
      await p.context().close();
    }
  } finally {
    await nav.close();
  }
}
