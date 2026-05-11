# Haiku Extraction Examples by Subject

Real extractions showing what Haiku produces for Physics, Chemistry, and Math sections.

---

## Example 1: Physics (Kinematics)

**Section:** 2.3 Equations of Motion with Constant Acceleration  
**Chapter:** Kinematics (Physics 11)

### Input Text
```
For motion with constant acceleration, we have three fundamental equations:

v = u + at
s = ut + (1/2)at²
v² = u² + 2as

where u is initial velocity, v is final velocity, a is acceleration, 
t is time, and s is displacement.

These equations form the basis for solving most kinematics problems. 
They apply only when acceleration is constant.

Common mistake: Using these equations when acceleration is not constant. 
Always check that acceleration is uniform before applying them.

Another mistake: Confusing displacement with distance. These equations 
use displacement (vector), not total path length.
```

### Output JSON
```json
{
  "concepts": [
    {
      "name": "Equations of Motion",
      "definition": "Three fundamental equations relating velocity, displacement, acceleration, and time for motion with constant acceleration: v = u + at, s = ut + ½at², v² = u² + 2as.",
      "key_facts": [
        "Valid only for constant acceleration",
        "v = u + at relates velocity and time",
        "s = ut + ½at² relates displacement and time",
        "v² = u² + 2as relates velocity and displacement",
        "Apply to one-dimensional motion"
      ],
      "difficulty": "easy",
      "jee_importance": "high",
      "prerequisites": [
        "Velocity",
        "Acceleration",
        "Displacement"
      ],
      "confused_with": [
        "Equations for non-uniform acceleration",
        "Displacement vs distance in kinematics equations"
      ]
    },
    {
      "name": "Constant Acceleration",
      "definition": "Motion where acceleration remains the same throughout the motion, allowing the use of kinematic equations.",
      "key_facts": [
        "Acceleration vector remains constant",
        "Can be zero (uniform motion)",
        "Can be negative (deceleration)",
        "Enables use of kinematic equations"
      ],
      "difficulty": "easy",
      "jee_importance": "high",
      "prerequisites": ["Acceleration"],
      "confused_with": ["Non-uniform acceleration", "Zero acceleration"]
    }
  ],
  "formulas": [
    {
      "name": "First Kinematic Equation",
      "plain_text": "v = u + at",
      "latex": "v = u + at",
      "used_for": "Finding final velocity given initial velocity, acceleration, and time",
      "concept": "Equations of Motion"
    },
    {
      "name": "Second Kinematic Equation",
      "plain_text": "s = ut + (1/2)at²",
      "latex": "s = ut + \\frac{1}{2}at^2",
      "used_for": "Finding displacement given initial velocity, acceleration, and time",
      "concept": "Equations of Motion"
    },
    {
      "name": "Third Kinematic Equation",
      "plain_text": "v² = u² + 2as",
      "latex": "v^2 = u^2 + 2as",
      "used_for": "Finding final velocity or displacement without time",
      "concept": "Equations of Motion"
    }
  ],
  "cross_subject_links": [
    {
      "from_concept": "Equations of Motion",
      "to_concept": "Functions and Graphs",
      "to_subject": "Mathematics",
      "relationship": "APPLIES_TO"
    }
  ],
  "common_mistakes": [
    {
      "concept": "Equations of Motion",
      "mistake": "Using these equations when acceleration is not constant. These are only valid for uniform acceleration. Non-uniform acceleration requires calculus.",
      "pattern_tag": "non_uniform_acceleration_misuse"
    },
    {
      "concept": "Equations of Motion",
      "mistake": "Confusing displacement with distance. These equations use displacement (straight-line change in position), not total path length traveled.",
      "pattern_tag": "displacement_distance_confusion"
    }
  ]
}
```

---

## Example 2: Chemistry (Atomic Structure)

**Section:** 2.4 Bohr's Model of Hydrogen Atom  
**Chapter:** Atomic Structure (Chemistry 11)

### Input Text
```
Bohr proposed that electrons move in specific orbits around the nucleus. 
The radius of the nth orbit is given by:

rₙ = 0.53n² Å

The energy of an electron in the nth orbit is:

Eₙ = -13.6/n² eV

Key features of Bohr model:
1. Electrons occupy discrete energy levels (quantization)
2. Electrons jumping from one level to another emit/absorb photons
3. The frequency of photon is: ν = (E₂ - E₁)/h

Limitations: The model works well only for hydrogen. It fails for 
multi-electron atoms because it doesn't account for electron-electron repulsion.

Common mistake: Thinking electrons follow fixed circular paths like planets. 
The modern quantum model uses orbitals (probability distributions) instead.
```

