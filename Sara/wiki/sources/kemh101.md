---
type: source
tags: [mathematics, sets, set-theory, venn-diagrams]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Sets

**Source:** [[raw/Mathematics/kemh101]] | **Date ingested:** 2026-05-12 | **Type:** book-chapter

## Summary

Chapter 1 of NCERT Mathematics introduces Set Theory — the language of modern mathematics. A set is a well-defined collection of objects. The chapter develops notation, types of sets, operations (union, intersection, complement, difference), De Morgan's laws, and Venn diagrams, concluding with practical applications to counting using the inclusion-exclusion principle.

## Key Points

- **Set notation:** roster form {1, 2, 3}; set-builder form {x : x is a prime < 10}
- **Types of sets:** empty (∅ or {}), singleton, finite, infinite, equal (same elements), equivalent (same cardinality)
- **Subsets:** A ⊆ B if every element of A ∈ B; proper subset A ⊂ B (A ≠ B); every set is subset of itself; ∅ ⊆ every set
- **Power set:** P(A) = set of all subsets of A; if |A| = n then |P(A)| = 2ⁿ
- **Universal set U:** context-specific; all sets in discussion are subsets of U
- **Operations:**
  - Union: A ∪ B = {x : x ∈ A or x ∈ B}
  - Intersection: A ∩ B = {x : x ∈ A and x ∈ B}
  - Difference: A – B = {x : x ∈ A and x ∉ B}
  - Complement: A' = U – A = {x : x ∈ U, x ∉ A}
- **De Morgan's Laws:** (A ∪ B)' = A' ∩ B'; (A ∩ B)' = A' ∪ B'
- **Venn diagrams:** visual representation of set relationships
- **Counting formula (Inclusion-Exclusion):**
  - |A ∪ B| = |A| + |B| – |A ∩ B|
  - |A ∪ B ∪ C| = |A| + |B| + |C| – |A ∩ B| – |B ∩ C| – |A ∩ C| + |A ∩ B ∩ C|
- **Disjoint sets:** A ∩ B = ∅; for disjoint: |A ∪ B| = |A| + |B|
- **Intervals:** [a,b] closed; (a,b) open; [a,b) half-open; (a,b] half-open

## Entities Mentioned

No specific entities.

## Concepts Mentioned

[[concepts/sets-and-relations]] — foundational concept page

## Notable Quotes

> "A set is a well-defined collection of objects."

## My Take

**JEE Frequency: Low-Medium.** Sets is rarely directly tested in JEE Mains (0–1 question). However, set notation and De Morgan's laws appear implicitly in probability and relations.

**Most-asked types:**
1. Inclusion-exclusion: find n(A ∪ B) or n(A ∩ B) given other counts
2. Power set: how many subsets does a set with n elements have?
3. De Morgan's laws: prove or apply to simplify set expressions

**Common traps:**
- Empty set ∅ has ZERO elements; {∅} has ONE element (the empty set)
- A ⊆ B does NOT require A ≠ B (use A ⊂ B for proper subset)
- Power set of ∅ = {∅} (has one element)

**Cross-connections:** Set language → [[concepts/sets-and-relations]] (Relations and Functions, Chapter 2); Venn diagrams → [[concepts/statistics-probability]] (probability events); intervals → [[concepts/limits-and-derivatives]].
