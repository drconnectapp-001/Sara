---
type: concept
tags: [physics, mechanics, energy, conservation, collisions]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Work, Energy and Power

## Definition
Work is the energy transferred by a force over a displacement (W = F⋅d cosθ). Energy is the capacity to do work. The work-energy theorem states that net work equals change in kinetic energy. Mechanical energy (K + V) is conserved under conservative forces.

## Why It Matters
Energy methods often solve problems faster than Newton's Law approaches (especially when time or intermediate forces are unknown). Collisions, spring problems, and circular motion all rely on energy conservation. This is one of the highest-formula-density topics in JEE Physics.

## Core Formulas

### Work
- **W = F d cosθ = F⃗ · d⃗** (scalar, can be +ve or −ve)
- Variable force: **W = ∫ F(x) dx** = area under F-x graph
- Zero work: θ = 90° (e.g., normal force on horizontal motion), zero displacement

### Work-Energy Theorem
- **Kf − Ki = W_net** (always true, all forces)
- K = ½mv²

### Potential Energy (conservative forces only)
- **F(x) = −dV/dx** ↔ **ΔV = −∫F(x)dx**
- Gravitational: V = mgh
- Spring: **V = ½kx²** (Hooke's law: F = −kx)

### Conservation of Mechanical Energy
- **K + V = constant** (conservative forces only)
- If non-conservative forces (friction) present: **ΔE = W_friction**

### Power
- Average: P = W/t; Instantaneous: **P = F·v**
- 1 W = 1 J/s; 1 hp = 746 W; 1 kWh = 3.6 × 10⁶ J

## Collision Formulas

### 1D Elastic Collision (m₂ at rest)
| Case | v₁f | v₂f |
|------|------|------|
| General | (m₁−m₂)v₁i / (m₁+m₂) | 2m₁v₁i / (m₁+m₂) |
| m₁ = m₂ | 0 | v₁i |
| m₂ >> m₁ | −v₁i | ≈ 0 |

### Completely Inelastic
- **vf = m₁v₁i / (m₁+m₂)**
- KE loss = m₁m₂v₁i² / [2(m₁+m₂)]

### 2D Elastic, Equal Masses
- After collision: two bodies move at **90°** to each other
- (θ₁ + θ₂ = 90° always)

### Moderator Efficiency (neutrons)
- Fractional KE transferred = 4m₁m₂/(m₁+m₂)²
- Maximum when m₁ = m₂ (same mass) → transfers 100%

## Key Identities and Results

| Situation | Result |
|-----------|--------|
| Ball dropped from height h | v = √(2gh) at ground |
| Spring compressed by xm (max) | ½mv² = ½kx²_m |
| Vertical circle minimum speed at top | v_C = √(gL) |
| v₀ for circular pendulum bob | v₀ = √(5gL) to complete loop |

## Related Concepts
[[concepts/laws-of-motion]] — Newton's law approach; energy method is often faster
[[concepts/thermodynamics]] — internal energy; conservation of energy in thermodynamics
[[concepts/simple-harmonic-motion]] — SHM energy: K + V = ½kA² = constant; same form as spring PE
[[concepts/gravitation]] — gravitational PE = −GMm/r; total orbital energy = K + V

## Evidence & Examples
- Pendulum bob completing vertical circle: v₀ = √(5gL) at bottom (work with energy conservation)
- Car hitting spring (keph105 Example 5.8): x_m = 2.00 m for k = 5.25×10³ N/m, v = 5 m/s
- Neutron in heavy water loses ~90% KE per collision (mass match with deuterium)

## Open Questions
- How is energy "lost" in inelastic collisions? (converted to heat, sound, deformation)
- Can potential energy be negative? (yes, e.g., gravitational PE in orbital mechanics = −GMm/r)

## Sources
[[sources/ch5-work-energy-power]]
