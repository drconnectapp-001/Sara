# Haiku Concept Extraction Guide

## Overview

Claude Haiku extracts **structured knowledge** from each NCERT section.
- Input: Raw NCERT section text (~500-900 tokens)
- Output: JSON with concepts, formulas, relationships
- Cost: ~$0.001 per section
- Speed: ~2-3 sec per section with 5 concurrent calls

---

## The Extraction Task

For each NCERT section, Haiku answers:
1. **What concepts are introduced?** (definitions, difficulty, JEE relevance)
2. **What formulas appear?** (with LaTeX notation)
3. **What prerequisites exist?** (what must you know first)
4. **What common mistakes happen?** (misconceptions JEE tests)
5. **What cross-subject connections exist?** (e.g., Calculus → Physics)

---

## Input Example

**Chapter:** Laws of Motion (Physics 11th)  
**Section:** 4.5 Newton's Third Law of Motion

```
Newton's third law of motion states: "If a body A exerts a force on body B, 
then body B exerts an equal and opposite force on body A."

Mathematically:
  F_AB = -F_BA

where F_AB is the force on B due to A, and F_BA is the force on A due to B.

Key points:
- These forces are equal in magnitude but opposite in direction
- They act on different bodies
- They are of the same type (both contact, both gravitational, etc.)
- They never cancel each other out because they act on different bodies

Example: When you push a wall, the wall pushes back on you with equal force.
This is why you feel resistance. The two forces don't cancel because one acts
on you and one acts on the wall.

Common mistake: Students think the action-reaction pair forces cancel. They
only appear to cancel if the objects have equal mass. But even then, the forces
don't cancel—they act on different objects.
```

---

## Expected Output

```json
{
  "concepts": [
    {
      "name": "Newton's Third Law of Motion",
      "definition": "If body A exerts a force on body B, then body B exerts an equal and opposite force on body A. These forces are equal in magnitude, opposite in direction, and act on different bodies.",
      "key_facts": [
        "Forces are equal in magnitude and opposite in direction",
        "Action-reaction forces act on different bodies",
        "Forces are of the same type (contact or field)",
        "Action-reaction forces never cancel out"
      ],
      "difficulty": "medium",
      "jee_importance": "high",
      "prerequisites": [
        "Newton's First Law of Motion",
        "Newton's Second Law of Motion",
        "Force"
      ],
      "confused_with": [
        "Equilibrium (action-reaction forces don't cancel)",
        "Equal and opposite forces in equilibrium"
      ]
    },
    {
      "name": "Action-Reaction Pair",
      "definition": "Two forces that are equal in magnitude, opposite in direction, and act simultaneously on different objects as a result of their interaction.",
      "key_facts": [
        "Must involve two different bodies",
        "Must be of the same type",
        "Always occur together"
      ],
      "difficulty": "medium",
      "jee_importance": "high",
      "prerequisites": ["Force"],
      "confused_with": ["Balanced forces", "Equilibrium forces"]
    }
  ],
  "formulas": [
    {
      "name": "Newton's Third Law (Mathematical Form)",
      "plain_text": "F_AB = -F_BA",
      "latex": "\\vec{F}_{AB} = -\\vec{F}_{BA}",
      "used_for": "Expressing the equality and opposite direction of action-reaction forces",
      "concept": "Newton's Third Law of Motion"
    }
  ],
  "cross_subject_links": [
    {
      "from_concept": "Newton's Third Law of Motion",
      "to_concept": "Momentum Conservation",
      "to_subject": "Physics",
      "relationship": "REQUIRES"
    },
    {
      "from_concept": "Action-Reaction Pair",
      "to_concept": "Vectors and Vector Addition",
      "to_subject": "Mathematics",
      "relationship": "REQUIRES"
    }
  ],
  "common_mistakes": [
    {
      "concept": "Newton's Third Law of Motion",
      "mistake": "Thinking action-reaction pair forces cancel out. They don't cancel because they act on different bodies. Students confuse this with balanced forces (equilibrium).",
      "pattern_tag": "action_reaction_cancellation"
    },
    {
      "concept": "Action-Reaction Pair",
      "mistake": "Thinking both forces affect the motion of the same object. The forces act on different objects, so each object is affected differently.",
      "pattern_tag": "same_body_misconception"
    }
  ]
}
```

---

## Extraction Rules

