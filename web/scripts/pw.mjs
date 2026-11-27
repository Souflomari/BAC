#!/usr/bin/env node
/**
 * pw — lance une porte au navigateur avec un Chromium trouvé SUR CETTE MACHINE.
 *
 * Les portes au navigateur lisent `PW_CHROMIUM_PATH` et retombent sur `/opt/pw-browsers/chromium`,
 * le chemin du conteneur cloud où elles ont été écrites. Sur une machine locale ce chemin n'existe
 * pas ; la CI, elle, exporte le chemin du Chromium que `playwright-core` a installé. Ce lanceur fait
 * la même chose que la CI, sans toucher aux 79 scripts :
 *
 *   1. `PW_CHROMIUM_PATH` déjà posé → gardé tel quel ;
 *   2. sinon `/opt/pw-browsers/chromium` s'il existe (le conteneur) ;
 *   3. sinon le Chromium de `playwright-core` (`npx playwright-core install chromium` l'installe).
 *
 *   node scripts/pw.mjs scene-champ-pentes --porte
 *   npm run pw -- dom-truth
 *
 * Il ne mesure rien lui-même : il pose une variable et passe la main. POSIX seulement — les portes
 * lancent `next start` détaché et le tuent par groupe de processus (Linux, macOS, WSL2).
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const [nom, ...args] = process.argv.slice(2);
if (!nom) {
  console.error("usage : node scripts/pw.mjs <porte> [arguments]   (ex. scene-champ-pentes --porte)");
  process.exit(2);
}
const ici = dirname(fileURLToPath(import.meta.url));
const script = join(ici, nom.endsWith(".mjs") ? nom : `${nom}.mjs`);
if (!existsSync(script)) {
  console.error(`pw : ${script} introuvable`);
  process.exit(2);
}

let chemin = process.env.PW_CHROMIUM_PATH;
let source = "PW_CHROMIUM_PATH";
if (!chemin && existsSync("/opt/pw-browsers/chromium")) { chemin = "/opt/pw-browsers/chromium"; source = "conteneur"; }
if (!chemin) {
  try {
    const c = createRequire(import.meta.url)("playwright-core").chromium.executablePath();
    if (c && existsSync(c)) { chemin = c; source = "playwright-core"; }
  } catch { /* playwright-core absent : message ci-dessous */ }
}
if (!chemin) {
  console.error("pw : aucun Chromium trouvé. Depuis web/ : npx playwright-core install chromium");
  process.exit(2);
}
console.error(`pw : Chromium (${source}) ${chemin}`);
const enfant = spawn(process.execPath, [script, ...args], { stdio: "inherit", env: { ...process.env, PW_CHROMIUM_PATH: chemin } });
enfant.on("exit", (code, signal) => process.exit(signal ? 1 : code ?? 1));
