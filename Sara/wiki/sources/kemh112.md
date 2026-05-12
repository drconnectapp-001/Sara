---
type: source
tags: [mathematics, 3d-geometry, coordinates-3d, distance-3d, section-formula-3d]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Introduction to Three Dimensional Geometry

**Source:** [[raw/Mathematics/kemh112]] | **Date ingested:** 2026-05-12 | **Type:** book-chapter

## Summary

Chapter 12 extends 2D coordinate geometry to three dimensions. Three mutually perpendicular axes (x, y, z) define 8 octants. The chapter derives the distance formula in 3D, section formula for dividing a line segment, and introduces the concept of centroid of a triangle in 3D. This is a foundational chapter for vectors (Class 12) and 3D analytical geometry.

## Key Points

- **Coordinate axes:** three mutually perpendicular lines OX, OY, OZ; right-hand coordinate system
- **Coordinate planes:** XY-plane (z=0), YZ-plane (x=0), ZX-plane (y=0); divide space into 8 octants
- **Octants:** named by sign of (x,y,z): (+++), (–++), etc.
- **Coordinates of a point P(x,y,z):** x = perpendicular distance from YZ-plane; y from ZX-plane; z from XY-plane
- **Distance from origin:** OP = √(x²+y²+z²)
- **Distance formula:** |PQ| = √[(x₂–x₁)²+(y₂–y₁)²+(z₂–z₁)²]
- **Section formula (internal division):**
  - Point dividing P₁P₂ in ratio m:n: ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n), (mz₂+nz₁)/(m+n))
- **Midpoint:** ((x₁+x₂)/2, (y₁+y₂)/2, (z₁+z₂)/2) [special case m:n = 1:1]
- **Centroid of triangle:** G = ((x₁+x₂+x₃)/3, (y₁+y₂+y₃)/3, (z₁+z₂+z₃)/3)
- **Points on coordinate axes:** x-axis: (x,0,0); y-axis: (0,y,0); z-axis: (0,0,z)
- **Points on coordinate planes:** XY-plane: (x,y,0); YZ-plane: (0,y,z); ZX-plane: (x,0,z)

## Entities Mentioned

No specific entities.

## Concepts Mentioned

No new concepts — prerequisite for 3D vectors and lines/planes in Class 12.

## Notable Quotes

> "To locate the position of a point in space, we need three numbers."

## My Take

**JEE Frequency: Medium.** 3D Geometry is tested at a basic level in Class 11 — 0–1 direct question from this chapter. However, it is heavily tested in Class 12 (lines, planes, vectors) where this chapter's foundation is essential.

**Most-asked Class 11 topics:**
1. Distance formula in 3D — direct plug-and-compute
2. Section formula to find dividing point
3. Finding centroid of triangle in 3D
4. Determine in which octant a point lies

**Common traps:**
- 3D distance: ALL three coordinates contribute — don't forget the z term
- Midpoint in 3D: exactly like 2D but add z coordinate
- YZ-plane has equation x = 0, NOT y = 0

**Cross-connections:** 3D coordinates → Class 12 Vectors (position vectors use these coordinates); 3D distance formula → [[sources/keph103]] (3D extension of 2D motion in a plane); centroid formula → [[concepts/rotational-dynamics]] (centre of mass calculation uses weighted average similar to centroid).
