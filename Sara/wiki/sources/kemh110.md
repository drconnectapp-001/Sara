---
type: source
tags: [mathematics, straight-lines, coordinate-geometry, slope, distance]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Straight Lines

**Source:** [[raw/Mathematics/kemh110]] | **Date ingested:** 2026-05-12 | **Type:** book-chapter

## Summary

Chapter 10 develops the coordinate geometry of straight lines — slope, various forms of line equations, distances, and relative positions of lines. It is the foundational chapter for all 2D coordinate geometry, and the forms derived here (slope-intercept, point-slope, two-point, normal form) are prerequisites for conic sections.

## Key Points

**Slope:**
- Slope m = tanθ (θ = inclination angle with positive x-axis; 0° ≤ θ < 180°, θ ≠ 90°)
- m = (y₂–y₁)/(x₂–x₁) for two points; undefined for vertical lines
- Parallel lines: m₁ = m₂; Perpendicular lines: m₁×m₂ = –1

**Forms of Line Equations:**
- Slope-intercept: y = mx + c (m = slope, c = y-intercept)
- Point-slope: y – y₁ = m(x – x₁)
- Two-point: (y–y₁)/(y₂–y₁) = (x–x₁)/(x₂–x₁)
- Intercept form: x/a + y/b = 1 (a = x-intercept, b = y-intercept)
- Normal form: x cosω + y sinω = p (p = perpendicular distance from origin, ω = angle with x-axis)
- General form: ax + by + c = 0; slope = –a/b; x-intercept = –c/a; y-intercept = –c/b

**Distance Formulas:**
- Distance between (x₁,y₁) and (x₂,y₂): d = √[(x₂–x₁)²+(y₂–y₁)²]
- Distance from point (x₁,y₁) to line ax+by+c=0: d = |ax₁+by₁+c|/√(a²+b²)
- Distance between parallel lines ax+by+c₁=0 and ax+by+c₂=0: d = |c₁–c₂|/√(a²+b²)

**Angle Between Two Lines:**
- tanθ = |(m₁–m₂)/(1+m₁m₂)| [take acute angle]

**Intersection of Lines:**
- Solve simultaneous equations
- Three lines concurrent iff determinant of coefficients = 0

**Family of Lines:**
- Lines through intersection of L₁=0 and L₂=0: L₁ + λL₂ = 0 (for any λ)

**Section Formula:**
- Point dividing P₁P₂ in ratio m:n internally: ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n))

## Entities Mentioned

No specific entities.

## Concepts Mentioned

[[concepts/straight-lines]] — dedicated concept page
[[concepts/conic-sections]] — prerequisite for next chapter

## Notable Quotes

> "A systematic study of geometry by the use of algebra was first carried out by René Descartes."

## My Take

**JEE Frequency: High.** Straight lines appears 1–2 times per JEE paper. Often combined with conic sections. Highly formula-dependent — all forms must be memorised.

**Most-asked topics:**
1. Find equation of line with given conditions (parallel/perpendicular to given line; through intersection of two lines)
2. Distance from point to line — used in MANY contexts (conic tangent length, nearest point problems)
3. Family of lines: L₁ + λL₂ = 0 to find line through intersection with another condition
4. Angle bisectors of two lines
5. Foot of perpendicular and reflection of point across a line

**Common traps:**
- Perpendicular condition: m₁×m₂ = –1 (NOT m₁ = –m₂)
- Intercept form: x/a + y/b = 1 fails if line passes through origin (a or b = ∞)
- Normal form requires p > 0 (perpendicular distance is always positive)
- tanθ formula gives BOTH the acute angle and its supplement — take the acute one

**Cross-connections:** Straight line coordinate geometry → [[concepts/conic-sections]] (tangent equations); distance formula → [[sources/keph103]] (2D vector problems); angle between lines → [[concepts/trigonometric-functions]] (tan addition formula is used in derivation).
