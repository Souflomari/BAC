# BacPrep Content Writing Guide

Guide for writing quiz items, hints, and explanations for Moroccan Baccalaureate students.

## Audience

- Moroccan Bac students (Terminale), Sciences Math / Sciences Experimentales / Economie
- Content in French (primary) with Arabic support
- Level: challenging but encouraging — no condescending tone

## Item Template: MCQ

```json
{
  "item_type": "mcq",
  "difficulty_level": 3,
  "content_language": "fr",
  "question": {
    "stem": "Question claire et precise. Utilisez $...$ pour le LaTeX inline.",
    "latex": true,
    "choices": ["Choix A", "Choix B", "Choix C", "Choix D"],
    "correct_index": 0,
    "figure": null
  },
  "explanation": {
    "text_fr": "Explication concise de la bonne reponse.",
    "steps": [
      "Etape 1: Identifier ce qui est demande",
      "Etape 2: Appliquer la formule $...$",
      "Etape 3: Simplifier et conclure"
    ],
    "wrong_choice_explanations": [
      null,
      "Erreur frequente: confusion entre X et Y",
      "Cette reponse oublie le facteur...",
      "Piege: on ne peut pas simplifier ainsi car..."
    ],
    "why_prompt": "Pourquoi cette formule fonctionne-t-elle ?",
    "why_answer": "Explication approfondie de l'intuition derriere le resultat.",
    "what_if": {
      "prompt": "Et si le parametre etait negatif ?",
      "answer": "Dans ce cas, le resultat serait... parce que..."
    }
  },
  "hint": {
    "text_fr": "Pensez a utiliser la propriete de... sans donner la reponse directement."
  }
}
```

## Item Template: Numeric

```json
{
  "item_type": "numeric",
  "question": {
    "stem": "Calculer la valeur de...",
    "correct_value": 42.5,
    "tolerance": 0.1,
    "unit": "m/s"
  }
}
```

## Item Template: True/False

```json
{
  "item_type": "true_false",
  "question": {
    "stem": "Toute fonction continue sur [a,b] admet un maximum.",
    "correct_answer": true
  }
}
```

## Item Template: Interactive (Graph)

```json
{
  "item_type": "graph",
  "question": {
    "stem": "Determiner la derivee de f au point x=2",
    "correct_value": 4.0,
    "tolerance": 0.2,
    "graph_config": {
      "function": "x^2",
      "mode": "derivative",
      "x_min": -5,
      "x_max": 5,
      "y_min": -5,
      "y_max": 25,
      "show_tangent_at": 2.0
    }
  }
}
```

## Item Template: Simulation (Physics)

```json
{
  "item_type": "simulate",
  "question": {
    "stem": "Trouver la vitesse du projectile a t=3s",
    "correct_value": 29.4,
    "tolerance": 0.5,
    "unit": "m/s",
    "sim_config": {
      "type": "freeFall",
      "scenario": "default",
      "target": {
        "variable": "velocity",
        "time": 3.0
      }
    }
  }
}
```

## Writing Effective Hints

Hints should **guide** without **giving away** the answer.

**Good hints:**
- "Pensez a la formule de derivation des fonctions composees"
- "Quel est le degre du polynome ?"
- "Commencez par isoler l'inconnue"

**Bad hints (too direct):**
- "La reponse est 2x" (gives the answer)
- "Choisissez la reponse B" (points to answer)
- "Utilisez 2x" (practically reveals it)

**Structure:** Start with the relevant concept/theorem, then suggest a first step. Never mention specific answer values.

## Writing Wrong Choice Explanations

Target **common misconceptions** — the kind of errors students actually make.

**Good explanations:**
- "Erreur frequente: oublier de multiplier par la derivee interieure (regle de la chaine)"
- "Confusion entre la formule de l'aire et celle du perimetre"
- "Piege: $\sin(2x) \neq 2\sin(x)$ en general"

**Bad explanations:**
- "C'est faux" (unhelpful)
- "Mauvaise reponse" (says nothing)

**Rule:** The wrong_choice_explanations array must match the choices array length. Use `null` for the correct answer's index and for choices that don't have a common misconception.

## Writing "Pourquoi ?" Prompts

These deepen understanding by asking students to explain **why** the correct answer works.

**Good prompts:**
- "Pourquoi la formule $S_n = \frac{n(n+1)}{2}$ fonctionne-t-elle ?"
- "Pourquoi la conservation de l'energie s'applique-t-elle ici ?"
- "Quel est le lien entre cette derivee et la pente de la tangente ?"

**The answer should:**
- Connect to first principles or intuition
- Reference a theorem or historical insight
- Be 2-4 sentences max

## Writing "Et si...?" Prompts

These build **transfer** — applying the concept to a slightly different scenario.

**Good prompts:**
- "Et si la raison etait negative ?"
- "Et si la masse etait doublee ?"
- "Et si la fonction n'etait pas continue ?"

**The answer should:**
- Show how the result changes
- Explain **why** it changes
- Be concise (1-3 sentences)

## French Style Conventions

- Use French mathematical notation: $\ln$ (not $\log$), virgule for decimals in text
- LaTeX: $f'(x)$ not $\frac{df}{dx}$ for simple derivatives (students see f' notation in exams)
- Use "on" for impersonal: "On calcule..." not "Nous calculons..."
- Encourage: "Bravo !" not "Facile !"
- Address common Moroccan Bac exam patterns (QCM, exercices types)

## Difficulty Levels

| Level | Description | Example |
|-------|-----------|---------|
| 1 | Direct application of a formula | Calculer $f'(x)$ pour $f(x) = 3x^2$ |
| 2 | One-step reasoning | Trouver l'equation de la tangente en $x=1$ |
| 3 | Multi-step problem | Etudier les variations de $f$ sur $\mathbb{R}$ |
| 4 | Synthesis / proof | Montrer que $f$ admet un unique point fixe |
| 5 | Competition-level / tricky | Probleme de synthese (integrale + suite + limite) |
