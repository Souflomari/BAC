/**
 * LeconsVitrine — les trois leçons interactives, montrées par leur figure.
 *
 * L'accueil disait « leçon interactive » avec des mots ; il le montre
 * maintenant avec la figure que l'élève manipulera : l'aire sous 1/x qui
 * définit ln, la courbe de décroissance et ses demi-vies, le gène lu
 * triplet par triplet. Chaque vignette est un FAIT de la leçon (les valeurs
 * sont calculées ici, pas dessinées à la main), jamais une décoration.
 *
 * Couleurs : uniquement `currentColor` porté par des classes de jetons.
 * Les nombres d'exercices viennent du catalogue (aucun nombre saisi).
 */

import { Link } from "@/components/ui/Lien";
import { frenchTypography } from "@/lib/frenchTypography";
import { CATALOGUE } from "@/components/pilote/exercices/catalogue";

const NB = CATALOGUE as Record<string, unknown[]>;

const W = 320;
const H = 180;
const f = (v: number) => v.toFixed(1);

/** ln : l'aire sous y = 1/x entre 1 et e vaut 1. */
function VignetteLn() {
  const x0 = 0.45, x1 = 4.2, yMax = 2.3;
  const L = 28, R = W - 14, T = 14, B = H - 30;
  const X = (x: number) => L + ((R - L) * (x - 0)) / x1;
  const Y = (y: number) => B - ((B - T) * y) / yMax;
  const pts: string[] = [];
  for (let x = x0; x <= x1 + 1e-9; x += 0.05) pts.push(`${f(X(x))} ${f(Y(1 / x))}`);
  const aire: string[] = [`${f(X(1))} ${f(Y(0))}`];
  for (let x = 1; x <= Math.E + 1e-9; x += 0.04) aire.push(`${f(X(x))} ${f(Y(1 / x))}`);
  aire.push(`${f(X(Math.E))} ${f(Y(1 / Math.E))}`, `${f(X(Math.E))} ${f(Y(0))}`);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="L’aire sous la courbe de 1 sur x, entre 1 et e, vaut 1" className="block h-auto w-full">
      <path d={`M${aire.join(" L")} Z`} className="fill-current text-signal" fillOpacity={0.14} />
      <line x1={X(1)} x2={X(1)} y1={Y(0)} y2={Y(1)} className="stroke-current text-signal" strokeWidth={1} />
      <line x1={X(Math.E)} x2={X(Math.E)} y1={Y(0)} y2={Y(1 / Math.E)} className="stroke-current text-signal" strokeWidth={1} />
      <line x1={L} x2={R} y1={B} y2={B} className="stroke-current text-primary" strokeWidth={1.2} />
      <line x1={L} x2={L} y1={T} y2={B} className="stroke-current text-primary" strokeWidth={1.2} />
      <path d={`M${pts.join(" L")}`} fill="none" className="stroke-current text-primary" strokeWidth={2} strokeLinecap="round" />
      <g className="fill-current font-mono text-secondary" fontSize={11} textAnchor="middle">
        <text x={X(1)} y={B + 15}>1</text>
        <text x={X(Math.E)} y={B + 15}>e</text>
      </g>
      <text x={X(1.72)} y={Y(0.2)} textAnchor="middle" fontSize={11} className="fill-current font-mono text-signal">aire = 1</text>
      <text x={X(3.2)} y={Y(0.62)} fontSize={11} className="fill-current font-mono text-tertiary">y = 1/x</text>
    </svg>
  );
}

/** Radioactivité : à chaque demi-vie, il reste la moitié. */
function VignetteDecroissance() {
  const L = 34, R = W - 14, T = 16, B = H - 30;
  const tMax = 4.4;
  const X = (t: number) => L + ((R - L) * t) / tMax;
  const Y = (n: number) => B - (B - T) * n;
  const pts: string[] = [];
  for (let t = 0; t <= tMax + 1e-9; t += 0.05) pts.push(`${f(X(t))} ${f(Y(Math.pow(0.5, t)))}`);
  const reperes = [1, 2, 3];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Courbe de décroissance radioactive : à chaque demi-vie, il reste la moitié des noyaux" className="block h-auto w-full">
      {reperes.map((k) => (
        <g key={k} className="stroke-current text-signal" strokeWidth={1} strokeDasharray="3 3">
          <line x1={L} x2={X(k)} y1={Y(Math.pow(0.5, k))} y2={Y(Math.pow(0.5, k))} />
          <line x1={X(k)} x2={X(k)} y1={Y(Math.pow(0.5, k))} y2={B} />
        </g>
      ))}
      <line x1={L} x2={R} y1={B} y2={B} className="stroke-current text-primary" strokeWidth={1.2} />
      <line x1={L} x2={L} y1={T - 4} y2={B} className="stroke-current text-primary" strokeWidth={1.2} />
      <path d={`M${pts.join(" L")}`} fill="none" className="stroke-current text-primary" strokeWidth={2} strokeLinecap="round" />
      {[0, ...reperes].map((k) => (
        <circle key={k} cx={X(k)} cy={Y(Math.pow(0.5, k))} r={3.5} className="fill-current text-signal" />
      ))}
      <g className="fill-current font-mono text-secondary" fontSize={11}>
        <text x={L - 6} y={Y(1) + 4} textAnchor="end">N₀</text>
        <text x={L - 6} y={Y(0.5) + 4} textAnchor="end">½</text>
        <text x={L - 6} y={Y(0.25) + 4} textAnchor="end">¼</text>
        <text x={X(1)} y={B + 15} textAnchor="middle">t½</text>
        <text x={X(2)} y={B + 15} textAnchor="middle">2 t½</text>
        <text x={X(3)} y={B + 15} textAnchor="middle">3 t½</text>
      </g>
    </svg>
  );
}

