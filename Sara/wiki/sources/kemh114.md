---
type: source
tags: [mathematics, statistics, probability, standard-deviation, mean-deviation]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Statistics and Probability

**Source:** [[raw/Mathematics/kemh113]] | **Date ingested:** 2026-05-12 | **Type:** book-chapter

## Summary

Note: NCERT Math Class 11 has Statistics as Chapter 13 (kemh113.md file in the actual book is "Statistics") and Probability as Chapter 14 (kemh114.md). The kemh113 file is actually Limits and Derivatives; kemh114 covers probability. This page covers **Statistics** (measures of dispersion: range, mean deviation, variance, standard deviation) and **Probability** (classical definition, event operations, addition rule).

## Key Points

**Statistics — Measures of Dispersion:**
- **Range:** Maximum – Minimum (crude measure; sensitive to outliers)
- **Mean Deviation about mean:** MD(x̄) = (1/n) Σ|xᵢ – x̄| (for ungrouped data)
- **Mean Deviation about median:** MD(M) = (1/n) Σ|xᵢ – M|
- For grouped data: MD = (Σfᵢ|xᵢ – a|)/(Σfᵢ)
- **Variance:** σ² = (1/n) Σ(xᵢ – x̄)² = (Σxᵢ²)/n – x̄²
- **Standard Deviation:** σ = √variance (same units as data)
- Shortcut formula for variance: σ² = (Σxᵢ²/n) – (Σxᵢ/n)² [mean of squares minus square of mean]
- **Coefficient of Variation (CV):** CV = (σ/x̄) × 100% (compares variability of different distributions)
- Distribution with lower CV is more consistent

**Probability (Classical):**
- Sample space S: set of all possible outcomes
- Event E: subset of S
- P(E) = n(E)/n(S) for equally likely outcomes; 0 ≤ P(E) ≤ 1
- Certain event: P(S) = 1; Impossible event: P(∅) = 0
- **Complement:** P(E') = 1 – P(E)
- **Addition Rule:** P(A∪B) = P(A) + P(B) – P(A∩B)
- **Mutually exclusive events:** P(A∩B) = 0 → P(A∪B) = P(A) + P(B)
- **Exhaustive events:** P(A₁∪A₂∪...∪Aₙ) = 1
- **Equally likely events:** each outcome has same probability

## Entities Mentioned

No specific entities.

## Concepts Mentioned

[[concepts/statistics-probability]] — dedicated concept page

## Notable Quotes

> "Statistics may be rightly called the science of averages and their estimates."

> "The coefficient of variation helps compare variability of two or more datasets."

## My Take

**JEE Frequency: Medium-High.** Statistics appears 1–2 times per JEE Mains — usually a numerical question on standard deviation or a probability problem. Probability expands significantly in Class 12 (conditional probability, Bayes' theorem, distributions).

**Most-asked Statistics:**
1. Calculating variance and standard deviation from given data set (ungrouped)
2. Using the shortcut formula σ² = mean of squares – (mean)²
3. Coefficient of variation to compare two distributions
4. Combined mean and variance when two datasets are merged

**Most-asked Probability:**
1. Classical probability: find P(event) by counting outcomes
2. Addition rule for non-mutually exclusive events
3. Complement rule: P(at least one) = 1 – P(none)
4. Forming sample spaces for compound experiments (two dice, cards)

**Common traps:**
- Variance uses (xᵢ – x̄)² not |xᵢ – x̄| — squaring, not absolute value (that's mean deviation)
- Standard deviation = √(variance) — units are same as data (variance units are squared)
- P(A∩B) ≠ 0 for non-mutually exclusive events — always use full addition rule when unsure
- "At least one" problems: use 1 – P(none) to avoid computing multiple cases

**Cross-connections:** Mean and variance formulas → [[concepts/sequences-and-series]] (summation notation); probability sample spaces → [[concepts/sets-and-relations]] (set operations); permutations and combinations → [[concepts/permutations-combinations]] (counting outcomes).
