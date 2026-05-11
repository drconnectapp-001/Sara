# Haiku Extraction Schema — Quick Reference

## JSON Schema Overview

Every section extraction returns this structure:

```json
{
  "concepts": [/* array of concept objects */],
  "formulas": [/* array of formula objects */],
  "cross_subject_links": [/* array of relationship objects */],
  "common_mistakes": [/* array of mistake objects */]
}
```

---

## Concept Object

```json
{
  "name": "string",                    // 3-6 words, specific
  "definition": "string",              // 1-2 sentences, JEE-level
  "key_facts": ["string", "string"],  // 3-5 facts from text
  "difficulty": "easy|medium|hard",   // Relative to JEE level
  "jee_importance": "high|medium|low",// Exam weight
  "prerequisites": ["string"],         // Concept names that must be known first
  "confused_with": ["string"]          // Misconceptions students have
}
```

### Example Concept
```json
{
  "name": "Projectile Motion",
  "definition": "Motion of an object under the influence of gravity alone, with initial velocity at an angle to the vertical.",
  "key_facts": [
    "Horizontal and vertical components of motion are independent",
    "Horizontal velocity remains constant (no air resistance)",
    "Vertical motion is uniformly accelerated with g = 9.8 m/s²",
    "Trajectory is parabolic",
    "Time of flight depends only on vertical component"
  ],
  "difficulty": "medium",
  "jee_importance": "high",
  "prerequisites": ["Kinematics", "Vector Decomposition"],
  "confused_with": ["Uniform Circular Motion", "Simple Harmonic Motion"]
}
```

---

## Formula Object

```json
{
  "name": "string",          // Descriptive name
  "plain_text": "string",    // Human-readable (e.g., "F = ma")
  "latex": "string",         // Proper LaTeX (e.g., "F = ma")
  "used_for": "string",      // What this calculates
  "concept": "string"        // Concept this formula belongs to
}
```

### Example Formulas

**Physics:**
```json
{
  "name": "Newton's Second Law",
  "plain_text": "F = ma",
  "latex": "F = ma",
  "used_for": "Calculating force given mass and acceleration",
  "concept": "Newton's Second Law of Motion"
}
```

**Chemistry:**
```json
{
  "name": "Bohr Radius",
  "plain_text": "rₙ = 0.53 × n² Ångstrom",
  "latex": "r_n = 0.53 \\times n^2 \\text{ \\AA}",
  "used_for": "Radius of nth Bohr orbit in hydrogen atom",
  "concept": "Bohr's Model of Hydrogen"
}
```

**Mathematics:**
```json
{
  "name": "Sum of Arithmetic Series",
  "plain_text": "S = n/2 × (2a + (n-1)d)",
  "latex": "S = \\frac{n}{2} \\times (2a + (n-1)d)",
  "used_for": "Sum of arithmetic progression with n terms",
  "concept": "Arithmetic Series"
}
```

---

## Cross-Subject Link Object

```json
{
  "from_concept": "string",        // Concept in this section
  "to_concept": "string",          // Concept in another chapter
  "to_subject": "string",          // "Physics|Chemistry|Mathematics"
  "relationship": "string"         // "REQUIRES|APPLIES_TO|BRIDGES_TO"
}
```

### Relationship Types

| Type | Meaning | Example |
|------|---------|---------|
| `REQUIRES` | Must know B before learning A | Projectile Motion REQUIRES Kinematics |
| `APPLIES_TO` | A uses concepts/math from B | Circular Motion APPLIES_TO Trigonometry |
| `BRIDGES_TO` | A and B appear together in exams | Newton's Laws BRIDGES_TO Work & Energy |

### Example Links
```json
{
  "from_concept": "Calculus Methods",
  "to_concept": "Derivatives in Physics",
  "to_subject": "Physics",
  "relationship": "APPLIES_TO"
}
```

---

## Common Mistake Object

```json
{
  "concept": "string",       // Concept name
  "mistake": "string",       // Description of the error
  "pattern_tag": "string"    // snake_case identifier
}
```

### Example Mistakes
```json
{
  "concept": "Newton's Third Law",
  "mistake": "Thinking action-reaction pair forces cancel. They don't cancel because they act on different bodies.",
  "pattern_tag": "action_reaction_cancellation"
}
```

