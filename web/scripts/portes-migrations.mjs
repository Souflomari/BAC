#!/usr/bin/env node
/**
 * portes-migrations — les non-négociables de sûreté PRODUCTION, mesurés.
 *
 * POURQUOI CE SCRIPT EXISTE (§11.128, 2026-09-20). `.claude/CLAUDE.md` énonce
 * une liste de non-négociables « toujours en vigueur », dérivés d'incidents
 * réels et nommant les migrations coupables. Deux d'entre eux se vérifient
 * STATIQUEMENT, sur le texte des migrations :
 *
 *   « Toute migration embarque un bloc de vérification qui asserte la
 *     CARDINALITÉ de l'état final, pas seulement la structure. Une migration
 *     qui semble réussir en ne faisant silencieusement rien est le mode de
 *     défaillance que cela empêche. (Leçon : migration 046.) »
 *
 *   « RLS activée dans la migration qui CRÉE la table. (Leçons : 040, 047.) »
 *
 * **Rien ne les mesurait.** Mesuré pour la première fois aujourd'hui : les deux
 * TIENNENT là où ils s'appliquent. Les six migrations écrites après la leçon de
 * 046 (046 à 051) portent toutes un bloc `DO … RAISE EXCEPTION … COUNT()`, et
 * toute migration depuis 002 qui crée une table y active RLS dans le même
 * fichier. Le seul trou historique — les sept tables de curriculum de 001 — a
 * été comblé par une migration dédiée dont le nom le dit :
 * `040_enable_rls_curriculum_tables.sql`.
 *
 * CE QUE CETTE PORTE GARDE, ET SUR QUELLE FENÊTRE. Les migrations sont une
 * histoire APPEND-ONLY : « ne jamais modifier une migration déjà passée en
 * production ». Exiger un bloc de vérification sur 001 serait donc exiger une
 * faute. Les seuils ci-dessous encodent cette histoire — ils disent à partir
 * d'où la règle existait, et rien d'autre.
 *
 * PIÈGE, payé en écrivant la porte : PostgreSQL accepte le dollar-quoting
 * NOMMÉ. `048` ouvre son bloc par `DO $verify$` et le ferme par `END $verify$`,
 * pas par `$$`. Une première version cherchait `DO $$` et déclarait **49
 * migrations sur 50 sans bloc de vérification** — une catastrophe entièrement
 * imaginaire. Le motif accepte donc `$[a-z_]*$`.
 *
 *   node scripts/portes-migrations.mjs            # l'inventaire
 *   node scripts/portes-migrations.mjs --porte    # les deux portes
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ICI = path.dirname(fileURLToPath(import.meta.url));
const MIG = path.join(ICI, "..", "..", "backend", "supabase", "migrations");
const PORTE = process.argv.includes("--porte");

//  À partir d'où chaque règle existait. Ce ne sont pas des seuils de confort :
//  ce sont des DATES, exprimées en numéro de migration.
const DEPUIS_VERIF = 46; // la règle est née de l'échec de 046
const DEPUIS_RLS = 2;    // 001 a précédé la règle ; 040 a comblé son trou

const RE_TABLE = /create\s+table\s+(?:if\s+not\s+exists\s+)?(?:public\.)?([a-z0-9_]+)/gi;
//  La frontière finale n'est pas décorative : sans elle, `ENABLE ROW LEVEL
//  SECURITY_quelque_chose` passait la porte. Trouvé en construisant l'essai
//  rouge — l'essai était mal bâti ET la porte était lâche.
const RE_RLS = /alter\s+table\s+(?:if\s+exists\s+)?(?:public\.)?([a-z0-9_]+)\s+enable\s+row\s+level\s+security\b/gi;
//  dollar-quoting anonyme ($$) OU nommé ($verify$) — voir le PIÈGE.
const RE_BLOC = /\bdo\s*\$[a-z_]*\$/i;

const fichiers = fs.readdirSync(MIG).filter((f) => /^\d{3}_.*\.sql$/.test(f)).sort();
const sansVerif = [], sansRls = [];
let verifOk = 0, rlsOk = 0, creentTable = 0;

for (const f of fichiers) {
  const n = Number(f.slice(0, 3));
  const s = fs.readFileSync(path.join(MIG, f), "utf8");
  const bas = s.toLowerCase();

  if (n >= DEPUIS_VERIF) {
    const ok = RE_BLOC.test(bas) && bas.includes("raise exception") && /count\s*\(/.test(bas);
    if (ok) verifOk++;
    else sansVerif.push(f);
  }
  if (n >= DEPUIS_RLS) {
    RE_TABLE.lastIndex = 0; RE_RLS.lastIndex = 0;
    const tables = new Set([...s.matchAll(RE_TABLE)].map((m) => m[1].toLowerCase()));
    tables.delete("if"); // garde-fou : `create table if not exists` mal capturé
    if (tables.size) {
      creentTable++;
      const rls = new Set([...s.matchAll(RE_RLS)].map((m) => m[1].toLowerCase()));
      const manque = [...tables].filter((t) => !rls.has(t)).sort();
      if (manque.length) sansRls.push(`${f} → ${manque.join(", ")}`);
      else rlsOk++;
    }
  }
}

console.log(`\n━━ non-négociables de sûreté production — ${fichiers.length} migrations ━━\n`);
console.log(`  bloc de vérification (cardinalité), depuis ${String(DEPUIS_VERIF).padStart(3, "0")} : ${verifOk}/${verifOk + sansVerif.length}`);
console.log(`  RLS dans la migration créatrice, depuis ${String(DEPUIS_RLS).padStart(3, "0")}    : ${rlsOk}/${creentTable} migrations qui créent une table`);
if (sansVerif.length) { console.log(`\n  SANS bloc de vérification :`); for (const f of sansVerif) console.log(`     ✗ ${f}`); }
if (sansRls.length) { console.log(`\n  TABLE SANS RLS dans son fichier créateur :`); for (const l of sansRls) console.log(`     ✗ ${l}`); }
console.log();

if (PORTE) {
  let rouge = 0;
  if (sansVerif.length) {
    console.error("━━ MIGRATION SANS BLOC DE VÉRIFICATION ━━");
    console.error("   Une migration qui semble réussir en ne faisant SILENCIEUSEMENT RIEN est");
    console.error("   le mode de défaillance que ce bloc empêche — c'est la leçon de 046, et");
    console.error("   `.claude/CLAUDE.md` en fait un non-négociable toujours en vigueur.");
    console.error("   Le bloc doit ASSERTER une cardinalité d'état final, pas une structure :");
    console.error("   `DO $verify$ … SELECT COUNT(*) … IF … RAISE EXCEPTION … END $verify$;`");
    rouge++;
  }
  if (sansRls.length) {
    console.error("━━ TABLE CRÉÉE SANS RLS DANS LE MÊME FICHIER ━━");
    console.error("   `ALTER TABLE … ENABLE ROW LEVEL SECURITY` appartient à la migration qui");
    console.error("   CRÉE la table, pas à une migration de rattrapage : entre les deux, la");
    console.error("   table est lisible par tous. Leçons : 040 (le rattrapage) et 047.");
    rouge++;
  }
  console.log(rouge ? `\n━━ ${rouge} porte(s) ROUGE(s) ━━\n` : "  ✓ les deux non-négociables tiennent\n");
  process.exit(rouge ? 1 : 0);
}