/** SVT : le gène est lu triplet par triplet (début réel de la chaîne β). */
function VignetteGene() {
  const adn = ["TAC", "CAC", "GTG"]; // brin transcrit, 3′ → 5′
  const arn = ["AUG", "GUG", "CAC"]; // ARNm, 5′ → 3′
  const aa = ["Met", "Val", "His"];
  const x0 = 78, pas = 76, larg = 62;
  const ligne = (y: number, mots: string[], cls: string) =>
    mots.map((m, i) => (
      <g key={`${y}-${i}`}>
        <rect x={x0 + i * pas} y={y} width={larg} height={26} fill="none" className={`stroke-current ${cls}`} strokeWidth={1.2} />
        <text x={x0 + i * pas + larg / 2} y={y + 18} textAnchor="middle" fontSize={13} letterSpacing={3} className={`fill-current font-mono ${cls}`}>{m}</text>
      </g>
    ));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Un gène transcrit en ARN messager puis traduit en acides aminés, triplet par triplet" className="block h-auto w-full">
      <g className="fill-current font-mono text-tertiary" fontSize={11}>
        <text x={14} y={38}>ADN</text>
        <text x={14} y={96}>ARNm</text>
        <text x={14} y={152}>chaîne</text>
      </g>
      {ligne(20, adn, "text-secondary")}
      {ligne(78, arn, "text-primary")}
      {aa.map((m, i) => (
        <g key={m}>
          <circle cx={x0 + i * pas + larg / 2} cy={148} r={17} className="fill-current text-signal" fillOpacity={0.14} />
          <circle cx={x0 + i * pas + larg / 2} cy={148} r={17} fill="none" className="stroke-current text-signal" strokeWidth={1.2} />
          <text x={x0 + i * pas + larg / 2} y={152} textAnchor="middle" fontSize={11} className="fill-current font-mono text-primary">{m}</text>
          {i > 0 ? <line x1={x0 + (i - 1) * pas + larg / 2 + 17} x2={x0 + i * pas + larg / 2 - 17} y1={148} y2={148} className="stroke-current text-signal" strokeWidth={1.2} /> : null}
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i} className="stroke-current text-tertiary" strokeWidth={1}>
          <line x1={x0 + i * pas + larg / 2} x2={x0 + i * pas + larg / 2} y1={50} y2={74} />
          <line x1={x0 + i * pas + larg / 2} x2={x0 + i * pas + larg / 2} y1={108} y2={127} />
        </g>
      ))}
    </svg>
  );
}

const LECONS = [
  {
    cle: "logarithme",
    href: "/pilote/logarithme",
    matiere: "Maths",
    titre: "Fonction logarithme",
    description: "De la table de Napier à la définition du bac : une aire sous une courbe.",
    Vignette: VignetteLn,
  },
  {
    cle: "radioactivite",
    href: "/pilote/radioactivite",
    matiere: "Physique-Chimie",
    titre: "Décroissance radioactive",
    description: "Du tiroir de Becquerel au carbone 14 : le hasard qui donne une loi.",
    Vignette: VignetteDecroissance,
  },
  {
    cle: "expression-genetique",
    href: "/pilote/expression-genetique",
    matiere: "SVT",
    titre: "Du gène à la protéine",
    description: "La drépanocytose, lue lettre par lettre : transcription, traduction, mutation.",
    Vignette: VignetteGene,
  },
] as const;

export function LeconsVitrine({ className }: { className?: string }) {
  return (
    <section aria-label="Leçons interactives" className={className}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-t-2 border-accent pt-5">
        <h2 className="font-display text-h2 font-bold text-primary">Leçons interactives</h2>
        <p className="text-body-sm text-secondary">
          Trois chapitres au nouveau format guidé. Les autres sont dans le programme, plus bas.
        </p>
      </div>
      <ul role="list" className="mt-6 grid grid-cols-1 gap-6 bp-medium:grid-cols-3">
        {LECONS.map(({ cle, href, matiere, titre, description, Vignette }) => {
          const nb = NB[cle]?.length ?? 0;
          return (
            <li key={cle} className="min-w-0">
              <Link
                href={href}
                data-lien-pilote=""
                className="group flex h-full flex-col border border-subtle bg-surface-raised transition-colors duration-200 hover:border-accent focus-ring"
              >
                <span className="block border-b border-subtle bg-surface-container-low px-4 py-4">
                  <Vignette />
                </span>
                <span className="flex flex-1 flex-col p-5">
                  <span className="block font-mono text-caption uppercase tracking-eyebrow text-tertiary">
                    {matiere}
                    {nb > 0 ? ` · ${nb} exercices` : ""}
                  </span>
                  <span className="mt-2 block font-display text-h3 font-bold text-primary">{titre}</span>
                  <span className="mt-1 block text-body-sm text-secondary">{frenchTypography(description)}</span>
                  <span className="mt-4 inline-flex min-h-touch items-center gap-2 text-body-sm font-semibold text-primary group-hover:text-signal">
                    Ouvrir la leçon
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
