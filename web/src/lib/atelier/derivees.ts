/**
 * La chaîne « dérivées » — de la pente au collège jusqu'au nombre dérivé.
 * Première chaîne construite selon NORTH-STAR-V2.
 *
 * Ce fichier EST le contenu. Il n'y a pas de leçon à côté : si une idée
 * n'entre pas dans une figure + deux phrases + une action, c'est qu'elle
 * n'est pas encore assez décomposée.
 *
 * LA RÈGLE (NORTH-STAR-V2 §4), vérifiée par `scripts/regle-atelier.mjs` :
 *   R1  tout écran a une action
 *   R2  ≤ 2 phrases visibles
 *   R3  toute réponse fausse porte SON feedback (jamais un « faux » sec)
 *   R4  aucun prérequis supposé sans être testé
 */

export interface Option {
  id: string;
  label: string;
  correct?: boolean;
  /** R3 — pourquoi CE raisonnement-là mène à CE résultat-là. */
  feedback?: string;
}

export interface Ecran {
  id: string;
  competence: string;
  /** La figure porte l'idée (R5). `null` seulement si l'action EST la figure. */
  figure: "pente" | "secante" | null;
  /** ≤ 2 phrases (R2). */
  texte: string;
  question: string;
  type: "choix" | "reglage";
  options?: Option[];
  /** Pour `reglage` : la valeur que l'élève doit obtenir sur la figure. */
  cible?: number;
  tolerance?: number;
  aide?: string;
  /** Ce qu'on retient — montré APRÈS la bonne réponse, jamais avant. */
  acquis?: string;
}

export interface Competence {
  id: string;
  titre: string;
  niveau: "collège" | "lycée" | "bac";
  /** R4 — les parents dans la chaîne, testés par le diagnostic. */
  requiert: string[];
}

export const COMPETENCES: Competence[] = [
  { id: "lire-pente", titre: "Lire une pente", niveau: "collège", requiert: [] },
  { id: "taux-variation", titre: "Le taux de variation", niveau: "lycée", requiert: ["lire-pente"] },
  { id: "secante", titre: "La pente d'une sécante", niveau: "lycée", requiert: ["taux-variation"] },
  { id: "tangente", titre: "De la sécante à la tangente", niveau: "bac", requiert: ["secante"] },
  { id: "nombre-derive", titre: "Le nombre dérivé f′(a)", niveau: "bac", requiert: ["tangente"] },
];

