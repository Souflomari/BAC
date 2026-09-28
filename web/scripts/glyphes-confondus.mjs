/**
 * glyphes-confondus.mjs — une police ne dessine pas une lettre comme une autre.
 *
 * Né le 2026-09-24 d'une capture du manège : « à ω constante » s'affichait
 * « à Ω constante ». La table cmap de Geist 1.7.2 rattache U+03C9 (ω) au
 * glyphe uni03A9 (Ω) : toute vitesse angulaire écrite en TEXTE dans
 * l'interface (légendes, choix de QCM, étiquettes de misconceptions, titres)
 * se lisait en ohm. Rien ne pouvait le voir :
 *   - le texte source est juste — un grep y trouve « ω » ;
 *   - `polices-de-repli.mjs` cherche les caractères qu'une police N'A PAS ;
 *     Geist prétend avoir ω, il n'y a pas de repli, rien à signaler ;
 *   - une capture ne le montre qu'à qui lit la lettre, pas le mot.
 * C'est le PRODUIT — sa police — qui réécrit le caractère avant de l'écrire
 * (ADR 0039), et une police qui PRÉTEND avoir un glyphe est invisible à
 * l'instrument des replis.
 *
 * CE QUE LA PORTE MESURE. Pour chaque pile de polices du site, lue sur la page
 * RENDUE (le corps, la lecture en gras / italique, la mono — @font-face et
 * plages unicode compris), chaque caractère de l'inventaire du produit est
 * dessiné sur un canvas. Deux caractères DIFFÉRENTS qui donnent la même image,
 * à la même chasse, sont CONFONDUS : l'élève ne peut pas les distinguer.
 *
 * Ce qui a le droit de partager un glyphe, et pourquoi :
 *   - les équivalents de compatibilité (même forme NFKC) : µ U+00B5 et
 *     μ U+03BC, Ω U+2126 et Ω U+03A9, les espaces insécables et fines… — ce
 *     sont les mêmes lettres, Unicode le dit ;
 *   - les homoglyphes DE MÊME SENS que NFKC ne réunit pas, listés un par un
 *     avec leur sens dans le corpus (MEMES_SIGNES : ⟂ U+27C2 et ⊥ U+22A5,
 *     « perpendiculaire » tous les deux — mesuré le premier jour dans la
 *     mono de repli) ;
 *   - les caractères INVISIBLES par nature (séparateurs, formats, marques
 *     combinantes : \p{Z}, \p{C}, \p{M}) ne sont pas comparés ;
 *   - le « tofu » (un caractère qu'aucune police de la pile ne dessine, rendu
 *     comme la case d'un point de code non attribué) est compté À PART : une
 *     case vide n'est pas une lettre prise pour une autre, et ce que la machine
 *     de CI a comme polices système n'est pas ce qu'a le téléphone de l'élève.
 *
 * L'inventaire : tout caractère hors ASCII des fichiers que le site affiche
 * (content/, web/src/), diacritiques combinants exceptés.
 *
 * ESSAI ROUGE (--essai-rouge) : la page charge le fichier Geist BRUT, tel que
 * le site le sert, SANS la plage unicode de layout.tsx — et la porte doit y
 * entendre ω = Ω, et rien d'autre. Le jour où elle ne l'y entend plus, Geist a
 * corrigé sa cmap : la plage de layout.tsx peut partir, et cet essai avec.
 *
 * usage : node scripts/glyphes-confondus.mjs [--essai-rouge]
 *         (BASE=http://… pour un serveur déjà lancé ; sinon `next start` sur
 *          PORT_GLYPHES, 3497 par défaut)
 */
import { chromium } from "playwright-core";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const REPO = path.dirname(WEB);
const ESSAI_ROUGE = process.argv.includes("--essai-rouge");
const PORT = Number(process.env.PORT_GLYPHES ?? 3497);
const AUTONOME = !process.env.BASE;
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;

// ── L'inventaire : les caractères que le produit peut afficher ──────────────
const EXTENSIONS = new Set([".md", ".yaml", ".yml", ".json", ".svg", ".tsx", ".ts"]);
const vus = new Map();
function parcourir(dossier) {
  for (const e of fs.readdirSync(dossier, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name.startsWith(".")) continue;
    const p = path.join(dossier, e.name);
    if (e.isDirectory()) parcourir(p);
    else if (EXTENSIONS.has(path.extname(e.name))) {
      for (const c of fs.readFileSync(p, "utf8")) {
        const cp = c.codePointAt(0);
        if (cp <= 0x7e || cp >= 0x3000) continue;
        if (/\p{M}/u.test(c)) continue;
        vus.set(c, (vus.get(c) ?? 0) + 1);
      }
    }
  }
}
parcourir(path.join(REPO, "content"));
parcourir(path.join(WEB, "src"));
const inventaire = [...vus.keys()];
if (inventaire.length < 50) {
  console.error(`✗ INSTRUMENT MUET : ${inventaire.length} caractère(s) dans l'inventaire — le corpus n'a pas été lu.`);
  process.exit(2);
}

