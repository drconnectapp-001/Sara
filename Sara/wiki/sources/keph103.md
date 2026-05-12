---
type: source
tags: [physics, kinematics, projectile-motion, vectors, circular-motion]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Motion in a Plane

**Source:** [[raw/Physics/Part-01/keph103]] | **Date ingested:** 2026-05-12 | **Type:** book-chapter

## Summary

Chapter 3 extends kinematics to 2D and 3D using vectors. It introduces scalar and vector quantities, vector algebra (addition, subtraction, multiplication), resolution of vectors into components, and then applies this framework to projectile motion and uniform circular motion. This is the most mathematically rich chapter in Part 1 and provides tools used throughout all of mechanics.

## Key Points

**Vector Algebra:**
- Scalars: magnitude only (mass, time, speed, temperature)
- Vectors: magnitude + direction (displacement, velocity, acceleration, force)
- Vector addition: triangle law or parallelogram law; A + B ≠ B + A is FALSE — vectors DO commute
- Unit vectors: â = A/|A|; magnitude 1; î, ĵ, k̂ for x, y, z axes
- Dot product: A·B = AB cosθ (scalar result); A·A = A²; î·î = 1; î·ĵ = 0
- Cross product: A×B = AB sinθ n̂ (vector result); |A×B| = AB sinθ; î×ĵ = k̂
- Resolution: A = Aₓî + Ayĵ; Aₓ = A cosθ, Ay = A sinθ

**Projectile Motion:**
- Horizontal: no acceleration; xₓ = v₀ cosθ · t
- Vertical: g downward; y = v₀ sinθ · t – ½gt²
- Time of flight: T = 2v₀ sinθ/g
- Maximum height: H = v₀² sin²θ/2g
- Range: R = v₀² sin2θ/g; maximum at θ = 45°
- At max height: vₓ = v₀ cosθ, vy = 0; speed = v₀ cosθ
- Trajectory equation: y = x tanθ – gx²/(2v₀² cos²θ) [parabola]
- Ranges are equal for complementary angles (θ and 90°–θ)

**Uniform Circular Motion:**
- Speed constant; velocity direction changes → centripetal acceleration exists
- Centripetal acceleration: a_c = v²/r = ω²r, directed toward centre
- Period T = 2πr/v = 2π/ω; frequency ν = 1/T
- Angular velocity: ω = 2πν = 2π/T; v = ωr
- Linear velocity ⊥ radius at every point

**Relative Motion in 2D:**
- v_AB = v_A – v_B (vector subtraction)
- River-boat problems: resultant velocity = vector sum of boat velocity + river velocity

## Entities Mentioned

No specific entities.

## Concepts Mentioned

[[concepts/kinematics]] — 2D extension of 1D kinematics
[[concepts/laws-of-motion]] — centripetal force application
[[concepts/rotational-dynamics]] — ω, α are scalar analogues of angular quantities introduced here

## Notable Quotes

> "Circular motion is a periodic motion, but it is not oscillatory."

## My Take

**JEE Frequency: Extremely High.** Projectile motion and circular motion each appear 1–2 times per JEE paper. This chapter is foundational for all of mechanics.

**Most-asked topics:**
1. Projectile: find time/height/range given angle and speed; range formula proof; complementary angles
2. Projectile on inclined plane (extension requiring trigonometry)
3. Circular motion: centripetal acceleration = v²/r; finding banking angle (Ch 4 application)
4. Relative velocity in 2D: swimmer crossing river, shortest time vs shortest path

**Most-asked derivations:**
- Derivation of range R = v₀² sin2θ/g (appears directly in JEE)
- Proof that centripetal acceleration = v²/r = ω²r

**Common traps:**
- Horizontal and vertical motions are INDEPENDENT in projectile — treat separately
- At maximum range (θ = 45°): H = R/4, NOT H = R
- "Shortest time to cross river" vs "minimum displacement": different angles (90° vs arcsin(v_river/v_boat))
- Cross product is NOT commutative: A×B = –B×A

**Cross-connections:**
- Vectors → used in [[concepts/rotational-dynamics]] (torque = r×F)
- Centripetal acceleration → [[concepts/laws-of-motion]] (centripetal force = mv²/r)
- Projectile trajectory parabola → [[concepts/gravitation]] (orbits are conic sections)
- Trig identities from [[concepts/trigonometric-functions]] are essential here (sin2θ = 2sinθcosθ for range formula)
