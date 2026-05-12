---
type: source
tags: [mathematics, relations, functions, domain-range, types-of-functions]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Relations and Functions

**Source:** [[raw/Mathematics/kemh102]] | **Date ingested:** 2026-05-12 | **Type:** book-chapter

## Summary

Chapter 2 builds on Set Theory to develop the formal concepts of relations and functions. A relation is a subset of the Cartesian product A×B; a function is a special relation where each element of the domain maps to exactly one element of the codomain. The chapter classifies functions by injectivity, surjectivity, and bijectivity, and discusses domain, range, codomain, and the algebra of functions.

## Key Points

- **Cartesian Product:** A × B = {(a,b) : a ∈ A, b ∈ B}; |A × B| = |A| × |B|
- **Relation R:** any subset of A × B; if (a,b) ∈ R then "a is related to b" written aRb
- **Domain of R:** set of all first elements; Range of R: set of all second elements
- **Function f : A → B:** each element of A has exactly one image in B; domain = A; codomain = B; range ⊆ codomain
- **Types of functions:**
  - Injective (one-one): f(a₁) = f(a₂) → a₁ = a₂; no two distinct inputs give same output
  - Surjective (onto): range = codomain; every element of B has a pre-image
  - Bijective: both injective and surjective; invertible
- **Number of functions:** from A (m elements) to B (n elements) = nᵐ
- **Composition:** (g ∘ f)(x) = g(f(x)); not commutative in general
- **Inverse function:** exists iff f is bijective; f⁻¹: B → A
- **Special functions:**
  - Identity: f(x) = x
  - Constant: f(x) = c for all x
  - Polynomial, rational, modulus |x|, signum, greatest integer [x]
- **Greatest integer (floor) function:** [x] = largest integer ≤ x; [3.7] = 3; [–1.2] = –2

## Entities Mentioned

No specific entities.

## Concepts Mentioned

[[concepts/sets-and-relations]] — relations as an extension of sets

## Notable Quotes

> "A function from a set A to a set B is a rule or correspondence that assigns to each element of set A exactly one element of set B."

## My Take

**JEE Frequency: High.** Functions is heavily tested in JEE — 2–3 questions per paper, including domain/range finding and function classification.

**Most-asked topics:**
1. Finding domain and range of complex functions (involving √, log, 1/x)
2. Checking if a function is one-one, onto, or bijective
3. Composition of functions: find (f∘g)(x); find g when f∘g or f is given
4. Greatest integer function [x]: graph reading and value at specific points
5. Modulus function |x|: graph; solve equations/inequalities

**Common traps:**
- Range ≠ codomain unless function is surjective
- [x] for negative non-integers: [–1.2] = –2 (NOT –1; go to the LEFT on number line)
- f is invertible iff it is bijective; "f has an inverse" requires bijectivity
- Domain of √f(x): need f(x) ≥ 0; domain of log(f(x)): need f(x) > 0

**Cross-connections:** Function composition → [[concepts/trigonometric-functions]] (composite trig functions); bijective functions → [[concepts/permutations-combinations]] (counting bijections = n!); domain/range → [[concepts/limits-and-derivatives]] (continuity requires domain).
