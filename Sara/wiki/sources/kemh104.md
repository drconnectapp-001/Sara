---
type: source
tags: [mathematics, mathematical-induction, proof-technique]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Principle of Mathematical Induction

**Source:** [[raw/Mathematics/kemh104]] | **Date ingested:** 2026-05-12 | **Type:** book-chapter

## Summary

Chapter 4 introduces Mathematical Induction — a deductive proof method for statements involving natural numbers. The two-step process (base case + inductive step) is rigorous proof by "climbing a ladder": show the first rung holds, then show each rung implies the next. The chapter consists almost entirely of worked examples proving summation formulas, divisibility, and inequalities.

## Key Points

- **Principle of Mathematical Induction:** Let P(n) be a statement about natural numbers. If:
  1. P(1) is true (base case)
  2. P(k) true → P(k+1) true for all k ≥ 1 (inductive step)
  Then P(n) is true for all n ∈ ℕ

- **Standard summation formulas proved by induction:**
  - 1 + 2 + 3 + ... + n = n(n+1)/2
  - 1² + 2² + 3² + ... + n² = n(n+1)(2n+1)/6
  - 1³ + 2³ + 3³ + ... + n³ = [n(n+1)/2]² = (Sum of first n natural numbers)²
  - 1 + 3 + 5 + ... + (2n–1) = n²

- **Divisibility proofs:** Show (expression) is divisible by some integer; e.g., n(n+1)(n+2) is divisible by 6

- **Inductive step structure:** Assume P(k), write P(k+1), manipulate until P(k) appears, use assumption to conclude

## Entities Mentioned

No specific entities.

## Concepts Mentioned

No new concepts — pure proof technique.

## Notable Quotes

> "The method of proof by induction can be used to prove a conjecture. The process involves two steps: Verify that P(1) is true; Assume P(k) is true and show that P(k+1) is true."

## My Take

**JEE Frequency: Low.** Mathematical Induction rarely appears as a direct question in JEE Mains (0–1 question). However, the summation formulas proved here (n(n+1)/2, n(n+1)(2n+1)/6, [n(n+1)/2]²) are used extensively in [[concepts/sequences-and-series]] and [[concepts/limits-and-derivatives]].

**Most-asked:** Usually a single question asking to prove a divisibility statement or summation formula by induction.

**Key formulas to memorise from this chapter:**
- Σk = n(n+1)/2
- Σk² = n(n+1)(2n+1)/6
- Σk³ = [n(n+1)/2]²

**Common traps:**
- Must show base case FIRST (usually n=1); don't skip it
- The inductive hypothesis assumes P(k) true — you haven't proved it, just assumed it for that step
- When proving "divisible by d", express P(k+1) in terms of P(k) to use the hypothesis

**Cross-connections:** Summation formulas → [[concepts/sequences-and-series]] (sum of AP/GP); Σk³ formula → [[concepts/limits-and-derivatives]] (evaluating limits by Riemann sums).
