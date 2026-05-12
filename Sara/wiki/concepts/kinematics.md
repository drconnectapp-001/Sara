---
type: concept
tags: [physics, kinematics, motion, mechanics]
created: 2026-05-12
updated: 2026-05-12
sources: 3
---

# Kinematics

## Definition

Kinematics is the branch of mechanics that describes the motion of objects (position, velocity, acceleration) without reference to the forces causing that motion. It provides the mathematical language — displacement, velocity, acceleration, trajectory — used throughout all of classical mechanics.

## Why It Matters

Kinematics is the entry point to all of mechanics. Every dynamics problem (force → acceleration → motion) requires kinematics to describe the resulting motion. Projectile motion, circular motion, SHM, and orbital motion all use kinematic equations. For JEE, kinematics appears in 2–5 questions per paper directly, and as a sub-tool in dozens more.

## Related Concepts

[[concepts/laws-of-motion]] — Newton's laws connect force (dynamics) to kinematics (motion description)
[[concepts/work-energy-power]] — work = force × displacement (combines dynamics + kinematics)
[[concepts/rotational-dynamics]] — rotational kinematics: θ, ω, α are angular analogues of x, v, a
[[concepts/simple-harmonic-motion]] — SHM is non-uniform acceleration kinematics; x = A cos(ωt)
[[concepts/trigonometric-functions]] — projectile and circular motion use sin/cos

## Evidence & Examples

**1D Kinematic Equations (uniform acceleration a = constant):**
- v = v₀ + at
- x = v₀t + ½at²
- v² = v₀² + 2ax
- x_nth = v₀ + a(2n–1)/2 (displacement in nth second)

**Graphical kinematics:**
- x–t graph: slope = velocity; curve up = +a; curve down = –a
- v–t graph: slope = acceleration; area under curve = displacement
- a–t graph: area under curve = change in velocity

**Projectile Motion (2D):**
- R = v₀² sin2θ/g; max at θ = 45°; equal R for θ and (90°–θ)
- H = v₀² sin²θ/(2g); T = 2v₀ sinθ/g
- Trajectory: y = x tanθ – gx²/(2v₀²cos²θ)

**Circular Motion:**
- a_c = v²/r = ω²r (centripetal, toward centre)
- v = ωr; T = 2π/ω; ω = 2πν

**Relative Velocity:**
- v_AB = v_A – v_B (velocity of A as seen by B)

## Open Questions

- How does kinematics break down at relativistic speeds (v → c)?
- How does the kinematic picture change in non-inertial frames?

## Sources

[[sources/keph102]] — Motion in a Straight Line (1D kinematics)
[[sources/keph103]] — Motion in a Plane (2D kinematics, projectile, circular)
[[sources/keph101]] — Units and Measurement (dimensional analysis of kinematic quantities)