### Output JSON
```json
{
  "concepts": [
    {
      "name": "Bohr's Model of Hydrogen",
      "definition": "A model of the hydrogen atom where electrons occupy discrete quantized orbits around the nucleus, with allowed energies depending on the principal quantum number n.",
      "key_facts": [
        "Electrons occupy specific orbits, not continuous trajectories",
        "Energy is quantized (only specific values allowed)",
        "Electrons transition between orbits by absorbing/emitting photons",
        "Valid for hydrogen and hydrogen-like ions only",
        "Orbital radius increases with n²"
      ],
      "difficulty": "medium",
      "jee_importance": "high",
      "prerequisites": [
        "Atomic Structure Basics",
        "Quantum Numbers",
        "Photon Energy"
      ],
      "confused_with": [
        "Quantum mechanical model with electron clouds",
        "Planetary model of atom"
      ]
    },
    {
      "name": "Quantization of Energy",
      "definition": "The concept that electrons can only possess specific discrete energy values, not continuous values, when confined to an atom.",
      "key_facts": [
        "Only certain energy levels are allowed",
        "Transitions occur between quantized levels",
        "Energy is absorbed/emitted in discrete packets (photons)"
      ],
      "difficulty": "medium",
      "jee_importance": "high",
      "prerequisites": ["Bohr's Model of Hydrogen"],
      "confused_with": ["Continuous energy distribution"]
    }
  ],
  "formulas": [
    {
      "name": "Bohr Radius Formula",
      "plain_text": "rₙ = 0.53 × n² Å",
      "latex": "r_n = 0.53 \\times n^2 \\text{ \\AA}",
      "used_for": "Calculating the radius of the nth orbit in hydrogen atom",
      "concept": "Bohr's Model of Hydrogen"
    },
    {
      "name": "Energy of Electron in Bohr Orbit",
      "plain_text": "Eₙ = -13.6/n² eV",
      "latex": "E_n = -\\frac{13.6}{n^2} \\text{ eV}",
      "used_for": "Finding the energy of an electron in the nth Bohr orbit of hydrogen",
      "concept": "Quantization of Energy"
    },
    {
      "name": "Photon Emission/Absorption",
      "plain_text": "ν = (E₂ - E₁) / h",
      "latex": "\\nu = \\frac{E_2 - E_1}{h}",
      "used_for": "Calculating frequency of photon when electron transitions between levels",
      "concept": "Bohr's Model of Hydrogen"
    }
  ],
  "cross_subject_links": [
    {
      "from_concept": "Quantization of Energy",
      "to_concept": "Functions and Inverse Relationships",
      "to_subject": "Mathematics",
      "relationship": "APPLIES_TO"
    },
    {
      "from_concept": "Photon Emission/Absorption",
      "to_concept": "Wave Optics and Electromagnetic Radiation",
      "to_subject": "Physics",
      "relationship": "BRIDGES_TO"
    }
  ],
  "common_mistakes": [
    {
      "concept": "Bohr's Model of Hydrogen",
      "mistake": "Thinking electrons follow fixed circular orbits like planets around the sun. The modern quantum model uses electron clouds/orbitals (probability distributions), not definite paths.",
      "pattern_tag": "planetary_model_misconception"
    },
    {
      "concept": "Bohr's Model of Hydrogen",
      "mistake": "Applying Bohr model to atoms other than hydrogen and hydrogen-like ions. The model fails for multi-electron atoms because it ignores electron-electron repulsion.",
      "pattern_tag": "bohr_model_multi_electron"
    }
  ]
}
```

---

## Example 3: Mathematics (Trigonometry)

**Section:** 2.5 Trigonometric Functions of Sum and Difference of Angles  
**Chapter:** Trigonometric Functions (Math 11)

### Input Text
```
When we need to find trigonometric values of sum or difference of angles, 
we use the following identities:

sin(A + B) = sin A cos B + cos A sin B
sin(A - B) = sin A cos B - cos A sin B
cos(A + B) = cos A cos B - sin A sin B
cos(A - B) = cos A cos B + sin A sin B
tan(A + B) = (tan A + tan B) / (1 - tan A tan B)
tan(A - B) = (tan A - tan B) / (1 + tan A tan B)

These identities are fundamental for simplifying trigonometric expressions 
and solving trigonometric equations.

Important: Note the sign changes between addition and subtraction cases. 
Many students make errors with signs.

Special case: When A = B, we get double angle formulas:
sin 2A = 2 sin A cos A
cos 2A = cos² A - sin² A = 2cos² A - 1 = 1 - 2sin² A
```

