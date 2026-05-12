---
type: source
tags: [physics, mechanics, energy, work, collisions]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# NCERT Physics Ch 5 — Work, Energy and Power

**Source:** [[raw/Physics/Part-01/keph105]] | **Date ingested:** 2026-05-12 | **Type:** book-chapter

## Summary
Defines work, kinetic energy, and potential energy via the work-energy theorem. Covers conservative vs non-conservative forces, conservation of mechanical energy, spring potential energy, power, and elastic/inelastic collisions in 1D and 2D.

## Key Points

### Scalar (Dot) Product
- A⋅B = AB cosθ (scalar; commutative, distributive)
- A⋅A = A²; unit vectors: î⋅î = ĵ⋅ĵ = k̂⋅k̂ = 1; î⋅ĵ = ĵ⋅k̂ = k̂⋅î = 0
- A⋅B = Ax⋅Bx + Ay⋅By + Az⋅Bz

### Work
- **W = F⋅d cosθ = F⃗⋅d⃗** (scalar). SI unit: Joule (J) = N⋅m = kg⋅m²⋅s⁻²
- Zero work: zero displacement, zero force, or F ⊥ displacement (θ = 90°)
- Variable force: **W = ∫F(x) dx** (area under F-x graph)
- Work can be positive or negative (negative when force opposes motion)

### Work-Energy Theorem
- **Kf − Ki = W_net** (net work done by all forces on a particle)
- For constant force: derived from v² − u² = 2as
- For variable force: derived by integrating F = ma over displacement
- Scalar form of Newton's second law — contains less information (loses vector/time info)

### Kinetic Energy
- **K = ½mv²** (always ≥ 0)

### Potential Energy and Conservative Forces
- Conservative force: work depends only on endpoints, not path; work over closed loop = 0
- **F(x) = −dV/dx**; equivalently ΔV = −∫F(x)dx
- Gravitational PE: **V = mgh** (taking ground as V = 0)
- Spring PE: **V = ½kx²** (Hooke's law: F_s = −kx, k = spring constant, N/m)
- Non-conservative force (e.g. friction): work is path-dependent; no PE defined
- Modified conservation: **Ef − Ei = W_nc** (work by non-conservative forces)

### Conservation of Mechanical Energy
- For conservative forces: **K + V = constant** (at every instant)
- Ki + Vi = Kf + Vf
- At spring equilibrium (x=0): KE is maximum = ½kx²_max
- Falling ball: PE converts fully to KE → v = √(2gh) at ground

### Spring-Mass System (key numerical pattern)
- Max compression when car hits spring: ½mv² = ½kx²_m → x_m = v√(m/k)
- With friction: ½mv² = ½kx²_m + μmgx_m (quadratic in x_m)

### Power
- Average: P = W/t; Instantaneous: **P = dW/dt = F⋅v**
- SI unit: Watt (W) = J/s. 1 hp = 746 W
- 1 kWh = 3.6 × 10⁶ J (unit on electricity bills)

### Collisions
- **Total linear momentum always conserved** (elastic AND inelastic)
- **Elastic collision**: KE also conserved; objects don't stick
- **Completely inelastic**: objects stick together; maximum KE loss
- **Inelastic**: KE partly lost (intermediate case)

**1D Elastic Collision formulas:**
| Condition | v₁f | v₂f |
|-----------|------|------|
| General | (m₁−m₂)v₁i/(m₁+m₂) | 2m₁v₁i/(m₁+m₂) |
| m₁ = m₂ | 0 (stops) | v₁i |
| m₂ >> m₁ | ≈ −v₁i (reverses) | ≈ 0 |

**Completely inelastic:** vf = m₁v₁i/(m₁+m₂); KE loss = m₁m₂v₁i²/[2(m₁+m₂)]

**2D elastic, equal masses:** after collision, the two bodies move at **90° to each other** (billiard ball result; θ₁ + θ₂ = 90°)

**Neutron moderation:** fractional KE lost by neutron = 4m₁m₂/(m₁+m₂)². Maximum energy transfer when m₁ = m₂ (equal masses).

## Entities Mentioned
None specific

## Concepts Mentioned
[[concepts/work-energy-power]], [[concepts/thermodynamics]]

## Notable Quotes
> "The potential energy of a body subjected to a conservative force is always undetermined up to a constant. The zero of PE is a matter of choice."

## My Take
**Very high JEE frequency.** Work-energy theorem and conservation of energy are used in nearly every mechanics problem as an alternative to Newton's law approach.

**Most-asked derivations/proofs:**
1. Work done by spring: W = −½kx² (integrate Hooke's law)
2. Elastic collision velocity formulas — derive from momentum + energy conservation simultaneously
3. Ball on incline reaching bottom: v = √(2gh) regardless of angle
4. Maximum spring compression with friction (quadratic equation)

**Common JEE traps:**
1. Confusing elastic (KE conserved) with inelastic (KE not conserved) — momentum is ALWAYS conserved
2. Forgetting that the 90° result for 2D elastic collisions only applies to equal masses
3. Work done by friction in a cycle is NOT zero — friction is non-conservative
4. KE at top of circular loop ≠ 0; minimum KE at top: v_C = √(gL) for vertical circle

**Cross-subject connection:** Spring PE = ½kx² is the same form as the potential energy for SHM oscillations (Ch 14). The work integral ∫F dx is the same calculus concept as ∫f(x)dx from Math Ch 13.

**Cross-chapter:** Conservative force concept bridges to Gravitation (Ch 7) — gravitational force is conservative, orbital energy is K + V = constant.