```json
{
  "concept": "Projectile Motion",
  "mistake": "Assuming the path taken is the velocity vector. The velocity vector is tangent to the path, not along the path direction.",
  "pattern_tag": "velocity_not_along_path"
}
```

```json
{
  "concept": "Double Angle Formulas",
  "mistake": "Confusing sin(2A) with (sin A)². sin(2A) = 2sin A cos A, not sin²A.",
  "pattern_tag": "double_angle_vs_square"
}
```

---

## Empty/Minimal Sections

Some sections may not have all fields populated:

**Introductory section (no new concepts):**
```json
{
  "concepts": [],
  "formulas": [],
  "cross_subject_links": [],
  "common_mistakes": []
}
```

**Section with only formulas (no conceptual errors):**
```json
{
  "concepts": [],
  "formulas": [/* formula objects */],
  "cross_subject_links": [/* links */],
  "common_mistakes": []
}
```

This is normal. The ingestion pipeline accumulates across all sections.

---

## Validation Rules

Haiku follows these rules when extracting:

✅ **Valid Concept Name**
- "Newton's Third Law of Motion" (specific, 4 words)
- "Action-Reaction Pair" (specific, 2 words)
- "Bohr's Quantization Model" (specific, 3 words)

❌ **Invalid Concept Name**
- "Law" (too vague)
- "Forces in Mechanics" (too broad)
- "The relationship between velocity and acceleration in non-uniform circular motion with air resistance" (too long)

---

✅ **Valid Formula**
```json
{
  "name": "Kinetic Energy",
  "plain_text": "KE = 0.5 × m × v²",
  "latex": "KE = \\frac{1}{2}mv^2",
  "used_for": "Energy of moving object",
  "concept": "Kinetic Energy"
}
```

❌ **Invalid Formula**
```json
{
  "name": "Energy",
  "plain_text": "E = stuff",           // Not actual formula
  "latex": "E = \\text{undefined}",  // Not parseable
  "used_for": "",                     // Empty
  "concept": "Something"              // Vague
}
```

---

✅ **Valid Prerequisite**
- "Kinematics" (real JEE concept)
- "Vector Decomposition" (real JEE concept)
- "Newton's First Law" (real JEE concept)

❌ **Invalid Prerequisite**
- "Basic Physics" (too vague)
- "Quantum Mechanics" (out of 11th syllabus)
- "The relationship between time and space" (made-up)

---

## Data Flow

```
NCERT PDF
    ↓ (pdfplumber extracts text)
Section text (400-900 tokens)
    ↓ (Haiku extraction prompt)
JSON: concepts, formulas, links, mistakes
    ↓ (graph_writer processes)
Neo4j: Concept nodes, edges
    ↓ (chunk_embedder processes)
pgvector: embeddings of sections + concepts
    ↓ (RAG pipeline uses)
Sara's chat → Neo4j for structure + pgvector for content
```

---

## Cost Analysis

| Operation | Tokens | Cost per Section | Concurrency |
|-----------|--------|-----------------|-------------|
| Haiku extraction | ~400-900 input, ~500 output | $0.001-0.002 | 5 |
| OpenAI embedding | ~1536 dimensions | $0.00002 per section | Batch |
| **Total per chapter (50 sections)** | | ~$0.05-0.10 | |
| **Total for 50 PDFs** | | ~$2.50-5.00 | |

Note: Embeddings are batched, so cost is much lower. Total cost for full Knowledge Graph: **~$1.50-2.00**

---

## Testing a Single Extraction

```bash
cd workers/ingestion

# Create a test section
cat > test_section.txt << 'EOF'
Newton's third law of motion states: "If a body A exerts a force on body B, 
then body B exerts an equal and opposite force on body A."

F_AB = -F_BA

These forces act on different bodies and never cancel out.
EOF

# Extract with Python
python3 -c "
import asyncio
import json
from concept_extractor import extract_section

async def test():
    with open('test_section.txt') as f:
        text = f.read()
    result = await extract_section(
        text,
        '4.5 Newton Third Law',
        'Laws of Motion',
        'Physics'
    )
    print(json.dumps(result, indent=2))

asyncio.run(test())
"
```

Expected output: JSON with ~2-3 concepts, 1 formula, 1 common mistake.
