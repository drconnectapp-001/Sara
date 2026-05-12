---
type: source
tags: [mathematics, limits, derivatives, calculus, differentiation]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Limits and Derivatives

**Source:** [[raw/Mathematics/kemh113]] | **Date ingested:** 2026-05-12 | **Type:** book-chapter

## Summary

Chapter 13 introduces differential calculus — starting from the intuitive concept of limits and building to the formal derivative. Limits are defined using the ε-δ approach informally, key limit theorems are established, and standard limits are derived. Derivatives are defined as the limit of the difference quotient, interpreted geometrically as slope of tangent, and standard differentiation formulas are derived.

## Key Points

**Limits:**
- lim(x→a) f(x) = L means f(x) can be made arbitrarily close to L by choosing x close (but not equal) to a
- Left-hand limit lim(x→a⁻) and right-hand limit lim(x→a⁺) must both equal L for limit to exist
- Algebra of limits (if lim f = L and lim g = M):
  - lim(f±g) = L±M; lim(fg) = LM; lim(f/g) = L/M (if M≠0)
  - lim(cf) = cL; lim(fⁿ) = Lⁿ

**Standard Limits:**
- lim(x→a) (xⁿ – aⁿ)/(x – a) = naⁿ⁻¹
- lim(x→0) sinx/x = 1 (x in radians!)
- lim(x→0) tanx/x = 1
- lim(x→0) (1–cosx)/x = 0
- lim(x→0) (1–cosx)/x² = 1/2
- lim(x→0) (eˣ–1)/x = 1 (from Class 12, but useful)
- lim(x→0) log(1+x)/x = 1

**Derivatives:**
- f'(x) = lim(h→0) [f(x+h) – f(x)]/h (first principles definition)
- Geometric meaning: slope of tangent to y = f(x) at point x
- Notation: f'(x), dy/dx, Df(x)

**Standard Derivatives:**
- d/dx(xⁿ) = nxⁿ⁻¹ (power rule)
- d/dx(sinx) = cosx; d/dx(cosx) = –sinx
- d/dx(tanx) = sec²x; d/dx(cotx) = –cosec²x
- d/dx(secx) = secx tanx; d/dx(cosecx) = –cosecx cotx
- d/dx(constant) = 0

**Rules of Differentiation:**
- Sum rule: (f+g)' = f'+g'
- Product rule: (fg)' = f'g + fg'
- Quotient rule: (f/g)' = (f'g – fg')/g²

## Entities Mentioned

No specific entities.

## Concepts Mentioned

[[concepts/limits-and-derivatives]] — dedicated concept page

## Notable Quotes

> "The derivative of a function f at a point x is defined as f'(x) = lim(h→0) [f(x+h)–f(x)]/h, provided this limit exists."

## My Take

**JEE Frequency: Very High.** Limits and Derivatives is among the top 3 most-tested Math topics — 3–5 questions per JEE paper. Class 11 covers the basics; Class 12 adds chain rule, implicit, logarithmic, and parametric differentiation, plus integration.

**Most-asked Class 11 topics:**
1. Standard limits: sinx/x → 1 as x→0 (and variations)
2. L'Hôpital's rule (Class 12) but 0/0 form limits using factoring or rationalisation
3. Derivative from first principles (definition) — asked 1–2 times per paper
4. Product and quotient rule applications
5. Differentiation of trig functions

**Most-asked limits:**
- lim(x→0) sinx/x = 1; lim(x→0) (1–cosx)/x² = 1/2; lim(x→a) (xⁿ–aⁿ)/(x–a) = naⁿ⁻¹

**Common traps:**
- lim sinx/x = 1 requires x in RADIANS (not degrees)
- Existence of limit requires BOTH left and right limits equal — greatest integer function [x] often makes limits not exist at integers
- Product rule: (uv)' = u'v + uv' — don't forget BOTH terms
- Derivative of cos is NEGATIVE sin: d/dx(cosx) = –sinx

**Cross-connections:** Instantaneous velocity = derivative of position → [[concepts/kinematics]]; tangent slope = derivative → [[concepts/straight-lines]]; standard limit lim(1+1/n)ⁿ = e → [[concepts/sequences-and-series]]; integration (Class 12) is the inverse of differentiation — sin and cos derivatives must be memorised for integral formulas.