### Output JSON
```json
{
  "concepts": [
    {
      "name": "Sum and Difference Formulas",
      "definition": "Trigonometric identities that express the sine, cosine, and tangent of sum (A+B) or difference (A-B) of two angles in terms of trigonometric values of individual angles.",
      "key_facts": [
        "Six main formulas for sin(A±B), cos(A±B), tan(A±B)",
        "Signs change between addition and subtraction",
        "Apply to any real angles A and B",
        "Foundation for double angle and multiple angle formulas",
        "Essential for simplifying complex trigonometric expressions"
      ],
      "difficulty": "medium",
      "jee_importance": "high",
      "prerequisites": [
        "Trigonometric Ratios",
        "Unit Circle",
        "Basic Trigonometric Identities"
      ],
      "confused_with": [
        "Product-to-sum formulas",
        "Double angle formulas"
      ]
    },
    {
      "name": "Double Angle Formulas",
      "definition": "Special cases of sum and difference formulas where A = B, giving expressions for sin 2A, cos 2A, and tan 2A.",
      "key_facts": [
        "sin 2A = 2 sin A cos A",
        "cos 2A = cos² A - sin² A",
        "cos 2A = 2cos² A - 1",
        "cos 2A = 1 - 2sin² A",
        "Three equivalent forms for cos 2A allow flexible problem solving"
      ],
      "difficulty": "easy",
      "jee_importance": "high",
      "prerequisites": ["Sum and Difference Formulas"],
      "confused_with": ["Square of trigonometric functions"]
    }
  ],
  "formulas": [
    {
      "name": "sin(A + B) Formula",
      "plain_text": "sin(A + B) = sin A cos B + cos A sin B",
      "latex": "\\sin(A + B) = \\sin A \\cos B + \\cos A \\sin B",
      "used_for": "Finding sine of sum of two angles",
      "concept": "Sum and Difference Formulas"
    },
    {
      "name": "cos(A + B) Formula",
      "plain_text": "cos(A + B) = cos A cos B - sin A sin B",
      "latex": "\\cos(A + B) = \\cos A \\cos B - \\sin A \\sin B",
      "used_for": "Finding cosine of sum of two angles",
      "concept": "Sum and Difference Formulas"
    },
    {
      "name": "tan(A + B) Formula",
      "plain_text": "tan(A + B) = (tan A + tan B) / (1 - tan A tan B)",
      "latex": "\\tan(A + B) = \\frac{\\tan A + \\tan B}{1 - \\tan A \\tan B}",
      "used_for": "Finding tangent of sum of two angles",
      "concept": "Sum and Difference Formulas"
    },
    {
      "name": "sin 2A Formula",
      "plain_text": "sin 2A = 2 sin A cos A",
      "latex": "\\sin 2A = 2 \\sin A \\cos A",
      "used_for": "Finding sine of double angle",
      "concept": "Double Angle Formulas"
    },
    {
      "name": "cos 2A Formula (Form 1)",
      "plain_text": "cos 2A = cos² A - sin² A",
      "latex": "\\cos 2A = \\cos^2 A - \\sin^2 A",
      "used_for": "Finding cosine of double angle",
      "concept": "Double Angle Formulas"
    }
  ],
  "cross_subject_links": [
    {
      "from_concept": "Sum and Difference Formulas",
      "to_concept": "Compound Angles in Wave Motion",
      "to_subject": "Physics",
      "relationship": "APPLIES_TO"
    },
    {
      "from_concept": "Double Angle Formulas",
      "to_concept": "Harmonic Motion and Oscillations",
      "to_subject": "Physics",
      "relationship": "APPLIES_TO"
    }
  ],
  "common_mistakes": [
    {
      "concept": "Sum and Difference Formulas",
      "mistake": "Getting signs wrong in difference formulas. sin(A-B) has a minus sign, but cos(A-B) also has a minus sign (not plus). Many students incorrectly remember cos(A-B) = cos A cos B + sin A sin B.",
      "pattern_tag": "sign_error_cos_difference"
    },
    {
      "concept": "Double Angle Formulas",
      "mistake": "Confusing sin 2A with (sin A)². These are not the same. sin 2A = 2 sin A cos A, not sin² A.",
      "pattern_tag": "double_angle_vs_square"
    }
  ]
}
```

---

## Key Patterns Across Subjects

### Physics
- **Formulas**: Math-heavy, derived from principles
- **Prerequisites**: Often builds on previous chapters linearly
- **Mistakes**: Sign conventions, vector vs scalar confusion, misapplication to non-ideal conditions
- **JEE**: High importance for most chapters

### Chemistry
- **Formulas**: Mathematical models (Bohr, MO theory) + empirical relationships
- **Prerequisites**: Often branching (bonding needs atomic structure, equilibrium needs thermodynamics)
- **Mistakes**: Model limitations (Bohr only for H), confusing similar concepts (electronegativity vs electron affinity)
- **JEE**: Medium-high, more conceptual than formulaic

### Mathematics
- **Formulas**: Pure mathematical relationships, no "real-world" context needed
- **Prerequisites**: Strictly linear (geometry → trigonometry → calculus)
- **Mistakes**: Sign errors, wrong choice of formula, forgetting special cases
- **JEE**: High, but more about application than derivation

---

## Testing Haiku Extraction

You can test a single section without running full ingestion:

```python
import asyncio
from concept_extractor import extract_section

section_text = """[paste NCERT text here]"""
result = asyncio.run(extract_section(
    section_text=section_text,
    section_heading="2.3 Section Title",
    chapter_name="Example Chapter",
    subject="Physics"
))
print(json.dumps(result, indent=2))
```

This will show you exactly what Haiku extracts from any section.
