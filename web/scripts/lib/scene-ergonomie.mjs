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
 *     2.5.5 — la porte arme le normatif, ADR 0039) ;
 *   · cibles, suite (vague 2 des noyaux, 2026-09-24) — le `<summary>` d'un
 *     encadré est une commande : la mesure ne cherchait que `button` et
 *     `input`, et les encadrés « ce que cette scène simplifie » de la cuve, de
 *     la corde et des noyaux mesuraient 18 px sans qu'elle le voie (rejoué
 *     avant correction : 18 px aux trois, à 390 et à 1 280 px). Une cible a
 *     plusieurs FORMES (ADR 0036). Les liens restent hors de la mesure : un
 *     lien DANS une phrase est exempté par WCAG 2.5.8 (« inline ») ;
 *   · révélation après une course — au clavier : Entrée sur « Lancer… », la
 *     course va au bout, le verdict s'affiche ; le focus doit être VISIBLE.
 *     Rejoué avant correction : il restait sur « Relancer », que le verdict,
 *     la suite et les lectures insérés au-dessus avaient poussé à 1 000 px
 *     sous l'écran (cuve, corde, noyaux, 390 et 1 280 px) — Entrée relançait
 *     à l'aveugle. Seulement pour les scènes à course (`course` : le nombre de
 *     « Suivant » jusqu'à l'étape dont le pari attend la course) ;
 *   · lectures — une liste de lectures (<dl>) ne contient que des couples
 *     terme/valeur : la vague 2 de la cuve avait rangé ses notes (paragraphes,
 *     <details>) AU MILIEU de la liste, entre deux lectures — HTML invalide,
 *     lu par un lecteur d'écran comme une lecture de plus, et masqué avant le
 *     verdict avec la liste (la note « eau pâle » ne s'affichait donc jamais
 *     pendant la première course, celle qui l'exige). Vu à la relecture du
 *     code, pas par une porte : 2026-09-24.
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
async function ouvrirPage(nav, url, scene, largeur, hauteur, ouvrir) {
  const ctx = await nav.newContext({ viewport: { width: largeur, height: hauteur }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: "load", timeout: 60000 });
  await p.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
  const sel = `[data-scene="${scene}"]`;
  await p.waitForFunction(
    ({ s, o }) => {
      const b = [...document.querySelectorAll(`${s} button`)].find((x) => x.textContent?.includes(o));
      return b && !b.disabled;
    },
    { s: sel, o: ouvrir },
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
    const els = [...panneau.querySelectorAll('button, input[type="range"], input[type="radio"], summary')].filter(vis);
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

/** Les listes de lectures du panneau : un enfant qui n'est pas un couple dt/dd est une faute. */
export async function listes(p, sel) {
  return p.evaluate((s) => {
    const panneau = document.querySelector(s);
    const fautes = [];
    let n = 0;
    for (const dl of panneau?.querySelectorAll("dl") ?? []) {
      n++;
      for (const e of dl.children) {
        const t = e.tagName.toLowerCase();
        if (t === "dt" || t === "dd") continue;
        const enfants = [...e.children].map((c) => c.tagName.toLowerCase());
        if (t === "div" && enfants.length > 0 && enfants.every((c) => c === "dt" || c === "dd")) continue;
        fautes.push(`<${t}${e.getAttributeNames().filter((a) => a.startsWith("data-")).map((a) => ` ${a}`).join("")}> (${enfants.join(",") || "texte"})`);
      }
    }
    return { n, fautes };
  }, sel);
}

/**
 * La famille entière. `noter(famille, ok, detail)` est celui de la porte ;
 * `url` est l'URL du chapitre de la scène ; `lancer(args)` lance Chromium
 * comme la porte le lance ; `ouvrir` est le libellé du bouton d'ouverture
 * (« Ouvrir la cuve à ondes » pour la scène plane).
 */
export async function ergonomie({ lancer, url, scene, noter, essai, ouvrir = "Ouvrir la scène 3D", course }) {
  const nav = await lancer([]);
  const dire = (ok, detail) => noter("ergonomie", essai ? !ok : ok, detail);
  try {
    // ── Grand écran : ouvrir, parier, avancer, revenir — au clavier ──
    {
      const { p, sel } = await ouvrirPage(nav, url, scene, 1280, 900, ouvrir);
      const q = p.locator(sel);
      await q.scrollIntoViewIfNeeded();
      await q.getByRole("button", { name: ouvrir }).focus();
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
        const l = await listes(p, sel);
        dire(l.fautes.length === 0, `lectures après le pari : ${l.n} liste(s), ${l.fautes.length ? `INTRUS : ${l.fautes.slice(0, 3).join(" · ")}` : "rien que des couples terme/valeur"}`);
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
      const { p, sel } = await ouvrirPage(nav, url, scene, 390, 844, ouvrir);
      const q = p.locator(sel);
      await q.scrollIntoViewIfNeeded();
      await q.getByRole("button", { name: ouvrir }).focus();
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
      let grilleVus = 0;
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
            const rc = collant ? collant.getBoundingClientRect() : null;
            const bas = rc ? rc.bottom : header;
            // La scène collante ne couvre que ce qui défile SOUS elle, dans sa
            // grille ; le transport est hors de la grille : seul le header compte.
            // (La grille est nommée par un attribut, pas par la classe `.grid` :
            // au téléphone c'est une colonne flex — voir GRILLE_SCENE.)
            // (et `.grid` : la forme d'avant l'attribut)
            const grille = a.closest("[data-scene-grille], .grid");
            const sousGrille = !!collant && !!grille && collant.closest("[data-scene-grille], .grid") === grille;
            const plancher = dansCollant ? header : sousGrille ? bas : header;
            return { sorti: false, ok: r.top >= plancher - 1, dansGrille: sousGrille && !dansCollant, quoi: `${a.tagName.toLowerCase()} « ${(a.textContent ?? a.getAttribute("aria-label") ?? "").trim().slice(0, 30)} »`, top: Math.round(r.top), plancher: Math.round(plancher) };
          },
          { s: sel, header: HEADER }
        );
        if (m.sorti) break;
        vus++;
        if (!m.ok) caches.push(`${m.quoi} à ${m.top} px, sous ${m.plancher} px`);
        if (m.dansGrille) grilleVus++;
      }
      // Zéro commande reconnue dans la colonne des réglages : la marge n'a été
      // mesurée que contre le header — une mesure MUETTE, pas un vert (ADR 0034 ;
      // l'attribut `data-scene-grille` avait d'abord manqué à l'ancien panneau).
      dire(vus > 0 && grilleVus > 0 && caches.length === 0, `marge au téléphone : ${vus} commande(s) atteintes au Tab, dont ${grilleVus} dans la colonne des réglages, ${grilleVus === 0 ? "AUCUNE reconnue dans la colonne — mesure muette" : caches.length ? `CACHÉES : ${caches.slice(0, 3).join(" · ")}` : "aucune sous la scène collante ni sous le header"}`);
      // LA SCÈNE COLLE-T-ELLE ? Le test mécanique, pas une impression : la
      // grille remontée 120 px au-dessus de l'écran, la scène doit rester sous le
      // header. (La vague 2 de la corde affirmait la scène inerte au téléphone ;
      // ce test, rejoué sur l'ancien panneau, a dit le contraire. Il reste pour
      // qu'un changement de mise en page ne la décolle pas en silence.)
      const meca = await p.evaluate(
        ({ s, header }) => {
          const collant = document.querySelector(s)?.querySelector("canvas")?.closest(".sticky");
          const grille = collant?.closest("[data-scene-grille], .grid");
          if (!collant || !grille) return null;
          window.scrollBy(0, grille.getBoundingClientRect().top + 120);
          return { haut: Math.round(collant.getBoundingClientRect().top), grille: Math.round(grille.getBoundingClientRect().top) };
        },
        { s: sel, header: HEADER }
      );
      dire(!!meca && Math.abs(meca.haut - HEADER) <= 2, `scène collante au téléphone : grille à ${meca ? meca.grille : "?"} px, scène à ${meca ? meca.haut : "ABSENTE"} px (attendu ${HEADER} : collée sous le header)`);
      await p.context().close();
    }
    // ── Révélation après une course, au clavier : le focus reste VISIBLE ──
    // (un navigateur à part, avec le rendu logiciel : une scène 3D doit TOURNER
    // pour que sa course aille au bout — le reste de la famille s'en passe)
    if (course !== undefined) {
      const navC = await lancer(["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"]);
      try {
        for (const [largeur, hauteur] of [[1280, 900], [390, 844]]) {
          const { p, sel } = await ouvrirPage(navC, url, scene, largeur, hauteur, ouvrir);
          const q = p.locator(sel);
          await q.scrollIntoViewIfNeeded();
          await q.getByRole("button", { name: ouvrir }).focus();
          await p.keyboard.press("Enter");
          await p.waitForFunction((s) => document.querySelector(s)?.getAttribute("data-scene-etat") !== "ferme", sel, { timeout: 20000 }).catch(() => {});
          await p.waitForTimeout(400);
          for (let k = 0; k < course; k++) {
            await q.getByRole("button", { name: "Étape suivante" }).focus();
            await p.keyboard.press("Enter");
            await p.waitForTimeout(250);
          }
          const choix = q.locator("[data-pari-choix] button").first();
          // le bouton de la course : marqué `data-lancer` dans les six panneaux à course
          // (le banc d'électrolyse dit « Fermer le circuit », le geste de la paillasse) ;
          // sinon, son texte (« Lancer le temps » des scènes 3D)
          // (un locator est PARESSEUX : le bouton n'existe qu'après le pari)
          const lance = q.locator("button[data-lancer]").or(q.locator("button").filter({ hasText: /^\s*Lancer/ })).first();
          if (!(await choix.count()) || (await q.getAttribute("data-pari")) !== "attente") {
            dire(false, `révélation après une course (${largeur} px) : l'étape ${course + 1} n'attend pas de pari — mesure muette`);
            await p.context().close();
            continue;
          }
          await choix.focus();
          await p.keyboard.press("Enter");
          await p.waitForTimeout(300);
          if (!(await lance.count())) {
            dire(false, `révélation après une course (${largeur} px) : aucun bouton « Lancer… » après le pari — mesure muette`);
            await p.context().close();
            continue;
          }
          await lance.focus();
          await p.keyboard.press("Enter");
          const venue = await p.waitForFunction((s) => document.querySelector(s)?.getAttribute("data-pari") === "revele", sel, { timeout: 45000 }).then(() => true, () => false);
          await p.waitForTimeout(500);
          // VISIBLE : dans la fenêtre, et — au téléphone — pas sous la scène
          // collante quand il est dans sa grille (même plancher que la marge).
          const f = await p.evaluate(
            ({ s, header }) => {
              const a = document.activeElement;
              if (!a || a === document.body) return { corps: true, quoi: "<body>" };
              const r = a.getBoundingClientRect();
              const collant = document.querySelector(s)?.querySelector("canvas")?.closest(".sticky");
              const grille = a.closest("[data-scene-grille], .grid");
              const sousGrille = !!collant && !collant.contains(a) && !!grille && collant.closest("[data-scene-grille], .grid") === grille;
              // la scène ne couvre que ce qui passe SOUS elle : au téléphone
              // (empilée) ; sur grand écran elle est À CÔTÉ de la colonne — son
              // bas (1 035 px au premier passage) n'y est pas un plancher
              const rc = collant?.getBoundingClientRect();
              const couvre = sousGrille && !!rc && rc.left < r.right && r.left < rc.right;
              const plancher = couvre ? rc.bottom : header;
              return {
                corps: false,
                visible: r.height > 0 && r.top >= plancher - 1 && r.bottom <= innerHeight + 1,
                quoi: `${a.tagName.toLowerCase()} « ${(a.textContent ?? "").trim().slice(0, 30)} »`,
                haut: Math.round(r.top),
                plancher: Math.round(plancher),
              };
            },
            { s: sel, header: HEADER }
          );
          dire(venue && !f.corps && f.visible,
            `révélation après une course, au clavier (${largeur} px) : ${venue ? `focus sur ${f.quoi} à ${f.haut} px (fenêtre de ${f.plancher} à ${hauteur} px), ${f.visible ? "visible" : "HORS DE VUE"}` : "la révélation n'est pas venue en 45 s — mesure muette"}`);
          await p.context().close();
        }
      } finally {
        await navC.close();
      }
    }
  } finally {
    await nav.close();
  }
}
