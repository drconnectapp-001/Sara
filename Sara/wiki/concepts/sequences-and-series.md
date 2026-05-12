---
type: concept
tags: [mathematics, sequences, ap, gp, hp, series, am-gm]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Sequences and Series

## Definition

A sequence is an ordered list of numbers following a pattern; a series is the sum of a sequence. Arithmetic Progressions (AP), Geometric Progressions (GP), and Harmonic Progressions (HP) are the fundamental types, each with formulas for the nth term and sum.

## Why It Matters

Sequences and Series is a consistently high-scoring topic in JEE — 2–3 questions per paper. AM-GM-HM inequalities appear in optimization problems. The special sums Σk, Σk², Σk³ are essential for evaluating definite integrals via Riemann sums (Class 12).

## Related Concepts

[[concepts/limits-and-derivatives]] — Riemann sums use Σk, Σk², Σk³; limit of (1+1/n)ⁿ = e
[[concepts/binomial-theorem]] — binomial expansion as a finite series; sum of coefficients = 2ⁿ
[[concepts/permutations-combinations]] — counting terms in expansions

## Evidence & Examples

**AP Formulas:**
- aₙ = a + (n–1)d; Sₙ = n[2a+(n–1)d]/2 = n(a+l)/2 [l = last term]
- 3 numbers in AP: take (a–d, a, a+d)

**GP Formulas:**
- aₙ = arⁿ⁻¹; Sₙ = a(rⁿ–1)/(r–1); S∞ = a/(1–r) for |r|<1
- 3 numbers in GP: take (a/r, a, ar)
- GM of a and b: G = √(ab); G² = ab

**HP:**
- If a, H, b in HP: 1/H = (1/a + 1/b)/2 → H = 2ab/(a+b)

**AM-GM-HM Inequality:**
- AM ≥ GM ≥ HM (for positive numbers)
- AM = GM = HM iff all equal
- AM·HM = GM² (for two numbers)
- AM ≥ GM usage: if x + y = constant, maximum xy is when x = y

**Special Sums:**
- Σk = n(n+1)/2
- Σk² = n(n+1)(2n+1)/6
- Σk³ = [n(n+1)/2]²
- Sum of infinite geometric: 1/(1–x) = 1 + x + x² + ... for |x|<1

## Open Questions

- How does the sum of a divergent series (e.g., 1+2+3+...) have meaning in number theory (Ramanujan summation)?
- How do power series (Class 12) extend finite polynomial series?

## Sources

[[sources/kemh109]] — Sequences and Series (NCERT Class 11)