// ── Le site ─────────────────────────────────────────────────────────────────
let serveur = null;
if (AUTONOME) {
  serveur = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: WEB, stdio: "ignore", detached: true });
  const t0 = Date.now();
  let pret = false;
  while (Date.now() - t0 < 60000) {
    try {
      if ((await fetch(`${BASE}/`)).ok) {
        pret = true;
        break;
      }
    } catch {
      /* pas encore */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  if (!pret) {
    console.error("✗ serveur absent");
    try {
      process.kill(-serveur.pid);
    } catch {}
    process.exit(1);
  }
}
const arreter = () => {
  if (serveur?.pid) {
    try {
      process.kill(-serveur.pid);
    } catch {}
  }
};

const nav = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
const page = await nav.newPage({ viewport: { width: 1000, height: 700 } });
await page.goto(`${BASE}/`, { waitUntil: "load" });

const resultat = await page.evaluate(
  async ({ inventaire, essai }) => {
    // Les piles, lues sur des éléments posés avec les classes du site : ce
    // sont les @font-face et les plages unicode que l'élève reçoit.
    const lire = (html) => {
      const hote = document.createElement("div");
      hote.style.cssText = "position:absolute;left:-9999px;top:0";
      hote.innerHTML = html;
      document.body.appendChild(hote);
      const cible = hote.querySelector("[data-cible]");
      const s = getComputedStyle(cible);
      const r = { pile: s.fontFamily, poids: s.fontWeight, style: s.fontStyle };
      hote.remove();
      return r;
    };
    const corps = lire(`<span data-cible>x</span>`);
    const piles = [
      { nom: "interface", ...corps },
      { nom: "interface, gras", ...corps, poids: "600" },
      { nom: "lecture", ...lire(`<div class="prose-lesson"><p data-cible>x</p></div>`) },
      { nom: "lecture, gras", ...lire(`<div class="prose-lesson"><p><strong data-cible>x</strong></p></div>`) },
      { nom: "lecture, italique", ...lire(`<div class="prose-lesson"><p><em data-cible>x</em></p></div>`) },
      { nom: "mono", ...lire(`<div class="prose-lesson"><p><code data-cible>x</code></p></div>`) },
    ];

    if (essai) {
      // Le fichier Geist BRUT, tel que le site le sert, sans plage unicode.
      const premiere = corps.pile.split(",")[0].trim().replace(/^["']|["']$/g, "");
      let src = null;
      for (const f of document.styleSheets) {
        let regles;
        try {
          regles = f.cssRules;
        } catch {
          continue;
        }
        for (const r of regles)
          if (r instanceof CSSFontFaceRule && r.style.getPropertyValue("font-family").replace(/["']/g, "").trim() === premiere) {
            const m = /url\(["']?([^"')]+)["']?\)/.exec(r.style.getPropertyValue("src"));
            if (m) src = m[1];
          }
      }
      if (!src) return { erreur: `essai rouge : aucune @font-face pour « ${premiere} » — la pile du corps a changé de forme` };
      const brute = new FontFace("GeistBrutEssaiRouge", `url(${src})`, { weight: "100 900" });
      await brute.load();
      document.fonts.add(brute);
      piles.length = 0;
      piles.push({ nom: "Geist brut (sans plage unicode)", pile: `"GeistBrutEssaiRouge", ${corps.pile}`, poids: "400", style: "normal" });
    }

    // Toutes les faces déclarées, chargées une à une AVANT de dessiner : un
    // canvas ne déclenche pas de chargement, il dessine avec ce qui est là.
    // Les faces de repli `local("Arial")` échouent sur une machine qui n'a
    // pas Arial — c'est leur rôle d'être facultatives ; on les compte.
    let facesEchouees = 0;
    for (const f of [...document.fonts]) {
      try {
        await f.load();
      } catch {
        facesEchouees++;
      }
    }
    const c = document.createElement("canvas");
    c.width = 320;
    c.height = 180;
    const x = c.getContext("2d", { willReadFrequently: true });
    const empreinte = (ch, police) => {
      x.clearRect(0, 0, c.width, c.height);
      x.font = police;
      x.fillStyle = "#000";
      x.fillText(ch, 24, 128);
      const d = x.getImageData(0, 0, c.width, c.height).data;
      let h = 2166136261 >>> 0;
      let encre = 0;
      for (let i = 3; i < d.length; i += 4) {
        h = Math.imul(h ^ d[i], 16777619) >>> 0;
        encre += d[i];
      }
      return { cle: `${h}:${Math.round(x.measureText(ch).width * 16)}`, encre };
    };
    const INVISIBLE = /[\p{Z}\p{C}\p{M}]/u;
    // Des signes que Unicode tient pour des homoglyphes DE MÊME SENS
    // (confusables.txt) sans que NFKC les réunisse : ils ont le droit de
    // partager un glyphe. Un par ligne, avec ce qu'il veut dire dans le corpus.
    const MEMES_SIGNES = new Map([
      ["⟂", "⊥"], // « perpendiculaire » : U+27C2 (geometrie-espace) et U+22A5 (figures) — la mono de repli les dessine pareil
    ]);
    const classe = (ch) => {
      const n = ch.normalize("NFKC");
      return MEMES_SIGNES.get(n) ?? n;
    };
    const sortie = [];
    for (const p of piles) {
      const police = `${p.style} ${p.poids} 100px ${p.pile}`;
      // Le tofu de cette pile : deux points de code sans glyphe nulle part.
      const tofu = new Set([empreinte("͸", police).cle, empreinte("\u{10FFFD}", police).cle]);
      const groupes = new Map();
      let nTofu = 0;
      const vides = [];
      for (const ch of inventaire) {
        if (INVISIBLE.test(ch)) continue;
        const e = empreinte(ch, police);
        if (tofu.has(e.cle)) {
          nTofu++;
          continue;
        }
        if (e.encre === 0) {
          vides.push(ch);
          continue;
        }
        if (!groupes.has(e.cle)) groupes.set(e.cle, []);
        groupes.get(e.cle).push(ch);
      }
      const confondus = [];
      for (const g of groupes.values()) {
        if (g.length < 2) continue;
        const classes = new Set(g.map(classe));
        if (classes.size > 1) confondus.push(g);
      }
      sortie.push({ nom: p.nom, pile: p.pile, poids: p.poids, style: p.style, compares: [...groupes.values()].reduce((n, g) => n + g.length, 0), nTofu, vides, confondus });
    }
    return { sortie, faces: document.fonts.size, facesEchouees };
  },
  { inventaire, essai: ESSAI_ROUGE }
);

await nav.close();
arreter();

if (resultat.erreur) {
  console.error(`✗ ${resultat.erreur}`);
  process.exit(1);
}

const U = (ch) => `${ch} U+${ch.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`;
console.log(`glyphes-confondus — ${inventaire.length} caractères hors ASCII dans l'inventaire du produit${ESSAI_ROUGE ? " — ESSAI ROUGE" : ""}`);
console.log(`  ${resultat.faces} faces déclarées, chargées avant de dessiner ; ${resultat.facesEchouees} n'ont pas pu l'être (des replis local(), absents de cette machine)\n`);
let total = 0;
const tous = [];
for (const s of resultat.sortie) {
  total += s.confondus.length;
  for (const g of s.confondus) tous.push(g.map(U).join(" = "));
  console.log(`  ${s.confondus.length ? "✗" : "✓"} ${s.nom} (${s.style} ${s.poids}) — ${s.compares} caractère(s) comparés, ${s.nTofu} sans glyphe sur cette machine${s.vides.length ? `, ${s.vides.length} dessiné(s) VIDE(S) : ${s.vides.map(U).join(", ")}` : ""}`);
  console.log(`      ${s.pile}`);
  for (const g of s.confondus) console.log(`      CONFONDUS : ${g.map(U).join(" = ")}`);
}
console.log("");

if (ESSAI_ROUGE) {
  const attendu = tous.length === 1 && /ω U\+03C9/.test(tous[0]) && /Ω U\+03A9/.test(tous[0]);
  if (attendu) {
    console.log("━━ ESSAI ROUGE : dans le fichier Geist brut, ω = Ω a été entendu, et lui seul ✓ ━━");
    process.exit(0);
  }
  console.error(
    tous.length === 0
      ? "━━ ESSAI ROUGE : RIEN ENTENDU — soit la porte est aveugle, soit Geist a corrigé sa cmap (alors la plage unicode de layout.tsx peut partir, et cet essai avec) ━━"
      : `━━ ESSAI ROUGE : compte inattendu (${tous.length}) — ${tous.join(" ; ")} ━━`
  );
  process.exit(1);
}
if (total > 0) {
  console.error(`ROUGE — ${total} confusion(s) : une police du site dessine deux caractères différents du même glyphe.`);
  process.exit(1);
}
console.log(`VERT — ${resultat.sortie.length} piles, aucune ne dessine deux caractères différents du même glyphe.`);
process.exit(0);
