/**
 * test-melange.mjs — le mélange des réponses fait-il ce qu'il PROMET ?
 *
 * POURQUOI CE FICHIER EXISTE (2026-09-05). `lib/shuffle.ts` porte une
 * affirmation forte dans son en-tête : « le biais de 58 % sur le choix A,
 * mesuré dans l'ordre du fichier, DISPARAÎT ». C'est la raison d'être du
 * module. Personne ne l'avait jamais re-mesurée. Or c'est une affirmation
 * sur des DONNÉES — donc quelque chose qui peut cesser d'être vrai sans que
 * le code change : il suffit d'ajouter des items.
 *
 * Re-mesuré : le biais rédactionnel n'est plus de 58 %, il est de 65 %
 * (1 612 items, tous à quatre choix). L'affirmation, elle, tient : après
 * mélange, 25,7 / 25,4 / 24,0 / 24,9 %. La commande est ci-dessous — c'est
 * la règle de l'ADR 0031 : un chiffre dans un document porte la commande qui
 * le produit.
 *
 * DEUX TÉMOINS, et c'est le point de méthode. Un test qui vérifierait
 * seulement « c'est plat après mélange » serait vert sur un corpus déjà plat
 * avant, donc vert avec le mélange DÉSARMÉ. Le test 3 vérifie donc que le
 * biais rédactionnel EXISTE encore. Les deux ensemble disent quelque chose ;
 * chacun seul ne dit rien.
 *
 * DÉRIVE DES COPIES. L'algorithme est recopié à l'identique dans
 * `item-stats.mjs` et `dom-truth.mjs` — les scripts Node ne peuvent pas
 * importer le TypeScript de `web/src`. L'en-tête du module dit que le sweep
 * de dom-truth existe « pour attraper la dérive » : c'est vrai pour la copie
 * de dom-truth, et seulement pour la notion balayée ce jour-là. La copie
 * d'`item-stats.mjs` n'était vérifiée par rien. Le dernier test compare le
 * COMPORTEMENT des deux copies à celui du vrai module, sur 500 tirages.
 *
 *   node --test scripts/test-melange.mjs   (⚠️ depuis web/)
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import jitiFactory from "jiti";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const jiti = jitiFactory(fileURLToPath(import.meta.url), {
  interopDefault: true,
  alias: { "@": path.join(WEB, "src") },
});
const { hashString, seededShuffle, shuffledChoices } = jiti(path.join(WEB, "src/lib/shuffle.ts"));

/** Tous les items à choix du corpus, avec la position de la bonne réponse. */
function lireCorpus() {
  const racine = path.join(WEB, "..", "content");
  const out = [];
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name === "items.yaml") {
        let doc;
        try { doc = yaml.load(fs.readFileSync(p, "utf8")); } catch { continue; }
        const items = Array.isArray(doc) ? doc : (doc?.items ?? []);
        if (!Array.isArray(items)) continue;
        for (const it of items) {
          if (!it || !Array.isArray(it.choices) || it.choices.length < 2) continue;
          const ecrit = it.choices.findIndex((c) => c && c.correct);
          if (ecrit < 0) continue;
          out.push({
            id: String(it.id),
            n: it.choices.length,
            ecrit,
            melange: shuffledChoices(it.choices, String(it.id)).findIndex((c) => c && c.correct),
          });
        }
      }
    }
  })(racine);
  return out;
}

const CORPUS = lireCorpus();
const QUATRE = CORPUS.filter((i) => i.n === 4);
const part = (liste, cle, pos) => liste.filter((i) => i[cle] === pos).length / liste.length;

test("le corpus est CHARGÉ — un zéro silencieux est un échec", () => {
  assert.ok(CORPUS.length >= 1000, `${CORPUS.length} item(s) — lancé depuis le mauvais répertoire ?`);
  assert.ok(QUATRE.length >= 1000, `${QUATRE.length} item(s) à quatre choix`);
});

test("après mélange, aucune position ne domine ni ne s'efface", () => {
  const lignes = [];
  for (let p = 0; p < 4; p++) {
    const f = part(QUATRE, "melange", p);
    lignes.push(`${String.fromCharCode(65 + p)} ${(100 * f).toFixed(1)} %`);
    assert.ok(f > 0.18 && f < 0.32, `position ${String.fromCharCode(65 + p)} : ${(100 * f).toFixed(1)} % — ${lignes.join("  ")}`);
  }
});

