---
type: source
tags: [physics, kinematics, motion, velocity, acceleration]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Motion in a Straight Line

**Source:** [[raw/Physics/Part-01/keph102]] | **Date ingested:** 2026-05-12 | **Type:** book-chapter

## Summary

Chapter 2 introduces 1D kinematics — the language of motion without causes. It defines position, displacement, velocity (average and instantaneous), and acceleration, then derives the three kinematic equations for uniform acceleration using calculus and graphical methods. The chapter ends with relative velocity in 1D, which is conceptually important for JEE problems involving trains, boats, and projectiles.

## Key Points

- **Position vs displacement:** position is coordinate value; displacement is change in position (vector; can be negative)
- **Average velocity:** v_avg = Δx/Δt (ratio of displacement to time interval)
- **Instantaneous velocity:** v = dx/dt (derivative of position; slope of x–t graph at that instant)
- **Instantaneous speed:** |v| (always ≥ 0; equals speed only at an instant)
- **Acceleration:** a = dv/dt = d²x/dt² (slope of v–t graph)
- **Area under v–t curve = displacement** (fundamental graphical result)
- **Three equations of motion for uniform acceleration (a = const):**
  - v = v₀ + at
  - x = v₀t + ½at²
  - v² = v₀² + 2ax
  - (General form with x₀: x – x₀ = v₀t + ½at²)
- **Free fall:** a = g = 9.8 m/s² downward; same for all masses (Galileo)
- **Relative velocity:** v_AB = v_A – v_B (velocity of A with respect to B)
- **Graphs:** x–t graph slope = velocity; v–t graph slope = acceleration; area under v–t = displacement; area under a–t = change in velocity
- **nth second formula:** displacement in nth second = v₀ + a(2n–1)/2

## Entities Mentioned

No specific entities.

## Concepts Mentioned

[[concepts/kinematics]] — full development of 1D kinematics

## Notable Quotes

> "In Kinematics, we study ways to describe motion without going into the causes of motion."

> "The area under the curve represents the displacement over a given time interval."

## My Take

**JEE Frequency: Very High.** Kinematics is the entry point for all mechanics problems and appears in 2–4 questions per paper either directly or as a sub-problem.

**Most-asked topics:**
1. Using the three kinematic equations in multi-step problems (projectiles, braking vehicles)
2. Graph interpretation — finding acceleration from v–t graph slope, displacement from area
3. nth second formula (appears in at least one JEE question annually)
4. Relative velocity — two trains/boats/planes; finding time to catch up
5. Free fall combinations: stone thrown up while another dropped simultaneously

**Common traps:**
- Sign convention: always define positive direction, then stay consistent
- "v = 0 does not mean a = 0" — ball at top of throw has v = 0, a = –g
- Average velocity ≠ average speed when object reverses direction
- Displacement can be zero while distance is non-zero

**Derivation asked directly:** Area under v–t curve = displacement (frequently asked as a 1-mark explanation in JEE Mains)

**Cross-connections:** These equations extend directly to 2D/3D in [[sources/keph103]]; kinematic equations reappear in [[concepts/rotational-dynamics]] (θ, ω, α instead of x, v, a); [[concepts/simple-harmonic-motion]] uses x = A cos(ωt) which differs from uniform acceleration.
