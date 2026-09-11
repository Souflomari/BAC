/**
 * La veille d'hydratation — ce que la page dit quand le JavaScript n'arrive
 * pas. Trois temps, tous SANS React (dans ce cas, React n'est jamais monté) :
 *
 *   1. `layout.tsx`, en tête, AVANT les morceaux : un écouteur `error` capté
 *      sur les <script> de `/_next/` — un morceau PERDU avant l'hydratation
 *      pose la classe `hydratation-perdue` sur <html> et révèle le bandeau.
 *      C'est le détecteur : instantané, et il distingue « perdu » de « lent ».
 *   2. `BandeauHydratation` — ce fichier — rendu par le SERVEUR en tête du
 *      <body>, masqué, avec un `<a href="">` qui recharge la page courante
 *      sans une ligne de JavaScript. En tête du body pour EXISTER dès les
 *      premiers kilo-octets : sur 3G lente, le HTML d'une leçon met 10 s à
 *      arriver, et un bandeau en pied de page ne pouvait se montrer qu'à la
 *      fin (mesuré : +8,3 s après la perte, HANDOFF §11.29).
 *   3. `FiletHydratation` — un script en ligne en FIN de body : si à 30 s de
 *      la fin du HTML ni le signal de vie ni l'erreur ne sont venus (une
 *      connexion qui pend sans jamais échouer), il révèle le bandeau. Compté
 *      depuis la fin du HTML, pas depuis la navigation : sur un réseau lent,
 *      le HTML lui-même prend des secondes, et le compte s'y ajuste tout
 *      seul. Trente secondes, parce que l'hydratation mesurée sur 3G lente
 *      (400 kb/s, 400 ms, processeur ×4) arrive 8 à 12 s après la fin du
 *      HTML : le filet ne peut pas se déclencher sur une simple lenteur.
 *
 * `SignalVivant` (client, monté depuis le layout) pose `__bacVivant`,
 * retire la classe et referme le bandeau : une fausse alerte se corrige
 * toute seule. La ligne « La page se prépare… » (`HydrationNotice`) se tait
 * dès que la classe est posée (globals.css) : une seule voix à la fois.
 *
 * Historique : né dans `PageShell` le 2026-09-04 avec un compte à rebours de
 * 12 s (`docs/audits/reseau-malade.md`) ; déplacé ici le 2026-09-11 (§11.29).
 */

export function BandeauHydratation() {
  return (
    /* PIÈGE PAYÉ DANS L'HEURE (2026-09-04) : ce conteneur portait `flex`.
       `[hidden]` n'est qu'une règle de la feuille par défaut du navigateur —
       une classe utilitaire qui pose `display: flex` la BAT. Ici, aucune
       classe de `display` : `hidden` gagne. La mise en page vit dans
       l'enfant. */
    <div
      id="hydratation-perdue"
      hidden
      role="status"
      className="fixed inset-x-0 bottom-0 z-50 px-gutter pb-6"
    >
      <div className="mx-auto w-full max-w-content rounded-xl bg-surface-overlay border border-subtle shadow-elevation-3 px-5 py-4 flex flex-col bp-medium:flex-row bp-medium:items-center gap-3">
        <p className="flex-1 text-sm text-primary">
          La page n’a pas fini de se charger : tu peux lire, mais les boutons
          ne répondront pas. Ta connexion est probablement faible.
        </p>
        <a
          href=""
          className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium bg-accent text-on-accent"
        >
          Recharger
        </a>
      </div>
    </div>
  );
}

const FILET =
  "(function(){function r(){document.documentElement.classList.add('hydratation-perdue');var e=document.getElementById('hydratation-perdue');if(e)e.hidden=false;}if(window.__bacPerdu){r();return;}setTimeout(function(){if(!window.__bacVivant&&!window.__bacPerdu)r();},30000);})();";

export function FiletHydratation() {
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: FILET }} />;
}