### Concepts
- **Name**: 3-6 words, specific (e.g., "Projectile Motion" not "Motion")
- **Definition**: 1-2 sentences, suitable for JEE level
- **Key Facts**: 3-5 bullet points, directly from text
- **Difficulty**: `easy|medium|hard` (relative to JEE)
- **JEE Importance**: `high|medium|low` (exam weightage)
- **Prerequisites**: Other concepts that must be known first
- **Confused With**: Common student misconceptions

### Formulas
- **Name**: Descriptive name (e.g., "Kinetic Energy Formula")
- **Plain Text**: Human-readable (e.g., `KE = 0.5 * m * v^2`)
- **LaTeX**: Proper notation (e.g., `KE = \\frac{1}{2}mv^2`)
- **Used For**: What the formula calculates
- **Concept**: Which concept this formula defines

### Cross-Subject Links
- **From Concept**: From this section
- **To Concept**: In another subject/chapter
- **To Subject**: `Physics|Chemistry|Mathematics`
- **Relationship**: `REQUIRES|APPLIES_TO|BRIDGES_TO`

### Common Mistakes
- **Concept**: Name of concept
- **Mistake**: Description of the error JEE students make
- **Pattern Tag**: Snake_case identifier for tracking (e.g., `sign_convention_error`)

---

## Quality Guidelines

✅ **DO:**
- Extract only what's explicitly in the text
- Use precise concept names from NCERT
- List actual prerequisites students need
- Identify mistakes that show up in JEE exams
- Include LaTeX for all formulas
- Mark high-importance concepts for JEE

❌ **DON'T:**
- Add knowledge not in the section
- Use vague concept names
- List irrelevant prerequisites
- Include trivial mistakes
- Use broken LaTeX
- Overestimate JEE importance

---

## Examples by Subject

### Physics (Laws of Motion)
- Concepts: Newton's laws, Force, Mass, Acceleration, Tension, Friction
- Formulas: F=ma, a=F/m, f=μN
- Prerequisites: Kinematics, Vector algebra
- Mistakes: Sign conventions, Action-reaction confusion

### Chemistry (Chemical Bonding)
- Concepts: Covalent bond, Ionic bond, Bond length, Bond energy, Electronegativity
- Formulas: Bond energy = dissociation energy, Percent ionic character
- Prerequisites: Atomic structure, Valence electrons
- Mistakes: Confusing electronegativity with electron affinity

### Mathematics (Trigonometry)
- Concepts: Unit circle, Sine, Cosine, Tangent, Period, Amplitude
- Formulas: sin²θ + cos²θ = 1, sin(A+B) = sinA·cosB + cosA·sinB
- Prerequisites: Angles, Ratios
- Mistakes: Domain/range confusion, Periodicity misconceptions

---

## Running the Extraction

```bash
cd workers/ingestion
./venv/bin/python3 ingest.py --pdf-dir ../../Class-11 --file keph104.pdf
```

The pipeline will:
1. Parse PDF → 56 sections
2. Call Haiku 5x concurrently → ~30 concepts extracted
3. Write to Neo4j → searchable graph
4. Embed sections → pgvector for semantic search

Expected output:
```
Processing: keph104.pdf
  Chapter: Laws of Motion
  Parsed: 56 sections, 12 examples
  Extracted: ~25-30 concepts, ~40-50 formulas
  Success: 56/56 sections
```

---

## Cost & Performance

| Metric | Value |
|--------|-------|
| Tokens per section | 400-900 |
| API cost per section | $0.001-0.002 |
| Time per section | 2-3 sec (with 5 concurrency) |
| Time per chapter (50 sections) | ~30-40 sec |
| Total for 50 PDFs | ~2 hours, ~$1.25 |

---

## Troubleshooting

**Haiku returns invalid JSON**
- The retry mechanism (up to 3 attempts) handles transient failures
- Falls back to empty arrays if parsing fails

**Haiku extracts too little**
- Normal for intro sections (no concepts yet)
- Accumulates across all sections in chapter

**Haiku extracts too much**
- Check if section_text is being truncated (4000 char limit)
- Verify section splitting is working correctly

**Prerequisites not matching**
- Haiku lists what *should* be known first
- Graph writer verifies nodes exist before creating edges
- Missing prerequisites are still added (useful for discovery)

---

## Next Steps

1. **Test**: `./venv/bin/python3 ingest.py --pdf-dir ../../Class-11 --file keph104.pdf`
2. **Verify Neo4j**: http://localhost:7474 → Check Concept nodes
3. **Verify pgvector**: Query `SELECT COUNT(*) FROM concept_embeddings`
4. **Full run**: `./venv/bin/python3 ingest.py --pdf-dir ../../Class-11`
5. **Test RAG**: Ask Sara a doubt in the chat UI
