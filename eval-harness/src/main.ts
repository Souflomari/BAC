import "./styles.css";
import "katex/dist/katex.min.css";
import { marked } from "marked";
import renderMathInElement from "katex/contrib/auto-render";
import yaml from "js-yaml";

/*
  DISPOSABLE eval harness. Renders ONE notion as a student would experience it:
  lesson (markdown + live KaTeX) -> inline coded SVG arbre pondéré ->
  interactive, misconception-mapped items with immediate per-action feedback.
  It reads the content files at ../../content/<subject>/<notion>/ via ?raw
  imports. No backend, no auth, no routing — this is a learning-core rig only.
*/

const NOTION = "maths/probabilites-conditionnelles";

// ---- content loading (glob so a missing file degrades gracefully) ----
function first(map: Record<string, unknown>): string | null {
  const v = Object.values(map)[0];
  return typeof v === "string" ? v : null;
}

const lessonMd = first(
  import.meta.glob("../../content/maths/probabilites-conditionnelles/lesson.md", {
    query: "?raw",
    import: "default",
    eager: true,
  }),
);
const itemsRaw = first(
  import.meta.glob("../../content/maths/probabilites-conditionnelles/items.yaml", {
    query: "?raw",
    import: "default",
    eager: true,
  }),
);
const treeSvg = first(
  import.meta.glob(
    "../../content/maths/probabilites-conditionnelles/media/arbre-pondere.svg",
    { query: "?raw", import: "default", eager: true },
  ),
);

// ---- KaTeX ----
function typeset(el: HTMLElement) {
  renderMathInElement(el, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "\\[", right: "\\]", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\(", right: "\\)", display: false },
    ],
    throwOnError: false,
  });
}

// ---- item model ----
interface Choice {
  id: string;
  text: string;
  correct?: boolean;
  misconception?: string;
  feedback?: string;
}
interface Item {
  id: string;
  rung?: number | string;
  stem: string;
  type: "mcq" | "numeric";
  choices?: Choice[];
  answer?: number;
  tolerance?: number;
  unit?: string;
  correct_feedback?: string;
  solution?: string;
}
interface Misconception {
  id: string;
  label: string;
}
interface ItemsFile {
  notion?: string;
  misconceptions?: Misconception[];
  items?: Item[];
}

const app = document.getElementById("app") as HTMLElement;

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}

function renderLesson() {
  if (!lessonMd) return false;
  let html = marked.parse(lessonMd, { async: false }) as string;
  // inline the coded SVG tree where the lesson places the [[ARBRE_PONDERE]] marker
  const fig = treeSvg
    ? `<figure class="figure">${treeSvg}<figcaption>Arbre pondéré</figcaption></figure>`
    : `<div class="notice">Arbre pondéré (SVG) introuvable.</div>`;
  html = html.replace(/<p>\s*\[\[ARBRE_PONDERE\]\]\s*<\/p>/g, fig);
  html = html.replace(/\[\[ARBRE_PONDERE\]\]/g, fig);

  const section = document.createElement("section");
  section.innerHTML = html;
  app.appendChild(section);
  typeset(section);
  return true;
}

function labelFor(mcs: Misconception[] | undefined, id?: string) {
  if (!id) return null;
  return mcs?.find((m) => m.id === id)?.label ?? id;
}

function renderMcq(item: Item, mcs: Misconception[] | undefined, host: HTMLElement) {
  const choices = item.choices ?? [];
  const wrap = document.createElement("div");
  wrap.className = "choices";
  const fb = document.createElement("div");
  let answered = false;

  choices.forEach((c, i) => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.type = "button";
    btn.innerHTML = `<span class="choice__mark">${String.fromCharCode(65 + i)}</span><span>${c.text}</span>`;
    btn.addEventListener("click", () => {
      if (answered) return;
      answered = true;
      // immediate per-action feedback; lock all choices
      wrap.querySelectorAll("button").forEach((b) => ((b as HTMLButtonElement).disabled = true));
      const correctBtn = wrap.children[choices.findIndex((x) => x.correct)] as HTMLElement;
      correctBtn?.classList.add("choice--correct");
      if (c.correct) {
        btn.classList.add("choice--correct");
        fb.className = "feedback feedback--correct";
        fb.innerHTML = `✓ Correct. ${item.correct_feedback ? `<span class="feedback__why">${item.correct_feedback}</span>` : ""}`;
      } else {
        btn.classList.add("choice--wrong");
        fb.className = "feedback feedback--wrong";
        const why = c.feedback ? `<span class="feedback__why">${c.feedback}</span>` : "";
        const mcLabel = labelFor(mcs, c.misconception);
        const mc = mcLabel ? `<span class="feedback__mc">Conception erronée ciblée : ${escapeHtml(mcLabel)}</span>` : "";
        fb.innerHTML = `✗ Pas tout à fait.${why}${mc}`;
      }
      if (item.solution) {
        const sol = document.createElement("div");
        sol.className = "solution";
        sol.innerHTML = marked.parse(item.solution, { async: false }) as string;
        host.appendChild(sol);
        typeset(sol);
      }
      typeset(fb);
    });
    wrap.appendChild(btn);
  });
  host.appendChild(wrap);
  host.appendChild(fb);
  typeset(wrap);
}

