---
type: source
tags: [mathematics, permutations, combinations, counting, factorial]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Permutations and Combinations

**Source:** [[raw/Mathematics/kemh107]] | **Date ingested:** 2026-05-12 | **Type:** book-chapter

## Summary

Chapter 7 develops systematic counting methods — permutations (arrangements where order matters) and combinations (selections where order does not matter). The chapter builds from the fundamental principle of counting, through factorial notation, to the key formulas ⁿPᵣ and ⁿCᵣ, and concludes with properties of combinations and connections to the Binomial Theorem.

## Key Points

- **Fundamental Principle of Counting:** If event A can occur in m ways AND event B in n ways, then both can occur in m×n ways (multiplication); if either A OR B (mutually exclusive) → m+n ways (addition)
- **Factorial:** n! = n × (n–1) × ... × 2 × 1; 0! = 1; 1! = 1
- **Permutation ⁿPᵣ:** arrangements of r objects from n distinct objects (order matters)
  - ⁿPᵣ = n!/(n–r)! = n(n–1)(n–2)...(n–r+1)
  - ⁿPₙ = n! (all objects arranged)
- **Permutations with repetition:** n objects in r places = nʳ
- **Permutations with identical objects:** n objects with p identical of one type, q of another: n!/(p!q!...)
- **Circular permutations:** (n–1)! ways to arrange n distinct objects in a circle (one position fixed)
- **Combination ⁿCᵣ:** selections of r objects from n (order doesn't matter)
  - ⁿCᵣ = n!/[r!(n–r)!] = ⁿPᵣ/r!
  - ⁿC₀ = ⁿCₙ = 1; ⁿCᵣ = ⁿCₙ₋ᵣ
  - ⁿCᵣ + ⁿCᵣ₊₁ = ⁿ⁺¹Cᵣ₊₁ (Pascal's rule)
- **Key properties:** ⁿCᵣ = ⁿCₙ₋ᵣ (use this to simplify when r is large)
- **Sum property:** ⁿC₀ + ⁿC₁ + ... + ⁿCₙ = 2ⁿ (number of subsets of n-element set)

## Entities Mentioned

No specific entities.

## Concepts Mentioned

[[concepts/permutations-combinations]] — dedicated concept page
[[concepts/binomial-theorem]] — directly uses combinations as coefficients

## Notable Quotes

> "Permutation is an arrangement in a definite order. Combination is a selection."

## My Take

**JEE Frequency: High.** Permutations and Combinations appears 1–2 times per JEE paper. Problems range from straightforward formula application to tricky constraint problems.

**Most-asked topics:**
1. Arrangement with identical letters (e.g., how many arrangements of MISSISSIPPI?)
2. Selection problems: choosing committee with/without constraints
3. Circular arrangements (necklace, round table)
4. Distribution problems (distributing identical/distinct objects)
5. Counting paths on a grid (combination application)

**Common traps:**
- Circular permutation of n: (n–1)! for distinct objects; n!/(2n) if clockwise = anticlockwise (necklace)
- REPETITION matters: "at least one" problems use complementary counting
- ⁿCᵣ = ⁿCₙ₋ᵣ: use when r > n/2 to compute more easily (ⁿC₉₈ = ⁿC₂ if n=100)
- Words containing "arrangements": USUALLY permutation; "selections", "teams", "committees": USUALLY combination

**Cross-connections:** Combinations → [[concepts/binomial-theorem]] (binomial coefficients = ⁿCᵣ); counting methods → [[concepts/statistics-probability]] (probability = favourable/total); factorial → [[concepts/sequences-and-series]] (terms in expansions).
