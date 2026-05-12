---
type: source
tags: [physics, oscillations, shm, simple-harmonic-motion, pendulum]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Oscillations

**Source:** [[raw/Physics/Part-02/keph206]] | **Date ingested:** 2026-05-12 | **Type:** book-chapter

## Summary

Chapter 13 covers periodic motion and its simplest form: Simple Harmonic Motion (SHM). It develops SHM from the restoring force law F = –kx, derives equations for displacement, velocity, acceleration, and energy in SHM, connects SHM to uniform circular motion (reference circle), and analyzes the simple pendulum and spring-mass systems. The chapter establishes that SHM is the foundation for understanding all wave phenomena.

## Key Points

**Definitions:**
- Periodic motion: repeats at regular interval T (period)
- Oscillatory motion: back-and-forth about mean position; every oscillatory motion is periodic, but not vice versa
- Frequency ν = 1/T; angular frequency ω = 2πν = 2π/T; SI unit: Hz (hertz)

**SHM — Defining Equation:**
- x(t) = A cos(ωt + φ) where A = amplitude, ω = angular frequency, φ = phase constant
- The force law: F = –kx (restoring force proportional to and opposite to displacement)
- ω = √(k/m); T = 2π/ω = 2π√(m/k)

**Velocity and Acceleration in SHM:**
- v(t) = –Aω sin(ωt + φ) = ±ω√(A²–x²)
- a(t) = –Aω² cos(ωt + φ) = –ω²x
- |v|_max = Aω (at x = 0, equilibrium); v = 0 at x = ±A (extremes)
- |a|_max = Aω² (at x = ±A); a = 0 at x = 0

**Energy in SHM:**
- KE = ½mω²(A²–x²) = ½mω²A² sin²(ωt+φ)
- PE = ½kx² = ½mω²x² = ½mω²A² cos²(ωt+φ)
- Total energy E = ½mω²A² = ½kA² = constant (independent of x and t)
- Energy oscillates between KE and PE; average KE = average PE = E/2

**SHM and Uniform Circular Motion:**
- Projection of uniform circular motion (radius A, angular speed ω) on any diameter = SHM
- Reference circle concept: phase angle = angle on circle

**Simple Pendulum:**
- T = 2π√(L/g) for small oscillations (θ < ~15°)
- g_eff at depth d: g' = g(1–d/R); at height h: g' = g(1–2h/R); T increases in both cases
- Compound pendulum: T = 2π√(I/mgd) where d = distance from pivot to CM
- Seconds pendulum: T = 2 s, L = 1 m at surface

**Damped and Forced Oscillations:**
- Damped: amplitude decreases exponentially; A(t) = A₀e^(–bt/2m)
- Forced: oscillation at driver frequency; resonance when driver ω = natural ω₀
- Quality factor Q = ω₀m/b (sharpness of resonance)

## Entities Mentioned

No specific entities.

## Concepts Mentioned

[[concepts/simple-harmonic-motion]] — dedicated concept page
[[concepts/waves]] — SHM is the building block of wave motion

## Notable Quotes

> "Simple harmonic motion is the simplest form of oscillatory motion. This motion arises when the force on the oscillating body is directly proportional to its displacement from the mean position."

> "Any periodic function can be expressed as a superposition of sine and cosine functions of different time periods with suitable coefficients." (Fourier's theorem)

## My Take

**JEE Frequency: Very High.** SHM is among the top 5 most tested physics topics — 2–3 questions per JEE paper, including numericals and conceptual MCQs.

**Most-asked topics:**
1. Spring-mass system: T = 2π√(m/k); springs in series (1/k_eff = 1/k₁ + 1/k₂) and parallel (k_eff = k₁+k₂)
2. Energy conservation: find velocity at given position; find PE/KE ratio
3. Simple pendulum: effect of changing g (elevator, depth, height); seconds pendulum
4. Phase relationships between x, v, a in SHM
5. Combination problems: two SHMs superposed (same frequency, different phase)

**Most-asked derivations:**
- T = 2π√(m/k) from F = –kx
- T = 2π√(L/g) for simple pendulum (must derive from τ = –mgL sinθ ≈ –mgLθ)
- Energy in SHM: E = ½kA² = constant

**Common traps:**
- Period T = 2π√(m/k) — independent of amplitude (NOT so for large amplitude pendulums)
- At equilibrium (x=0): v is MAXIMUM, not zero; at extremes: v = 0, a is maximum
- Springs in series vs parallel: series gives SMALLER k, longer period; parallel gives LARGER k
- v = ±ω√(A²–x²): choose sign from context (velocity can be + or –)
- Damped oscillation: energy ∝ A², which decreases as e^(–bt/m)

**Cross-connections:** SHM → [[sources/keph207]] (Waves — each element of medium executes SHM); SHM → [[concepts/trigonometric-functions]] (sin/cos representation); resonance frequency concept appears in AC circuits (Class 12); pendulum period → [[concepts/gravitation]] (variation of g with altitude/depth).
