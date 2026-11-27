#!/usr/bin/env node
/**
 * serveur-frais.mjs — le serveur qu'on mesure sert-il le build qui est sur le
 * disque ?
 *
 * POURQUOI CE FICHIER EXISTE (§11.111, 2026-09-20). En mesurant les cibles
 * tactiles j'ai vu la page d'épreuve échouer son hydratation : React #423,
 * zéro bouton, alors que le HTML servi en contenait six. J'ai cru à une
 * régression de mon propre changement — un `inline-block py-1.5` sur un lien,
 * qui ne peut évidemment rien casser — et j'ai passé un bon moment à chercher
 * comment.
 *
 * LA CAUSE N'ÉTAIT PAS DANS LE PRODUIT. `next start` lit le manifeste du build
 * AU DÉMARRAGE et le garde en mémoire. J'avais reconstruit PENDANT que le
 * serveur tournait : il servait donc un HTML qui réclamait
 * `app/examens/[id]/page-1194944526548c79.js`, un morceau que la
 * reconstruction avait remplacé par `page-b8257295a74e681f.js`. Le morceau
 * manquant → `ChunkLoadError` → l'hydratation échoue → React vide la page.
 *
 * Un serveur périmé ne se voit PAS : il répond 200 à tout, son HTML est
 * parfait, et seule une page qui a besoin d'un morceau remplacé s'effondre.
 * C'est pour cela que ça ressemble à une régression du produit.
 *
 * CE QUE CE SCRIPT VÉRIFIE, en deux requêtes : il prend un morceau que le HTML
 * servi réclame, et demande au serveur s'il existe. 200 → le serveur et le
 * disque sont d'accord. 404 → le serveur est périmé, et il faut le relancer
 * avant de mesurer quoi que ce soit.
 *
 *   BASE=http://127.0.0.1:3111 node scripts/serveur-frais.mjs [route…]
 *
 * Sort 0 si le serveur est frais, 1 s'il est périmé, 2 s'il ne répond pas.
 */
const BASE = process.env.BASE ?? "http://127.0.0.1:3911";
const routes = process.argv.slice(2).filter((a) => !a.startsWith("--"));
//  Une route par FAMILLE de morceaux : la racine ne réclame pas ceux d'une
//  route dynamique, et c'est précisément une route dynamique qui m'a piégé.
const ROUTES = routes.length ? routes : ["/", "/examens/sm-2025-normale", "/notions/pc/rc-charge"];

let perimes = 0, verifies = 0;
for (const route of ROUTES) {
  let html;
  try {
    const r = await fetch(`${BASE}${route}`);
    if (!r.ok) { console.error(`✗ ${route} répond ${r.status} — le serveur ne sert pas cette route`); process.exit(2); }
    html = await r.text();
  } catch (e) {
    console.error(`✗ ${BASE}${route} injoignable : ${e.message}`);
    process.exit(2);
  }

  const morceaux = [...html.matchAll(/\/_next\/static\/chunks\/[^"'\s]+?\.js/g)].map((m) => m[0]);
  if (!morceaux.length) { console.log(`· ${route} — aucun morceau cité, rien à vérifier`); continue; }

  //  PREMIÈRE VERSION, ET POURQUOI ELLE ÉTAIT AVEUGLE. Elle prenait le DERNIER
  //  morceau cité, en croyant que c'était celui de la route. C'est
  //  `webpack-*.js` — un morceau PARTAGÉ, qui survit précisément aux
  //  reconstructions que ce script doit détecter. Le garde écrit contre le
  //  piège tombait dedans à la première ligne.
  //
  //  Ce qui change à chaque build, ce sont les morceaux de ROUTE, sous
  //  `/chunks/app/`. On les vérifie TOUS, et on écarte nommément les partagés.
  const PARTAGE = /\/(webpack|framework|main|polyfills)-/;
  const aVerifier = [...new Set(morceaux.filter((m) => m.includes("/chunks/app/") && !PARTAGE.test(m)))];
  if (!aVerifier.length) { console.log(`· ${route} — aucun morceau de route cité`); continue; }

  const manquants = [];
  for (const cible of aVerifier) {
    const r = await fetch(`${BASE}${cible}`, { method: "HEAD" });
    verifies++;
    if (!r.ok) manquants.push(`${cible.split("/").pop()} → ${r.status}`);
  }
  if (!manquants.length) {
    console.log(`✓ ${route.padEnd(28)} ${aVerifier.length} morceau(x) de route, tous servis`);
  } else {
    perimes++;
    console.error(`✗ ${route.padEnd(28)} ${manquants.length}/${aVerifier.length} morceau(x) introuvables : ${manquants.slice(0, 2).join(", ")}`);
    console.error(`   Le HTML servi réclame un morceau que le serveur ne trouve plus.`);
  }
}

if (perimes) {
  console.error(
    `\n━━ SERVEUR PÉRIMÉ — ${perimes} route(s) sur ${verifies} ━━\n` +
      `   Il a démarré AVANT la dernière reconstruction et garde l'ancien manifeste\n` +
      `   en mémoire. Tout ce qu'on mesurerait maintenant serait faux : les pages\n` +
      `   dont le morceau a été remplacé échouent leur hydratation (React #423) et\n` +
      `   se vident, ce qui ressemble trait pour trait à une régression du produit.\n\n` +
      `   Relancer le serveur, puis remesurer.\n`
  );
  process.exit(1);
}
console.log(`\nserveur frais — ${verifies} morceau(x) de route vérifié(s), le serveur et le disque sont d'accord ✓`);
