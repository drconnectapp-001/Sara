---
type: source
tags: [mathematics, sequences, series, ap, gp, hp, arithmetic-geometric]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Sequences and Series

**Source:** [[raw/Mathematics/kemh109]] | **Date ingested:** 2026-05-12 | **Type:** book-chapter

## Summary

Chapter 9 covers sequences and series — ordered lists of numbers and their sums. The three fundamental progressions are Arithmetic Progression (AP), Geometric Progression (GP), and Harmonic Progression (HP). The chapter derives formulas for nth term and sum, establishes the AM-GM-HM inequality, and covers special series Σn, Σn², Σn³. This chapter is directly applicable to integration via Riemann sums.

## Key Points

**Arithmetic Progression (AP):**
- nth term: aₙ = a + (n–1)d [a = first term, d = common difference]
- Sum of n terms: Sₙ = n/2 × [2a + (n–1)d] = n/2 × (first + last)
- Arithmetic mean: A = (a+b)/2; n AMs between a and b: common difference = (b–a)/(n+1)
- Sum of first n natural numbers: Σk = n(n+1)/2
- If a, A, b are in AP: A = (a+b)/2

**Geometric Progression (GP):**
- nth term: aₙ = arⁿ⁻¹ [a = first term, r = common ratio]
- Sum of n terms: Sₙ = a(rⁿ–1)/(r–1) for r ≠ 1; Sₙ = na for r = 1
- Sum of infinite GP (|r|<1): S∞ = a/(1–r)
- Geometric mean: G = √(ab); n GMs between a and b
- If a, G, b are in GP: G² = ab

**Harmonic Progression (HP):**
- Sequence whose reciprocals form AP: 1/a, 1/(a+d), 1/(a+2d), ...
- nth term of HP: H_n = 1/(a + (n–1)d)
- Harmonic mean: H = 2ab/(a+b)

**AM-GM-HM Inequality:**
- For positive numbers: AM ≥ GM ≥ HM
- AM = GM = HM iff all numbers are equal
- AM×HM = GM² (for two positive numbers)

**Special Series:**
- Σk = n(n+1)/2
- Σk² = n(n+1)(2n+1)/6
- Σk³ = [n(n+1)/2]²
- Arithmetico-Geometric Series: sum of (a+(n–1)d)rⁿ⁻¹

## Entities Mentioned

No specific entities.

## Concepts Mentioned

[[concepts/sequences-and-series]] — dedicated concept page
[[concepts/binomial-theorem]] — series expansions connect here

## Notable Quotes

> "Every sequence is a function but every function need not be a sequence."

## My Take

**JEE Frequency: Very High.** Sequences and Series is consistently one of the highest-weightage Math topics — 2–3 questions per JEE paper.

**Most-asked topics:**
1. Find nth term and sum of AP/GP given conditions
2. Insert AMs/GMs between two numbers
3. Sum of infinite GP: converges when |r| < 1
4. AM ≥ GM inequality to find minimum/maximum values
5. Special series Σk, Σk², Σk³ — appear in limit problems and summation questions
6. Arithmetico-geometric series (AGP) — multiply by r trick

**Most-asked derivation:**
- Sum of GP derivation (multiply by r, subtract)
- AM ≥ GM for two positive numbers proof: (√a – √b)² ≥ 0

**Common traps:**
- Sum of infinite GP converges ONLY for |r| < 1 (|r| ≥ 1 → diverges to ∞)
- AGP: don't confuse with ordinary GP; use the multiply-shift technique
- HM of a and b = 2ab/(a+b), NOT (a+b)/2 (that's AM)
- In AP problems: "3 numbers in AP" → take as (a–d, a, a+d) to simplify algebra

**Cross-connections:** Σk, Σk², Σk³ → [[concepts/limits-and-derivatives]] (definite integral as Riemann sum limit); geometric series → [[concepts/binomial-theorem]] (sum of infinite geometric series = 1/(1–x) for |x|<1); AM-GM → used in inequality problems throughout JEE.