test("le biais rédactionnel EXISTE — sans quoi le test précédent ne prouve rien", () => {
  // Second témoin : si les auteurs cessaient d'écrire la bonne réponse en
  // premier, « c'est plat après mélange » serait vert avec le mélange retiré.
  const a = part(QUATRE, "ecrit", 0);
  assert.ok(
    a > 0.45,
    `la bonne réponse n'est plus écrite en premier que dans ${(100 * a).toFixed(1)} % des items : ` +
      `le test « plat après mélange » ne prouve plus rien — relire ce fichier avant de baisser le seuil`
  );
});

test("les identifiants d'items sont pratiquement uniques dans tout le corpus", () => {
  // La graine est l'identifiant SEUL. Deux items homonymes reçoivent donc la
  // même permutation — inoffensif tant que leurs choix diffèrent, et tant que
  // rien d'autre ne prend l'identifiant seul pour une clé. Ce test n'exige pas
  // l'unicité : il empêche qu'une collision de masse s'installe sans qu'on le
  // sache. Mesuré le 2026-09-05 : 9 doublons sur 1 612, tous « LIB-n » —
  // « libération de l'énergie » (SVT) et « la liberté » (philo).
  const vus = new Map();
  for (const i of CORPUS) vus.set(i.id, (vus.get(i.id) ?? 0) + 1);
  const doublons = [...vus.values()].filter((n) => n > 1).length;
  assert.ok(doublons <= 25, `${doublons} identifiants portés par plusieurs items`);
});

test("le mélange est déterministe et ne touche pas le tableau reçu", () => {
  const src = ["a", "b", "c", "d", "e"];
  const copie = [...src];
  const un = seededShuffle(src, 12345);
  const deux = seededShuffle(src, 12345);
  assert.deepEqual(un, deux, "deux appels, même graine, ordres différents");
  assert.deepEqual(src, copie, "le tableau reçu a été modifié");
  assert.notDeepEqual(seededShuffle(src, 12345), seededShuffle(src, 12346), "deux graines, même ordre");
  assert.deepEqual([...un].sort(), [...src].sort(), "le mélange a perdu ou inventé un élément");
});

test("aucun élément n'est perdu, quelle que soit la longueur", () => {
  for (let n = 0; n <= 12; n++) {
    const src = Array.from({ length: n }, (_, i) => i);
    for (const g of [0, 1, 7, 4294967295]) {
      const out = seededShuffle(src, g);
      assert.equal(out.length, n);
      assert.deepEqual([...out].sort((a, b) => a - b), src, `n=${n} graine=${g}`);
    }
  }
});

test("les deux COPIES de l'algorithme se comportent comme le vrai module", () => {
  // Elles ne sont pas comparées au TEXTE près — un renommage ou un
  // reformatage ne doit pas faire échouer une porte de comportement.
  const copies = [
    ["scripts/item-stats.mjs", "hashString", "seededShuffle"],
    ["scripts/dom-truth.mjs", "domTruthHashString", "domTruthSeededShuffle"],
  ];
  for (const [rel, nomHash, nomShuffle] of copies) {
    const src = fs.readFileSync(path.join(WEB, rel), "utf8");
    const bloc = [nomHash, nomShuffle.replace("SeededShuffle", "Mulberry32").replace("seededShuffle", "mulberry32"), nomShuffle]
      .map((nom) => {
        const m = src.match(new RegExp(`^function ${nom}\\b[\\s\\S]*?^}`, "m"));
        assert.ok(m, `${rel} : fonction ${nom} introuvable — la copie a-t-elle été renommée ou supprimée ?`);
        return m[0];
      })
      .join("\n");
    const fabrique = new Function(`${bloc}\nreturn { h: ${nomHash}, s: ${nomShuffle} };`)();
    for (let k = 0; k < 500; k++) {
      const cle = `item-${k}-${k * 7919}`;
      assert.equal(fabrique.h(cle), hashString(cle), `${rel} : hachage divergent sur « ${cle} »`);
      const arr = Array.from({ length: (k % 6) + 2 }, (_, i) => `c${i}`);
      assert.deepEqual(
        fabrique.s(arr, fabrique.h(cle)),
        seededShuffle(arr, hashString(cle)),
        `${rel} : ordre divergent sur « ${cle} »`
      );
    }
  }
});
