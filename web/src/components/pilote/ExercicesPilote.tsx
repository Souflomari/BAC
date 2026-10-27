"use client";

/**
 * ExercicesPilote — la page d'exercices d'une leçon pilote (refonte 2026-10, V3).
 *
 * Un exercice à la fois. Chaque exercice est un gabarit (voir
 * `exercices/modele.js`) : les nombres sont tirés au hasard, la réponse est
 * calculée par le code, la correction se déroule ligne par ligne. Les
 * questions se vérifient une par une ; une mauvaise réponse prévue (option
 * fausse, valeur piège) reçoit son explication et note l'erreur classique
 * qu'elle trahit. La fin récapitule ce qui est acquis et les erreurs vues.
 *
 * Rien n'est enregistré : c'est un pilote (le modèle apprenant viendra après
 * la validation du format).
 */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useHydrated } from "@/lib/useHydrated";
import { CATALOGUE, SEANCES } from "./exercices/catalogue";
import { hasard, nouvelleGraine } from "./exercices/hasard";
import { NIVEAUX, normaliser } from "./exercices/modele";
import { lireNombre, proche } from "./exercices/nombre";
import { formule, rendre } from "./exercices/texte";

type Gabarit = any;
type Tirage = any;

type EtatQ = { saisie: string; choix: number | null; essais: number; juste: boolean; message: string | null };
type EtatEx = { graine: number; q: EtatQ[]; lignes: number; correction: boolean; indices: number[]; erreurs: string[] };

const etatNeuf = (graine: number, n: number): EtatEx => ({
  graine,
  q: Array.from({ length: n }, () => ({ saisie: "", choix: null, essais: 0, juste: false, message: null })),
  lignes: 0,
  correction: false,
  indices: [],
  erreurs: [],
});

const lettre = (i: number) => String.fromCharCode(97 + i);

function bilan(e: EtatEx | undefined, nq: number): "premier" | "apres" | "corrige" | "nonfait" {
  if (!e || e.q.every((q) => q.essais === 0) && !e.correction) return "nonfait";
  const tout = e.q.length === nq && e.q.every((q) => q.juste);
  if (tout && !e.correction && e.q.every((q) => q.essais === 1) && !e.indices.length) return "premier";
  if (tout && !e.correction) return "apres";
  return "corrige";
}

const LIBELLE_BILAN = {
  premier: "réussi du premier coup",
  apres: "réussi après une erreur ou un indice",
  corrige: "correction consultée",
  nonfait: "pas encore fait",
};

