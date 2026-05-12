---
type: source
tags: [mathematics, trigonometry, trig-functions, identities, inverse-trig]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Trigonometric Functions

**Source:** [[raw/Mathematics/kemh103]] | **Date ingested:** 2026-05-12 | **Type:** book-chapter

## Summary

Chapter 3 generalises trigonometric ratios from acute angles to trigonometric functions defined for all real numbers via the unit circle. It covers radian measure, the six trig functions (sin, cos, tan, cot, sec, cosec), their domains and ranges, fundamental identities, addition/subtraction formulas, double/triple angle formulas, product-to-sum transformations, and the principal value concept. This is the most formula-dense chapter in Class 11 Math.

## Key Points

**Angle Measurement:**
- 1 radian = angle subtended by arc equal to radius; 2π rad = 360°
- Conversion: π rad = 180°; rad = (π/180) × degrees; degrees = (180/π) × rad
- Arc length: l = rθ (r = radius, θ in radians)

**Signs by Quadrant (ASTC rule — All, Sin, Tan, Cos):**
- Q1: all positive; Q2: sin, cosec positive; Q3: tan, cot positive; Q4: cos, sec positive

**Values at Key Angles:**
| θ | 0 | 30° | 45° | 60° | 90° | 180° | 270° | 360° |
|---|---|-----|-----|-----|-----|------|------|------|
| sin | 0 | 1/2 | 1/√2 | √3/2 | 1 | 0 | –1 | 0 |
| cos | 1 | √3/2 | 1/√2 | 1/2 | 0 | –1 | 0 | 1 |
| tan | 0 | 1/√3 | 1 | √3 | ∞ | 0 | ∞ | 0 |

**Fundamental Identities:**
- sin²θ + cos²θ = 1
- 1 + tan²θ = sec²θ
- 1 + cot²θ = cosec²θ

**Addition Formulas:**
- sin(A±B) = sinA cosB ± cosA sinB
- cos(A±B) = cosA cosB ∓ sinA sinB
- tan(A±B) = (tanA ± tanB)/(1 ∓ tanA tanB)

**Double Angle Formulas:**
- sin 2A = 2 sinA cosA = 2tanA/(1+tan²A)
- cos 2A = cos²A – sin²A = 1 – 2sin²A = 2cos²A – 1 = (1–tan²A)/(1+tan²A)
- tan 2A = 2tanA/(1–tan²A)

**Triple Angle Formulas:**
- sin 3A = 3sinA – 4sin³A
- cos 3A = 4cos³A – 3cosA
- tan 3A = (3tanA – tan³A)/(1 – 3tan²A)

**Sum-to-Product / Product-to-Sum:**
- sinC + sinD = 2 sin((C+D)/2) cos((C–D)/2)
- sinC – sinD = 2 cos((C+D)/2) sin((C–D)/2)
- cosC + cosD = 2 cos((C+D)/2) cos((C–D)/2)
- cosC – cosD = –2 sin((C+D)/2) sin((C–D)/2)
- 2sinA cosB = sin(A+B) + sin(A–B)
- 2cosA cosB = cos(A+B) + cos(A–B)
- 2sinA sinB = cos(A–B) – cos(A+B)

**Half-Angle Formulas:**
- sin²(θ/2) = (1–cosθ)/2; cos²(θ/2) = (1+cosθ)/2
- tan(θ/2) = sinθ/(1+cosθ) = (1–cosθ)/sinθ

**Domain and Range:**
| Function | Domain | Range |
|----------|--------|-------|
| sin x | ℝ | [–1, 1] |
| cos x | ℝ | [–1, 1] |
| tan x | ℝ \ {π/2 + nπ} | ℝ |
| cot x | ℝ \ {nπ} | ℝ |
| sec x | ℝ \ {π/2 + nπ} | (–∞,–1] ∪ [1,∞) |
| cosec x | ℝ \ {nπ} | (–∞,–1] ∪ [1,∞) |

## Entities Mentioned

No specific entities.

## Concepts Mentioned

[[concepts/trigonometric-functions]] — dedicated concept/reference page

## Notable Quotes

> "The word 'trigonometry' is derived from the Greek words 'trigon' and 'metron' and it means 'measuring the sides of a triangle'."

## My Take

**JEE Frequency: Extremely High.** Trigonometry is tested in EVERY JEE paper — 3–5 questions directly, plus trig appears as a tool in almost every other chapter (integration, differentiation, SHM, waves, projectile). This is one of Sara's most important chapters to master.

**Most-asked topics:**
1. Simplify/prove identities using addition/double/triple angle formulas
2. Find principal solutions and general solutions of trig equations
3. Sum-to-product and product-to-sum transformations in evaluations
4. Conditional identities (if A+B+C = π, prove...)
5. Range of trig expressions (asinθ + bcosθ): range = [–√(a²+b²), √(a²+b²)]

**Most-asked derivations:**
- Addition formula sin(A+B) proof using coordinate geometry
- cos 2A in three forms (all used in integration later)

**Common traps:**
- General solution of sinθ = sinα → θ = nπ + (–1)ⁿα; cosθ = cosα → θ = 2nπ ± α; tanθ = tanα → θ = nπ + α
- Double angle: cos2A = 2cos²A – 1 = 1 – 2sin²A — memorise ALL three forms for use in integration
- sin(90°–θ) = cosθ; sin(90°+θ) = cosθ; sin(180°–θ) = sinθ; sin(180°+θ) = –sinθ

**Cross-connections:** Trig functions → [[sources/keph206]] (SHM uses sin/cos); range formula √(a²+b²) → [[sources/keph103]] (projectile range maximum); double angle cos2A = 1–2sin²A → crucial for [[concepts/limits-and-derivatives]] (integration of sin²x and cos²x).
