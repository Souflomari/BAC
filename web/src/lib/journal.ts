/**
 * Le journal d'apprentissage — le point d'écriture unique des événements de l'élève.
 *
 * Spécification : docs/design/APPRENTISSAGE-DONNEES.md §1. Décision du propriétaire
 * (ADR 0046) : pas de comptes pour l'instant, donc tout reste SUR L'APPAREIL, dans le
 * stockage local. Rien n'est envoyé. Le jour où les comptes ouvrent, c'est ici, et ici
 * seulement, qu'on décidera d'écrire aussi côté serveur.
 *
 * Ce qu'un événement ne contient jamais : un nom, un texte saisi par l'élève, un
 * identifiant d'appareil. Seulement ce qu'il a fait : quelle étape, quelle option,
 * juste ou non, avec ou sans indice.
 *
 * Le stockage peut être refusé (navigation privée, réglages) : dans ce cas le journal
 * ne garde rien, et la leçon marche comme avant.
 */

export const CLE_JOURNAL = "bac-journal-v1";
/** Au-delà, les plus anciens partent : environ 1 Mo au plus. */
export const PLAFOND = 4000;

export type EvenementJournal = {
  /** `lecon_etape`, `lecon_reponse`, `lecon_fin`, `exo_reponse`, `exo_indice`, `exo_correction`. */
  type: string;
  /** La leçon ou la série d'exercices, par son nom de pilote (`logarithme`…). */
  notion: string;
  [champ: string]: unknown;
};

let seance: string | null = null;
const identifiant = () => {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
};

/** Lit le journal de cet appareil. Toujours un tableau, même si le stockage est refusé ou abîmé. */
export function lireJournal(): Record<string, unknown>[] {
  try {
    const brut = JSON.parse(localStorage.getItem(CLE_JOURNAL) || "[]");
    return Array.isArray(brut) ? brut : [];
  } catch {
    return [];
  }
}

/** Ajoute un événement. Ne lève jamais : un journal en panne ne doit pas casser une leçon. */
export function journal(evt: EvenementJournal): void {
  try {
    if (typeof localStorage === "undefined") return;
    if (!seance) seance = identifiant();
    const liste = lireJournal();
    liste.push({ v: 1, id: identifiant(), t: new Date().toISOString(), seance, ...evt });
    if (liste.length > PLAFOND) liste.splice(0, liste.length - PLAFOND);
    localStorage.setItem(CLE_JOURNAL, JSON.stringify(liste));
  } catch {
    /* stockage refusé ou plein : on ne garde rien */
  }
}

/** Efface le journal de cet appareil (un jour : le bouton « effacer mes données »). */
export function effacerJournal(): void {
  try {
    localStorage.removeItem(CLE_JOURNAL);
  } catch {
    /* rien à effacer */
  }
}