export const ECRANS: Ecran[] = [
  // ── lire-pente (collège) : le socle que personne ne revoit ────────────
  {
    id: "p1",
    competence: "lire-pente",
    figure: "pente",
    texte: "Une pente, c'est une comparaison : ce qu'on monte pour ce qu'on avance.",
    question: "Ici on avance de 4 et on monte de 2. En avançant de 1 seulement, de combien monte-t-on ?",
    type: "choix",
    options: [
      { id: "a", label: "0,5", correct: true },
      {
        id: "b", label: "2",
        feedback: "2, c'est ce qu'on monte en avançant de 4 — pas en avançant de 1. Cette montée doit être partagée en 4 parts égales.",
      },
      {
        id: "c", label: "4",
        feedback: "4, c'est ce qu'on AVANCE, pas ce qu'on monte. Les deux nombres ne jouent pas le même rôle : on monte 2 pendant qu'on avance 4.",
      },
      {
        id: "d", label: "8",
        feedback: "Tu as multiplié 2 par 4. Mais avancer MOINS fait monter MOINS : en avançant 4 fois moins, on monte 4 fois moins. On divise.",
      },
    ],
    acquis: "pente = (ce qu'on monte) ÷ (ce qu'on avance). Ici 2 ÷ 4 = 0,5.",
  },
  {
    id: "p2",
    competence: "lire-pente",
    figure: "pente",
    texte: "À toi. Les deux curseurs changent le triangle sous la droite.",
    question: "Règle la figure pour obtenir une pente égale à 2.",
    type: "reglage",
    cible: 2,
    tolerance: 0.001,
    aide: "Il faut monter deux fois plus qu'on avance. Par exemple monter 4 en avançant 2.",
    acquis: "Plusieurs triangles donnent la même pente : 4/2, 2/1… c'est le RAPPORT qui compte, pas les nombres eux-mêmes.",
  },

  // ── taux-variation ───────────────────────────────────────────────────
  {
    id: "t1",
    competence: "taux-variation",
    figure: "pente",
    texte: "Sur une droite, ce rapport ne change jamais, où qu'on place le triangle.",
    question: "Que se passe-t-il pour une COURBE, où la raideur change d'un endroit à l'autre ?",
    type: "choix",
    options: [
      {
        id: "a", label: "Il faut préciser entre quels points on mesure",
        correct: true,
      },
      {
        id: "b", label: "La pente n'existe pas pour une courbe",
        feedback: "Elle existe — sinon on ne pourrait pas dire qu'une route est plus raide à un endroit qu'à un autre. Ce qui change, c'est qu'elle ne vaut plus la même chose partout.",
      },
      {
        id: "c", label: "On prend la pente de la courbe entière",
        feedback: "Une courbe n'a pas UNE pente : elle est raide ici, plate là. Une seule valeur pour tout le tracé effacerait justement ce qui nous intéresse.",
      },
    ],
    acquis: "Sur une courbe, une pente ne veut rien dire toute seule : il faut dire entre QUELS points.",
  },

  // ── secante ──────────────────────────────────────────────────────────
  {
    id: "s1",
    competence: "secante",
    figure: "secante",
    texte: "Voici la courbe de f(x) = x². Le point A est fixé en x = 1, et B se déplace.",
    question: "La droite (AB) coupe la courbe en deux points. En rapprochant B de A, que fait sa pente ?",
    type: "choix",
    options: [
      { id: "a", label: "Elle diminue et se stabilise vers 2", correct: true },
      {
        id: "b", label: "Elle diminue jusqu'à 0",
        feedback: "Regarde le nombre affiché quand tu pousses le curseur à fond : il descend vers 2, pas vers 0. Une pente nulle voudrait dire une droite horizontale — or (AB) reste clairement montante.",
      },
      {
        id: "c", label: "Elle augmente",
        feedback: "Essaie : le nombre affiché DESCEND quand B se rapproche. Loin de A, la courbe est déjà bien plus raide ; en revenant vers A, on revient vers une portion moins raide.",
      },
      {
        id: "d", label: "Elle ne change pas",
        feedback: "C'est vrai sur une DROITE, pas sur une courbe. Bouge le curseur : le nombre affiché change à chaque cran.",
      },
    ],
    acquis: "La pente de (AB) dépend de l'écart h. Ici elle vaut exactement 2 + h.",
  },

  // ── tangente ─────────────────────────────────────────────────────────
  {
    id: "g1",
    competence: "tangente",
    figure: "secante",
    texte: "Plus B s'approche, plus (AB) épouse la courbe en A : elle ne la traverse plus, elle la frôle.",
    question: "Pourquoi ne peut-on pas simplement poser B exactement sur A ?",
    type: "choix",
    options: [
      {
        id: "a", label: "Parce qu'il faudrait diviser par 0", correct: true,
      },
      {
        id: "b", label: "Parce que la pente deviendrait infinie",
        feedback: "Non : le nombre affiché reste tout près de 2, il ne s'emballe pas. Le problème n'est pas que le résultat explose, c'est que le CALCUL devient impossible — le dénominateur h serait nul.",
      },
      {
        id: "c", label: "On peut, et la pente vaut 0",
        feedback: "Si B est sur A, il n'y a plus deux points, donc plus de droite (AB) du tout — et le quotient s'écrirait 0/0, qui ne désigne aucun nombre.",
      },
    ],
    acquis: "En h = 0 le quotient n'existe pas. On regarde donc vers quoi il TEND quand h s'approche de 0 — c'est ça, une limite.",
  },

  // ── nombre-derive ────────────────────────────────────────────────────
  {
    id: "d1",
    competence: "nombre-derive",
    figure: "secante",
    texte: "Cette valeur limite porte un nom : le nombre dérivé de f en 1, noté f′(1).",
    question: "D'après la figure, que vaut f′(1) pour f(x) = x² ?",
    type: "choix",
    options: [
      { id: "a", label: "2", correct: true },
      {
        id: "b", label: "1",
        feedback: "1, c'est la valeur de x où l'on se place (le point A est en x = 1), ou encore f(1) = 1. Le nombre dérivé n'est pas une hauteur : c'est une PENTE.",
      },
      {
        id: "c", label: "2 + h",
        feedback: "C'est la pente de la sécante, qui dépend encore de h. f′(1) est ce qu'il en reste quand h disparaît — donc un nombre fixe, sans h.",
      },
      {
        id: "d", label: "x²",
        feedback: "x² est la fonction elle-même, pas sa pente. f′(1) est un NOMBRE : la raideur de la courbe au point précis x = 1.",
      },
    ],
    acquis: "f′(1) = 2 : au point A, la courbe monte exactement 2 fois plus vite qu'elle n'avance. C'est tout ce que dit une dérivée.",
  },
];