function renderNumeric(item: Item, host: HTMLElement) {
  const row = document.createElement("div");
  row.className = "numeric";
  const input = document.createElement("input");
  input.type = "text";
  input.inputMode = "decimal";
  input.placeholder = "votre réponse";
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.type = "button";
  btn.textContent = "Vérifier";
  row.append(input, btn);
  const fb = document.createElement("div");
  let answered = false;

  const check = () => {
    if (answered) return;
    const val = parseFloat(input.value.trim().replace(",", "."));
    if (Number.isNaN(val)) return;
    answered = true;
    input.disabled = true;
    btn.disabled = true;
    const tol = item.tolerance ?? 0.001;
    const ok = item.answer !== undefined && Math.abs(val - item.answer) <= tol;
    if (ok) {
      fb.className = "feedback feedback--correct";
      fb.innerHTML = `✓ Correct. ${item.correct_feedback ? `<span class="feedback__why">${item.correct_feedback}</span>` : ""}`;
    } else {
      fb.className = "feedback feedback--wrong";
      fb.innerHTML = `✗ Pas tout à fait. <span class="feedback__why">Réponse attendue : $${item.answer}$${item.unit ? " " + escapeHtml(item.unit) : ""}.</span>`;
    }
    if (item.solution) {
      const sol = document.createElement("div");
      sol.className = "solution";
      sol.innerHTML = marked.parse(item.solution, { async: false }) as string;
      host.appendChild(sol);
      typeset(sol);
    }
    typeset(fb);
  };
  btn.addEventListener("click", check);
  input.addEventListener("keydown", (e) => e.key === "Enter" && check());
  host.append(row, fb);
}

function renderItems() {
  if (!itemsRaw) return false;
  let data: ItemsFile;
  try {
    data = yaml.load(itemsRaw) as ItemsFile;
  } catch (e) {
    const n = document.createElement("div");
    n.className = "notice";
    n.textContent = "items.yaml présent mais illisible : " + (e as Error).message;
    app.appendChild(n);
    return true;
  }
  const items = data.items ?? [];
  if (!items.length) return false;

  const head = document.createElement("h2");
  head.className = "practice-head";
  head.textContent = "S'entraîner";
  app.appendChild(head);

  for (const item of items) {
    const card = document.createElement("section");
    card.className = "item";
    const rung = item.rung !== undefined ? `<div class="item__rung">Palier ${item.rung}</div>` : "";
    card.innerHTML = `${rung}<div class="item__stem">${item.stem}</div>`;
    typeset(card);
    if (item.type === "numeric") renderNumeric(item, card);
    else renderMcq(item, data.misconceptions, card);
    app.appendChild(card);
  }
  return true;
}

// ---- boot ----
app.innerHTML = "";
const hadLesson = renderLesson();
const hadItems = renderItems();
app.setAttribute("aria-busy", "false");

if (!hadLesson && !hadItems) {
  app.innerHTML = `<div class="notice">
    <strong>La notion n'est pas encore présente.</strong><br/>
    Ce rig jetable attend les fichiers de contenu sous
    <code>content/${NOTION}/</code> (lesson.md, items.yaml, media/arbre-pondere.svg).
    Lancez le pipeline d'abord, puis rechargez.
  </div>`;
  app.setAttribute("aria-busy", "false");
}
