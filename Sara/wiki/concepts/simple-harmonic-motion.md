---
type: concept
tags: [physics, shm, oscillations, periodic-motion, waves]
created: 2026-05-12
updated: 2026-05-12
sources: 2
---

# Simple Harmonic Motion

## Definition

Simple Harmonic Motion (SHM) is the most fundamental form of oscillatory motion, characterised by a restoring force proportional to displacement: F = –kx. The resulting motion is sinusoidal in time — position, velocity, and acceleration all vary as sine or cosine functions. SHM is the foundation for understanding all wave phenomena.

## Why It Matters

SHM is a high-frequency JEE topic (2–3 questions per paper) and is the bridge between mechanics and waves. Every medium element in a wave executes SHM. Spring-mass systems, pendulums, LC circuits (Class 12), and even molecular vibrations are SHM or SHM approximations. Mastering SHM means mastering energy conservation in periodic systems.

## Related Concepts

[[concepts/waves]] — wave motion = collective SHM of medium elements
[[concepts/kinematics]] — SHM is kinematics with F = –kx instead of F = ma = const
[[concepts/work-energy-power]] — energy in SHM: KE + PE = constant
[[concepts/rotational-dynamics]] — compound pendulum uses rotational analogue of SHM
[[concepts/trigonometric-functions]] — SHM uses sin/cos functions; double angle for PE/KE

## Evidence & Examples

**Core Equations:**
- Displacement: x(t) = A cos(ωt + φ)
- Velocity: v(t) = –Aω sin(ωt + φ) = ±ω√(A²–x²)
- Acceleration: a(t) = –ω²x (always toward mean position)
- Force: F = –kx = –mω²x

**Time Periods:**
- Spring-mass: T = 2π√(m/k)
- Simple pendulum: T = 2π√(L/g) [small angle only]
- Compound pendulum: T = 2π√(I/mgd)
- Liquid in U-tube: T = 2π√(L/2g)

**Energy:**
- KE = ½mω²(A²–x²); PE = ½mω²x² = ½kx²
- Total: E = ½kA² = ½mω²A² = constant
- At x = 0: KE = E (max); PE = 0
- At x = ±A: KE = 0; PE = E (max)

**Springs:**
- Series: 1/k_eff = 1/k₁ + 1/k₂ (longer period)
- Parallel: k_eff = k₁ + k₂ (shorter period)

**Phase:**
- If a mass is released from x = +A at t=0: x = A cos(ωt) [φ=0]
- If released from x = 0 moving in +x direction: x = A sin(ωt) [φ=–π/2]

## Open Questions

- When does the small angle approximation for pendulum break down significantly?
- How does SHM connect to quantum harmonic oscillator?

## Sources

[[sources/keph206]] — Oscillations (SHM in detail)
[[sources/keph207]] — Waves (SHM as building block of wave motion)
