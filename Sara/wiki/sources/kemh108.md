---
type: source
tags: [mathematics, binomial-theorem, expansions, general-term]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Binomial Theorem

**Source:** [[raw/Mathematics/kemh108]] | **Date ingested:** 2026-05-12 | **Type:** book-chapter

## Summary

Chapter 8 develops the Binomial Theorem — the formula for expanding (a+b)ⁿ for any positive integer n. The coefficients are binomial coefficients ⁿCᵣ, forming Pascal's triangle. The chapter derives the general term, finds specific terms in an expansion, identifies the middle term(s), and proves important coefficient identities.

## Key Points

- **Binomial Theorem:** (a+b)ⁿ = Σ(r=0 to n) ⁿCᵣ aⁿ⁻ʳ bʳ
  - = ⁿC₀ aⁿ + ⁿC₁ aⁿ⁻¹b + ⁿC₂ aⁿ⁻²b² + ... + ⁿCₙ bⁿ
- **General term:** T_(r+1) = ⁿCᵣ aⁿ⁻ʳ bʳ (the (r+1)th term)
- **Middle term:**
  - If n is even: middle term = T_(n/2+1)
  - If n is odd: two middle terms = T_((n+1)/2) and T_((n+3)/2)
- **Pascal's Triangle:** Row n has coefficients ⁿC₀, ⁿC₁, ..., ⁿCₙ; each entry = sum of two above
- **Important identities from setting a=b=1:**
  - ⁿC₀ + ⁿC₁ + ⁿC₂ + ... + ⁿCₙ = 2ⁿ (all coefficients sum to 2ⁿ)
  - ⁿC₀ – ⁿC₁ + ⁿC₂ – ... = 0 (alternating sum = 0; set a=1, b=–1)
  - ⁿC₀ + ⁿC₂ + ⁿC₄ + ... = 2ⁿ⁻¹ (even-indexed coefficients)
  - ⁿC₁ + ⁿC₃ + ⁿC₅ + ... = 2ⁿ⁻¹ (odd-indexed coefficients)
- **Binomial approximation (for |x|<<1):** (1+x)ⁿ ≈ 1 + nx (used in physics approximations)
- **Term independent of x:** find r such that power of x in T_(r+1) = 0

## Entities Mentioned

No specific entities.

## Concepts Mentioned

[[concepts/binomial-theorem]] — dedicated concept page
[[concepts/permutations-combinations]] — binomial coefficients = combinations

## Notable Quotes

> "The coefficients in the binomial expansion are called binomial coefficients."

## My Take

**JEE Frequency: High.** Binomial theorem appears 1–2 times per JEE paper — typically finding a specific term, the term independent of x, or applying coefficient properties.

**Most-asked topics:**
1. Finding the general term T_(r+1) = ⁿCᵣ aⁿ⁻ʳ bʳ and using it to find a specific term
2. Term independent of x in expansions like (x + 1/x)ⁿ → set power of x = 0, solve for r
3. Middle term of expansion
4. Proving coefficient identities (set specific values of a and b)
5. Numerically greatest term in an expansion

**Common traps:**
- General term is T_(r+1), NOT T_r — off-by-one errors are very common
- "Third term from end" = "second term from end of reverse expansion" → T_(n–1) from the front... easier to count from the END
- When finding term independent of x in (x^a + x^(-b))^n: write full power of x and set = 0

**Cross-connections:** Binomial coefficients → [[concepts/permutations-combinations]] (same ⁿCᵣ formulas); (1+x)ⁿ ≈ 1+nx approximation → used in [[sources/keph205]] (kinetic theory approximations); coefficient sum 2ⁿ → [[concepts/sets-and-relations]] (number of subsets = 2ⁿ).
