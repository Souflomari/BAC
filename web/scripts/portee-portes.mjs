#!/usr/bin/env node
//
//  portee-portes.mjs — ce qu'une porte VERTE a réellement regardé
//
//  ADR 0031 : « un badge vert dit que rien n'a échoué, pas que tout a été
//  mesuré. » Une porte peut être verte pour deux raisons opposées : parce que
//  le corpus est propre, ou parce que son scan ne tourne sur RIEN — un champ
//  que plus aucun fichier ne porte, un glob qui ne résout plus, une extension
//  renommée. Les deux impriment le même ✓.
//
//  Cet instrument sépare les deux. Il lance la porte sous la couverture V8,
//  puis, pour CHAQUE point d'échec du script, remonte les plages englobantes
//  jusqu'à la première dont le compteur est > 0 : c'est le scan qui entoure ce
//  point, et son compteur est la PORTÉE de la porte.
//
//  À LIRE AVEC PRÉCAUTION — la leçon du 2026-09-20. Une portée basse n'est PAS
//  un défaut en soi : une porte qui ne concerne que les figures interactives a
//  une portée de 5 parce qu'il n'y a que 5 figures interactives. Le verdict
//  n'existe qu'en comparant la portée au DÉNOMINATEUR que la porte est censée
//  couvrir. Les deux « écarts » trouvés la première fois étaient des erreurs de
//  MA sonde (un glob `.control.json` là où les fichiers sont `.interactive.json` ;
//  un marqueur compté alors qu'il est dans un commentaire HTML), pas des trous.
//  Vérifie le dénominateur avant d'accuser la porte.
//
//  USAGE  node scripts/portee-portes.mjs [--porte "<commande>"] [--seuil N]
//
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execSync } from "node:child_process";

const A = process.argv.slice(2);
const opt = (n, d) => { const i = A.indexOf(`--${n}`); return i === -1 ? d : A[i + 1]; };
const SEUIL = Number(opt("seuil", 62));
const CIBLE = opt("script", "scripts/validate-content.mjs");

const dirs = execSync(
  "find ../content -mindepth 2 -maxdepth 2 -type d -not -path '*_media-test*' | sed 's|^\\.\\./||' | sort",
  { encoding: "utf8" },
).trim().split("\n").join(" ");
const porte = opt("porte", `node ${CIBLE} --strict ${dirs}`);

const cov = fs.mkdtempSync(path.join(os.tmpdir(), "portee-"));
try { execSync(porte, { env: { ...process.env, NODE_V8_COVERAGE: cov }, stdio: "ignore" }); } catch { /* rouge ou vert, peu importe ici */ }

const src = fs.readFileSync(CIBLE, "utf8");
let scriptCov = null;
for (const f of fs.readdirSync(cov)) {
  for (const s of JSON.parse(fs.readFileSync(path.join(cov, f), "utf8")).result) {
    if (s.url.endsWith(path.basename(CIBLE))) scriptCov = s;
  }
}
fs.rmSync(cov, { recursive: true, force: true });
if (!scriptCov) { console.error(`✗ aucune couverture produite pour ${CIBLE} — la porte a-t-elle tourné ?`); process.exit(2); }

const plages = scriptCov.functions.flatMap((fn) => fn.ranges.map((r) => [r.startOffset, r.endOffset, r.count]));
const ligne = (off) => src.slice(0, off).split("\n").length;

//  ── CORRIGÉ le 2026-09-20, par son propre essai rouge ───────────────────
//  La première version remontait jusqu'à la première plage englobante de
//  compteur > 0 et appelait ça « la portée ». C'est FAUX : quand le scan d'une
//  porte ne tourne pas, cette remontée continue jusqu'à la boucle `for (const
//  dir of dirs)` qui, elle, tourne 62 fois — et l'instrument annonçait donc une
//  portée de 62 pour une porte qui ne regardait rien. Vérifié en tuant
//  volontairement une porte (un nom de fichier inexistant) : l'instrument est
//  resté VERT. Il était aveugle exactement au défaut qu'il devait voir.
//
//  Le discriminant correct est la LARGEUR de la région à zéro qui entoure le
//  point d'échec. Une branche d'échec inerte parce que rien n'échoue ne
//  contient que son `console.error(...)` et son `dirFail++`. Un scan MORT
//  entraîne une région à zéro bien plus large, qui contient encore du code de
//  balayage — une boucle, une lecture de fichier, un test d'expression.
const BALAYAGE = /\bfor\s*\(|readFileSync|matchAll|\.test\(|\.split\(|existsSync/;
const sites = [...src.matchAll(/dirFail\+\+|failures\+\+/g)].map((m) => m.index);
const mesures = sites.map((off) => {
  const conts = plages.filter(([a, b]) => a <= off && off < b).sort((x, y) => (x[1] - x[0]) - (y[1] - y[0]));
  const etroite = conts[0];
  const portee = conts.find(([, , c]) => c > 0)?.[2] ?? 0;
  let mort = portee === 0;
  if (!mort && etroite && etroite[2] === 0) {
    //  on retire du segment à zéro ce qui appartient à la branche d'échec
    //  elle-même ; s'il reste du code de balayage, c'est le SCAN qui est mort.
    const reste = src.slice(etroite[0], etroite[1])
      .replace(/console\.(error|warn|log)\([\s\S]*?\);/g, "")
      .replace(/dirFail\+\+|failures\+\+|continue;|break;/g, "");
    if (BALAYAGE.test(reste)) mort = true;
  }
  return { l: ligne(off), portee: mort ? 0 : portee, mort };
});

const morts = mesures.filter((m) => m.mort);
const bas = mesures.filter((m) => !m.mort && m.portee > 0 && m.portee <= SEUIL).sort((a, b) => a.portee - b.portee);

console.log(`\n━━ portée des portes de ${path.basename(CIBLE)} ━━`);
console.log(`   ${sites.length} point(s) d'échec · ${sites.length - morts.length} atteint(s) par un scan qui tourne · ${morts.length} jamais atteint(s)\n`);

for (const m of morts) console.log(`  ✗ l.${m.l} — AUCUN scan ne l'atteint : cette porte ne regarde RIEN, son vert ne dit rien`);
if (bas.length) {
  console.log(`  Portées ≤ ${SEUIL} — à confronter chacune à son dénominateur avant tout verdict :`);
  for (const m of bas) console.log(`    portée ${String(m.portee).padStart(5)} · l.${m.l}`);
}
const haut = mesures.length - morts.length - bas.length;
console.log(`\n  ${haut} porte(s) de portée > ${SEUIL}.`);
console.log(morts.length === 0
  ? `  ✓ aucune porte morte : chaque point d'échec est dans un scan qui s'exécute.`
  : `  ✗ ${morts.length} porte(s) morte(s) — un vert non mérité.`);
process.exit(morts.length === 0 ? 0 : 1);
