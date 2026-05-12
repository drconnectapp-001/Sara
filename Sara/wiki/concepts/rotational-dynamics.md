---
type: concept
tags: [physics, mechanics, rotation, angular-momentum, torque]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Rotational Dynamics

## Definition
Rotational dynamics describes the motion of rigid bodies under the action of torques. It is the rotational analogue of linear dynamics: torque replaces force, moment of inertia replaces mass, angular acceleration replaces linear acceleration, and angular momentum replaces linear momentum.

## Why It Matters
JEE problems frequently combine translational and rotational motion (rolling bodies, hinged rods, spinning discs). Moment of inertia and angular momentum conservation are direct formula sources. Kepler's 2nd law is a consequence of angular momentum conservation.

## Core Formulas

### Rotational Analogues Table

| Linear | Rotational |
|--------|-----------|
| Displacement x | Angle θ |
| Velocity v | Angular velocity ω = dθ/dt |
| Acceleration a | Angular acceleration α = dω/dt |
| Mass m | Moment of inertia I = Σmᵢrᵢ² |
| Force F | Torque τ = r × F |
| p = mv | L = Iω (angular momentum) |
| F = ma | τ = Iα |
| F = dp/dt | τ = dL/dt |
| W = F⋅d | W = τ⋅θ |
| K = ½mv² | K = ½Iω² |

### Kinematic Equations (constant α)
- ω = ω₀ + αt
- θ = θ₀ + ω₀t + ½αt²
- ω² = ω₀² + 2α(θ − θ₀)

### Moment of Inertia Reference Card

| Body | Axis | I |
|------|------|---|
| Ring, radius R | ⊥ through centre | MR² |
| Ring, radius R | Diameter | MR²/2 |
| Rod, length L | ⊥ at midpoint | ML²/12 |
| Disc, radius R | ⊥ through centre | MR²/2 |
| Disc, radius R | Diameter | MR²/4 |
| Hollow cylinder | Axis | MR² |
| Solid cylinder | Axis | MR²/2 |
| Solid sphere | Diameter | 2MR²/5 |

**Parallel Axis Theorem:** I = I_cm + Md² (for axis parallel to cm axis, distance d away)

### Rolling Without Slipping
- Condition: v = Rω (velocity of contact point = 0)
- Total KE: K = ½mv²(1 + k²/R²) where k = radius of gyration
- Acceleration on incline θ: a = g sinθ/(1 + k²/R²)

### Conservation of Angular Momentum
- If Στ_ext = 0 → **L = Iω = constant**
- Applications: spinning skater, diver, Kepler's 2nd law

## Related Concepts
[[concepts/laws-of-motion]] — linear analogue; τ=Iα ↔ F=ma
[[concepts/work-energy-power]] — rolling KE includes both translational and rotational terms
[[concepts/gravitation]] — Kepler's 2nd law = angular momentum conservation under central force

## Evidence & Examples
- Skater: pulls arms in (I decreases) → ω increases (Iω = constant)
- Ring vs disc rolling down same incline: sphere wins (smallest k²/R²); ring slowest
- Solid cylinder acceleration = 2g sinθ/3 on frictionless incline

## Open Questions
- How does friction enable rolling without slipping? (static friction provides torque)
- What is the critical friction coefficient for rolling vs. sliding?

## Sources
[[sources/ch6-rotational-motion]]
