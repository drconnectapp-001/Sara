---
type: source
tags: [physics, waves, sound, superposition, beats, standing-waves]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Waves

**Source:** [[raw/Physics/Part-02/keph207]] | **Date ingested:** 2026-05-12 | **Type:** book-chapter

## Summary

Chapter 14 covers mechanical wave propagation — transverse and longitudinal waves, the mathematical description of a travelling wave, wave speed, superposition, standing waves, and beats. Every medium element executing SHM creates the collective phenomenon of wave propagation. Key results include the wave speed formula v = ω/k = λν, Snell's law for wave refraction, and the conditions for standing wave formation (nodes and antinodes).

## Key Points

**Types of Waves:**
- Transverse: particle motion ⊥ propagation direction (waves on string, EM waves); require shear rigidity → only in solids and at surfaces
- Longitudinal: particle motion ∥ propagation (sound in air, compressional waves); require bulk elasticity → propagate in all media
- Mechanical waves require medium; EM waves do not

**Wave Equation:**
- y(x,t) = a sin(kx – ωt + φ) [wave moving in +x direction]
- y(x,t) = a sin(kx + ωt + φ) [wave moving in –x direction]
- a = amplitude; k = angular wave number = 2π/λ; ω = angular frequency = 2π/T = 2πν
- Phase velocity: v = ω/k = λν = λ/T

**Wave Speed in Media:**
- Transverse wave on string: v = √(T/μ) where T = tension, μ = linear mass density
- Sound in gas: v = √(γP/ρ) = √(γRT/M) [adiabatic; Newton's formula was wrong — used isothermal]
- Newton's correction: Laplace corrected Newton's formula by noting sound propagation is adiabatic
- Sound in solid: v = √(Y/ρ) (Y = Young's modulus)
- Speed of sound in air at 0°C ≈ 332 m/s; at room temp ≈ 343 m/s

**Superposition Principle:**
- Resultant displacement = algebraic sum of individual displacements
- Waves pass through each other unchanged

**Standing Waves:**
- Two identical waves travelling in opposite directions → standing wave
- y = 2a sin(kx) cos(ωt) [string fixed at both ends]
- Nodes (zero displacement): x = 0, λ/2, λ, 3λ/2, ... (at x where sin(kx) = 0)
- Antinodes (maximum displacement): x = λ/4, 3λ/4, ... (at x where |sin(kx)| = 1)
- String of length L: harmonics at λ_n = 2L/n; ν_n = nv/(2L) [n = 1, 2, 3, ...]
- Fundamental (1st harmonic): ν₁ = v/(2L); overtone = harmonic - 1
- Open pipe: same harmonics as string (both ends antinode)
- Closed pipe: only odd harmonics; ν_n = (2n–1)v/(4L)

**Beats:**
- Two waves of slightly different frequencies ν₁ and ν₂
- Beat frequency = |ν₁ – ν₂|
- Amplitude oscillates at beat frequency

**Reflection:**
- Rigid wall (fixed end): reflected wave inverted (phase reversal of π)
- Free end: reflected wave upright (no phase reversal)

## Entities Mentioned

No specific entities.

## Concepts Mentioned

[[concepts/simple-harmonic-motion]] — SHM is foundation of wave motion
[[concepts/waves]] — dedicated concept page

## Notable Quotes

> "These patterns, which move without the actual physical transfer or flow of matter as a whole, are called waves."

> "Newton's formula was corrected by Laplace who pointed out that the speed of sound is determined by the adiabatic bulk modulus, not the isothermal."

## My Take

**JEE Frequency: Very High.** Waves contributes 2–3 questions per paper consistently. Standing waves and beats are almost guaranteed topics.

**Most-asked topics:**
1. Wave speed: v = λν; wave speed on string v = √(T/μ); speed of sound v = √(γP/ρ)
2. Standing waves in strings: harmonic frequencies ν_n = nv/(2L)
3. Open pipe vs closed pipe: frequency pattern difference (closed → only odd harmonics)
4. Beats: beat frequency = |ν₁–ν₂|; applying beats to tune instruments
5. Path difference → phase difference: Δφ = (2π/λ) × Δx

**Most-asked derivations:**
- Standing wave formation (superposition of two counter-propagating waves)
- Frequency of fundamental mode in string: ν = (1/2L)√(T/μ)

**Common traps:**
- Closed pipe has only ODD harmonics (1st, 3rd, 5th...); open pipe has all harmonics
- At a node: displacement = 0 but pressure variation is MAXIMUM (and vice versa at antinode)
- Phase reversal on reflection from rigid wall: amplitude inverted; from free end: NO inversion
- Sound speed ∝ √T (where T is in Kelvin!) — a 1°C rise doesn't change speed by a huge amount

**Cross-connections:** SHM from [[sources/keph206]] is the building block; wave speed formula v = √(T/μ) connects tension to kinematics; sound wave behaviour → Doppler effect (Class 12 revisits); resonance of sound in pipes → standing waves; beats → tuning forks in practical physics.