export function ExercicesPilote({
  nom,
  matiere,
  titre,
  libelles,
  lecon,
}: {
  /** le nom du pilote : ses exercices sont lus dans le catalogue */
  nom: string;
  matiere: string;
  titre: string;
  /** identifiant de capacité → libellé officiel, lu dans le référentiel */
  libelles: Record<string, string>;
  lecon: string;
}) {
  const pret = useHydrated();
  const exercices: Gabarit[] = useMemo(() => (CATALOGUE as Record<string, Gabarit[]>)[nom] ?? [], [nom]);
  const N = exercices.length;
  const [k, setK] = useState(0);
  const [etats, setEtats] = useState<EtatEx[]>([]);

  // les nombres ne se tirent qu'une fois dans le navigateur (le serveur ne rend pas d'exercice)
  useEffect(() => {
    if (pret && !etats.length) setEtats(exercices.map(() => etatNeuf(nouvelleGraine(), 0)));
  }, [pret, etats.length, exercices]);

  const ex = k < N ? exercices[k] : null;
  const e = etats[k];
  const tirage: Tirage | null = useMemo(() => (ex && e ? ex.gen(hasard(e.graine)) : null), [ex, e?.graine]); // eslint-disable-line react-hooks/exhaustive-deps

  // un état de questions à la bonne taille pour ce tirage
  useEffect(() => {
    if (!tirage || !e) return;
    if (e.q.length !== tirage.questions.length) {
      setEtats((s) => s.map((x, i) => (i === k ? { ...etatNeuf(x.graine, tirage.questions.length) } : x)));
    }
  }, [tirage, e, k]);

  const maj = (f: (x: EtatEx) => EtatEx) => setEtats((s) => s.map((x, i) => (i === k ? f(x) : x)));

  const verifier = (j: number) => {
    if (!tirage || !e) return;
    const q = tirage.questions[j];
    const s = e.q[j];
    let juste = false;
    let message = "";
    let erreur: string | null = null;
    if (q.type === "qcm") {
      if (s.choix == null) return;
      const o = q.options[s.choix];
      juste = !!o.ok;
      message = juste ? "Juste." : o.fb || "Ce n’est pas ça.";
      if (!juste && o.erreur) erreur = o.erreur;
    } else if (q.type === "texte") {
      const v = normaliser(s.saisie);
      if (!v) {
        maj((x) => ({ ...x, q: x.q.map((y, i) => (i === j ? { ...y, message: "Écris ta réponse avec des lettres (par exemple AUG GUG CAC)." } : y)) }));
        return;
      }
      juste = [q.reponse, ...(q.variantes || [])].some((r: string) => normaliser(r) === v);
      if (juste) message = "Juste.";
      else {
        const p = (q.pieges || []).find((x: any) => normaliser(x.v) === v);
        message = p ? p.fb : "Ce n’est pas ça. Reprends lettre par lettre, ou demande un indice.";
        if (p?.erreur) erreur = p.erreur;
      }
    } else {
      const v = lireNombre(s.saisie);
      if (!Number.isFinite(v)) {
        maj((x) => ({ ...x, q: x.q.map((y, i) => (i === j ? { ...y, message: "Écris un nombre (par exemple 0,69 ou 8,0 × 10^6)." } : y)) }));
        return;
      }
      juste = proche(v, q.reponse, q.tol);
      if (juste) message = "Juste.";
      else {
        const p = (q.pieges || []).find((x: any) => proche(v, x.v, q.tol));
        message = p ? p.fb : "Ce n’est pas la bonne valeur. Reprends ton calcul, ou demande un indice.";
        if (p?.erreur) erreur = p.erreur;
      }
    }
    maj((x) => ({
      ...x,
      erreurs: erreur && !x.erreurs.includes(erreur) ? [...x.erreurs, erreur] : x.erreurs,
      q: x.q.map((y, i) => (i === j ? { ...y, essais: y.essais + 1, juste: y.juste || juste, message } : y)),
    }));
  };

  if (!pret || !etats.length || (ex && (!tirage || !e || e.q.length !== tirage.questions.length))) {
    return (
      <div className="exos" data-exercices={nom} aria-busy="true">
        <p className="exos-attente">Préparation des exercices…</p>
      </div>
    );
  }

  const barre = (
    <div className="exos-barre">
      <div className="exos-titre">
        <span className="exos-matiere">{matiere}</span>
        <strong className="font-display">{titre}</strong>
        <span className="exos-badge">exercices</span>
      </div>
      <ol className="exos-suivi" aria-label="Les exercices">
        {exercices.map((x, i) => {
          const b = bilan(etats[i], etats[i]?.q.length ?? 0);
          const sep = (x.seance ?? 1) > 1 && (exercices[i - 1]?.seance ?? 1) !== x.seance;
          return (
            <li key={x.id} className={sep ? "exos-sep" : undefined} data-seance={sep ? `séance ${x.seance}` : undefined}>
              <button
                type="button"
                className={`exos-pastille b-${b}${i === k ? " on" : ""}`}
                aria-current={i === k ? "step" : undefined}
                aria-label={`Exercice ${i + 1} : ${x.titre} — ${LIBELLE_BILAN[b]}`}
                onClick={() => setK(i)}
              >
                {i + 1}
              </button>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            className={`exos-pastille fin${k === N ? " on" : ""}`}
            onClick={() => setK(N)}
            aria-label="Le bilan"
          >
            ✓
          </button>
        </li>
      </ol>
    </div>
  );

  if (!ex) {
    const vues = etats.flatMap((x) => x.erreurs);
    const compte = { premier: 0, apres: 0, corrige: 0, nonfait: 0 };
    exercices.forEach((_, i) => compte[bilan(etats[i], etats[i].q.length)]++);
    return (
      <div className="exos" data-exercices={nom}>
        {barre}
        <main className="exos-col">
          <p className="exos-kicker">Le bilan</p>
          <h2 className="exos-h">Ce que tu sais faire</h2>
          <ul className="exos-bilan">
            {exercices.map((x, i) => {
              const b = bilan(etats[i], etats[i].q.length);
              return (
                <li key={x.id} className={`b-${b}`}>
                  <span className="exos-bilan-n">{i + 1}</span>
                  <span>
                    {x.titre} <span className="exos-niveau">· {NIVEAUX[x.niveau as 1 | 2 | 3]}</span>
                  </span>
                  <span className="exos-bilan-r">{LIBELLE_BILAN[b]}</span>
                </li>
              );
            })}
          </ul>
          <p className="exos-texte">
            {compte.premier} du premier coup, {compte.apres} après une erreur ou un indice, {compte.corrige} avec la
            correction, {compte.nonfait} pas encore faits.
          </p>
          {vues.length > 0 && (
            <>
              <h3 className="exos-h3">Les erreurs classiques que tu as rencontrées</h3>
              <ul className="exos-liste">
                {[...new Set(vues)].map((v) => (
                  <li key={v} dangerouslySetInnerHTML={{ __html: rendre(v) }} />
                ))}
              </ul>
              <p className="exos-petit">
                Dans l’application, ces erreurs choisiront tes prochains exercices. Ici, c’est un pilote : rien
                n’est enregistré.
              </p>
            </>
          )}
          <div className="exos-actions">
            <button
              type="button"
              className="exos-btn"
              onClick={() => {
                setEtats(exercices.map(() => etatNeuf(nouvelleGraine(), 0)));
                setK(0);
              }}
            >
              Recommencer avec d’autres nombres
            </button>
            <Link href={lecon} className="exos-btn ghost">
              ← Revoir la leçon
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const tout = e.q.every((q) => q.juste);
  return (
    <div className="exos" data-exercices={nom}>
      {barre}
      <main className="exos-col">
        <p className="exos-kicker">
          Exercice {k + 1} sur {N} · {NIVEAUX[ex.niveau as 1 | 2 | 3]}
        </p>
        {(ex.seance ?? 1) > 1 && (
          <p className="exos-seance">
            Séance {ex.seance} : {(SEANCES as Record<string, Record<number, string>>)[nom]?.[ex.seance] ?? ""}. Cette
            leçon n’est pas encore écrite : l’exercice est là pour la suite.
          </p>
        )}
        <h2 className="exos-h">{ex.titre}</h2>
        <p className="exos-cadre">
          Au programme :{" "}
          <span title={ex.capacites.join(" · ")}>{libelles[ex.capacites[0]] ?? ex.capacites[0]}</span>
          {ex.filieres && <span>filières {ex.filieres.join(", ")} seulement</span>}
        </p>
        <div className="exos-enonce" dangerouslySetInnerHTML={{ __html: rendre(tirage.enonce) }} />
        {tirage.figure && <div className="exos-figure" dangerouslySetInnerHTML={{ __html: tirage.figure }} />}
        <ol className="exos-questions">
          {tirage.questions.map((q: any, j: number) => {
            const s = e.q[j];
            const id = `q-${k}-${j}`;
            return (
              <li key={j} className={s.juste ? "juste" : s.essais ? "essaye" : ""}>
                <div className="exos-q">
                  <span className="exos-lettre">{lettre(j)})</span>
                  <span id={`${id}-l`} dangerouslySetInnerHTML={{ __html: rendre(q.q) }} />
                </div>
                {q.type === "qcm" ? (
                  <div className="exos-opts" role="radiogroup" aria-labelledby={`${id}-l`}>
                    {q.options.map((o: any, m: number) => (
                      <label key={m} className={`exos-opt${s.choix === m ? " sel" : ""}${s.juste && o.ok ? " ok" : ""}`}>
                        <input
                          type="radio"
                          name={id}
                          checked={s.choix === m}
                          disabled={s.juste}
                          onChange={() =>
                            maj((x) => ({ ...x, q: x.q.map((y, i) => (i === j ? { ...y, choix: m, message: null } : y)) }))
                          }
                        />
                        <span dangerouslySetInnerHTML={{ __html: rendre(o.t) }} />
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className={`exos-saisie${q.type === "texte" ? " texte" : ""}`}>
                    <input
                      id={id}
                      type="text"
                      inputMode={q.type === "texte" ? "text" : "decimal"}
                      autoCapitalize={q.type === "texte" ? "characters" : undefined}
                      spellCheck={false}
                      autoComplete="off"
                      aria-labelledby={`${id}-l`}
                      value={s.saisie}
                      disabled={s.juste}
                      placeholder={q.aide ?? "ta réponse"}
                      onChange={(ev) => {
                        const v = ev.target.value;
                        maj((x) => ({ ...x, q: x.q.map((y, i) => (i === j ? { ...y, saisie: v, message: null } : y)) }));
                      }}
                      onKeyDown={(ev) => {
                        if (ev.key === "Enter") verifier(j);
                      }}
                    />
                    {q.unite && <span className="exos-unite" dangerouslySetInnerHTML={{ __html: rendre(q.unite) }} />}
                  </div>
                )}
                <div className="exos-q-actions">
                  {!s.juste && (
                    <button
                      type="button"
                      className="exos-btn petit"
                      onClick={() => verifier(j)}
                      disabled={q.type === "qcm" ? s.choix == null : !s.saisie.trim()}
                    >
                      Vérifier
                    </button>
                  )}
                  {q.indice && !s.juste && !e.indices.includes(j) && (
                    <button
                      type="button"
                      className="exos-btn petit ghost"
                      onClick={() => maj((x) => ({ ...x, indices: [...x.indices, j] }))}
                    >
                      Un indice
                    </button>
                  )}
                </div>
                {e.indices.includes(j) && q.indice && (
                  <p className="exos-indice" dangerouslySetInnerHTML={{ __html: rendre("Indice : " + q.indice) }} />
                )}
                <p
                  className={`exos-retour${s.juste ? " ok" : s.message ? " ko" : ""}`}
                  aria-live="polite"
                  dangerouslySetInnerHTML={{ __html: s.message ? rendre(s.message) : "" }}
                />
              </li>
            );
          })}
        </ol>

        <section className="exos-correction" aria-label="Correction">
          {!e.correction ? (
            <button
              type="button"
              className="exos-btn ghost"
              onClick={() => maj((x) => ({ ...x, correction: true, lignes: 1 }))}
            >
              {tout ? "Voir la correction rédigée" : "Voir la correction"}
            </button>
          ) : (
            <>
              <h3 className="exos-h3">Correction</h3>
              <ol className="exos-lignes">
                {tirage.correction.slice(0, e.lignes).map((l: any, i: number) => (
                  <li key={i}>
                    {l.tex && <span className="exos-f" dangerouslySetInnerHTML={{ __html: formule(l.tex) }} />}
                    {l.t && <span className="exos-t" dangerouslySetInnerHTML={{ __html: rendre(l.t) }} />}
                    {l.r && <span className="exos-r" dangerouslySetInnerHTML={{ __html: rendre(l.r) }} />}
                  </li>
                ))}
              </ol>
              {e.lignes < tirage.correction.length && (
                <button type="button" className="exos-btn ghost" onClick={() => maj((x) => ({ ...x, lignes: x.lignes + 1 }))}>
                  Ligne suivante ↓
                </button>
              )}
            </>
          )}
        </section>

        <div className="exos-actions">
          <button type="button" className="exos-btn ghost" onClick={() => maj(() => etatNeuf(nouvelleGraine(), 0))}>
            ↻ Nouveaux nombres
          </button>
          <span className="exos-graine">tirage n° {e.graine}</span>
          <button type="button" className="exos-btn" onClick={() => setK(k + 1)}>
            {k === N - 1 ? "Voir le bilan →" : "Exercice suivant →"}
          </button>
        </div>
      </main>
    </div>
  );
}
