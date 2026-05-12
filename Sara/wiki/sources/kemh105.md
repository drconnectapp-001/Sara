---
type: source
tags: [mathematics, complex-numbers, quadratic-equations, argand-plane]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Complex Numbers and Quadratic Equations

**Source:** [[raw/Mathematics/kemh105]] | **Date ingested:** 2026-05-12 | **Type:** book-chapter

## Summary

Chapter 5 introduces complex numbers to handle square roots of negative numbers, which arise in solving quadratic equations with negative discriminants. A complex number z = a + ib has real part a and imaginary part b; i = √(–1) satisfies i² = –1. The chapter covers arithmetic of complex numbers, the Argand plane (geometric representation), polar/modulus-argument form, and the quadratic formula with all cases of discriminant.

## Key Points

- **Imaginary unit:** i = √(–1); i² = –1; i³ = –i; i⁴ = 1 (cycle of 4: i, –1, –i, 1)
- **Complex number:** z = a + ib; Re(z) = a; Im(z) = b
- **Equality:** a + ib = c + id ⟺ a = c AND b = d
- **Operations:**
  - Addition: (a+ib) + (c+id) = (a+c) + i(b+d)
  - Multiplication: (a+ib)(c+id) = (ac–bd) + i(ad+bc)
  - Conjugate: z̄ = a – ib; z·z̄ = a² + b²
  - Modulus: |z| = √(a²+b²); |z₁z₂| = |z₁||z₂|; |z₁/z₂| = |z₁|/|z₂|
  - Division: z₁/z₂ = (z₁·z̄₂)/(|z₂|²) [multiply by conjugate]
- **Argand Plane:** x-axis = real axis; y-axis = imaginary axis; point (a,b) represents z = a+ib
- **Polar Form:** z = r(cosθ + i sinθ) = r∠θ; r = |z|; θ = arg(z) = arctan(b/a)
- **Principal argument:** –π < θ ≤ π
- **Modulus properties:** |z₁+z₂| ≤ |z₁|+|z₂| (triangle inequality)
- **Quadratic formula:** For ax²+bx+c = 0, x = (–b ± √(b²–4ac))/(2a)
  - D > 0: two distinct real roots
  - D = 0: two equal real roots
  - D < 0: two complex conjugate roots (no real roots)
- **Roots are conjugates:** if D < 0, roots are p+iq and p–iq

## Entities Mentioned

No specific entities.

## Concepts Mentioned

[[concepts/complex-numbers]] — dedicated concept page

## Notable Quotes

> "We need the square root of –1 to solve equations like x²+1=0, which has no real solution."

## My Take

**JEE Frequency: High.** Complex numbers appears 2–3 times per JEE paper, including algebraic manipulations, Argand plane geometry, and modulus-argument problems.

**Most-asked topics:**
1. Powers of i: i^n — use cycle of 4
2. Finding modulus and argument of z = a+ib
3. Geometric interpretation in Argand plane: distance, locus problems
4. Multiplying and dividing complex numbers (rationalise with conjugate)
5. Quadratic with complex roots: sum and product of roots (Vieta's formulas)

**Common traps:**
- arg(z) vs principal arg: use the quadrant to determine correct angle
- i^(4n) = 1, i^(4n+1) = i, i^(4n+2) = –1, i^(4n+3) = –i — compute the remainder when dividing power by 4
- Complex roots of quadratic come in CONJUGATE PAIRS (for real coefficients)
- |z₁ + z₂| ≤ |z₁| + |z₂| equality iff z₁/z₂ is a non-negative real number

**Cross-connections:** Complex numbers → [[concepts/sequences-and-series]] (geometric series with complex ratio); Argand plane geometry → [[concepts/straight-lines]] and [[concepts/conic-sections]]; discriminant D → used in all quadratic-related problems in Algebra.
