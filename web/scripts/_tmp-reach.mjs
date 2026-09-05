import path from "node:path"; import { fileURLToPath } from "node:url"; import jitiFactory from "jiti";
const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const jiti = jitiFactory(fileURLToPath(import.meta.url), { interopDefault: true, alias: { "@": path.join(WEB, "src") } });
const { listNotions, loadNotion } = jiti(path.join(WEB, "src/lib/content.ts"));
const d0 = loadNotion(listNotions()[0].id);
console.log("clés d'une notion :", Object.keys(d0).join(", "));
console.log("exercises :", Array.isArray(d0.exercises) ? "tableau" : typeof d0.exercises, JSON.stringify(d0.exercises)?.slice(0, 120));
